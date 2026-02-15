const db = require('../models');
const { sequelize } = db;

const CartItem = db.CartItem;
const Product = db.Product;
const Order = db.Order;
const OrderDetail = db.Orderdetail;
const Gamekey = db.Gamekey;
const Giftcard = db.Giftcard;

exports.checkout = async (req, res) => {

  const t = await sequelize.transaction();

  try {

    const user_id = req.user ? req.user.id : null;
    const session_id = !req.user ? req.headers['x-session-id'] : null;

    if (!user_id && !session_id) {
      return res.status(400).json({
        message: "Session ID vagy token szükséges"
      });
    }

    const whereClause = user_id
      ? { user_id }
      : { session_id };

    const cartItems = await CartItem.findAll({
      where: whereClause,
      transaction: t
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "A kosár üres" });
    }

    let totalAmount = 0;

    // ORDER LÉTREHOZÁS
    const order = await Order.create({
      user_id,
      session_id,
      status: 'pending',
      total_amount: 0
    }, { transaction: t });

    const deliveredCodes = [];

    for (const item of cartItems) {

      const product = await Product.findByPk(item.product_id, { transaction: t });

      if (!product) {
        throw new Error("Termék nem található");
      }

      if (product.stock < item.quantity) {
        throw new Error(`Nincs elég készlet: ${product.name}`);
      }

      // Hardware login ellenőrzés
      if (product.requires_login && !user_id) {
        throw new Error(`A ${product.name} csak bejelentkezve vásárolható`);
      }

      totalAmount += Number(product.price) * Number(item.quantity);

      // Order detail
      await OrderDetail.create({
        order_id: order.order_id,
        product_id: product.product_id,
        quantity: item.quantity,
        price_at_purchase: product.price
      }, { transaction: t });

      // STOCK CSÖKKENTÉS
      product.stock -= item.quantity;
      await product.save({ transaction: t });

      // GAMEKEY KIOSZTÁS
      if (product.category === 'gamekey') {

        for (let i = 0; i < item.quantity; i++) {
          const key = await Gamekey.findOne({
            where: { product_id: product.product_id, is_used: 0 },
            transaction: t
          });

          if (!key) {
            throw new Error(`Elfogytak a kulcsok: ${product.name}`);
          }

          key.is_used = 1;
          await key.save({ transaction: t });

          deliveredCodes.push({
            product: product.name,
            code: key.code
          });
        }
      }

      // GIFTCARD KIOSZTÁS
      if (product.category === 'giftcard') {

        for (let i = 0; i < item.quantity; i++) {
          const card = await Giftcard.findOne({
            where: { product_id: product.product_id, is_used: 0 },
            transaction: t
          });

          if (!card) {
            throw new Error(`Elfogytak az ajándékkártyák: ${product.name}`);
          }

          card.is_used = 1;
          await card.save({ transaction: t });

          deliveredCodes.push({
            product: product.name,
            code: card.code
          });
        }
      }
    }

    order.total_amount = totalAmount;
    await order.save({ transaction: t });

    // KOSÁR TÖRLÉSE
    await CartItem.destroy({
      where: whereClause,
      transaction: t
    });

    await t.commit();

    res.json({
      message: "Sikeres rendelés",
      order_id: order.order_id,
      total: totalAmount,
      delivered_codes: deliveredCodes
    });

  } catch (error) {

    await t.rollback();

    res.status(500).json({
      message: "Hiba checkout közben",
      error: error.message
    });
  }
};
