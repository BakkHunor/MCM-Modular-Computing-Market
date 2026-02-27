const db = require('../models');
const CartItem = db.CartItem;
const Product = db.Product;
const Order = db.Order;
const OrderDetail = db.OrderDetail;

exports.checkout = async (req, res) => {

  const user_id = req.user ? req.user.id : null;
  const session_id = !req.user ? req.headers['x-session-id'] : null;

  if (!user_id && !session_id) {
    return res.status(400).json({
      message: "Session ID vagy token szükséges"
    });
  }

  const t = await db.sequelize.transaction();

  try {

    const whereClause = user_id
      ? { user_id }
      : { session_id };

    const cartItems = await CartItem.findAll({
      where: whereClause,
      transaction: t
    });

    if (cartItems.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "A kosár üres" });
    }

    let total = 0;
    let containsHardware = false;

    // Kosár ellenőrzés + hardware vizsgálat
    for (const item of cartItems) {

      const product = await Product.findByPk(item.product_id, { transaction: t });

      if (!product || product.stock < item.quantity) {
        await t.rollback();
        return res.status(400).json({
          message: `Nincs elég készlet: ${product?.name}`
        });
      }

      // HARDWARE LOGIN CHECK
      if (product.requires_login && !user_id) {
        await t.rollback();
        return res.status(401).json({
          message: `${product.name} csak bejelentkezve vásárolható`
        });
      }

      // HARDWARE CATEGORY CHECK
      if (product.category === "hardware") {
        containsHardware = true;
      }

      total += Number(product.price) * item.quantity;
    }

    // Ha hardware van a kosárban → kötelező shipping + validáció
    if (containsHardware) {

      const {
        first_name,
        last_name,
        email,
        phone,
        zip_code,
        city,
        address_line
      } = req.body;

      if (
        !first_name ||
        !last_name ||
        !email ||
        !phone ||
        !zip_code ||
        !city ||
        !address_line
      ) {
        await t.rollback();
        return res.status(400).json({
          message: "Hardware rendeléshez kötelező a szállítási adatok megadása."
        });
      }

      // 📧 Email ellenőrzés
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        await t.rollback();
        return res.status(400).json({
          message: "Érvénytelen email formátum."
        });
      }

      // 📱 Telefonszám ellenőrzés (magyar)
      const phoneRegex = /^(?:\+36|06)\s?(20|30|70)\s?\d{3}\s?\d{4}$/;
      if (!phoneRegex.test(phone)) {
        await t.rollback();
        return res.status(400).json({
          message: "Érvénytelen magyar telefonszám."
        });
      }

      // 📮 Irányítószám ellenőrzés
      const zipRegex = /^\d{4}$/;
      if (!zipRegex.test(zip_code)) {
        await t.rollback();
        return res.status(400).json({
          message: "Érvénytelen irányítószám (4 számjegy szükséges)."
        });
      }
    }

    // Rendelés létrehozása
    const order = await Order.create({
      user_id,
      session_id,
      total_amount: total,
      status: 'pending',

      first_name: req.body.first_name || null,
      last_name: req.body.last_name || null,
      email: req.body.email || null,
      phone: req.body.phone || null,
      zip_code: req.body.zip_code || null,
      city: req.body.city || null,
      address_line: req.body.address_line || null,
      additional_info: req.body.additional_info || null

    }, { transaction: t });

    // OrderDetail + stock csökkentés
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

    // Kosár ürítése
    await CartItem.destroy({
      where: whereClause,
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