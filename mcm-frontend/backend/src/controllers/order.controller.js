const db = require('../models');
const CartItem = db.CartItem;
const Product = db.Product;
const Order = db.Order;
const OrderDetail = db.OrderDetail;

exports.checkout = async (req, res) => {
  const user_id = req.user.id;

  const t = await db.sequelize.transaction();

  try {
    const cartItems = await CartItem.findAll({
      where: { user_id },
      transaction: t
    });

    if (cartItems.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "A kosár üres" });
    }

    let total = 0;

    // Stock ellenőrzés + total számítás
    for (const item of cartItems) {
      const product = await Product.findByPk(item.product_id, { transaction: t });

      if (!product || product.stock < item.quantity) {
        await t.rollback();
        return res.status(400).json({
          message: `Nincs elég készlet: ${product?.name}`
        });
      }

      total += Number(product.price) * item.quantity;
    }

    const order = await Order.create({
      user_id,
      total_amount: total,
      status: 'pending'
    }, { transaction: t });

    for (const item of cartItems) {
      const product = await Product.findByPk(item.product_id, { transaction: t });

      await OrderDetail.create({
        order_id: order.order_id,
        product_id: product.product_id,
        quantity: item.quantity,
        price_at_purchase: product.price
      }, { transaction: t });

      product.stock -= item.quantity;
      await product.save({ transaction: t });
    }

    await CartItem.destroy({
      where: { user_id },
      transaction: t
    });

    await t.commit();

    res.json({
      message: "Sikeres rendelés",
      order_id: order.order_id,
      total
    });

  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Checkout hiba",
      error: error.message
    });
  }
};
