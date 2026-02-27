const db = require('../models');
const CartItem = db.CartItem;
const Product = db.Product;

exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;

  const user_id = req.user ? req.user.id : null;
  const session_id = !req.user ? req.headers['x-session-id'] : null;

  if (!user_id && !session_id) {
    return res.status(400).json({
      message: "Session ID szükséges vendég vásárláshoz"
    });
  }

  try {
    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({ message: "Termék nem található" });
    }

    if (product.requires_login && !user_id) {
      return res.status(401).json({
        message: "Ehhez a termékhez be kell jelentkezni"
      });
    }

    const whereClause = user_id
      ? { user_id, product_id }
      : { session_id, product_id };

    const existingItem = await CartItem.findOne({ where: whereClause });

    if (existingItem) {
      existingItem.quantity =
        Number(existingItem.quantity) + Number(quantity || 1);
      await existingItem.save();
    } else {
      await CartItem.create({
        user_id,
        session_id,
        product_id,
        quantity: quantity || 1
      });
    }

    res.json({ message: "Termék kosárba téve" });

  } catch (error) {
    res.status(500).json({
      message: "Hiba kosárba tételkor",
      error: error.message
    });
  }
};

exports.getCart = async (req, res) => {

  const user_id = req.user ? req.user.id : null;
  const session_id = !req.user ? req.headers['x-session-id'] : null;

  if (!user_id && !session_id) {
    return res.status(400).json({
      message: "Session ID szükséges"
    });
  }

  const whereClause = user_id
    ? { user_id }
    : { session_id };

  try {
    const cart = await CartItem.findAll({
      where: whereClause
    });

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: "Hiba kosár lekérdezéskor",
      error: error.message
    });
  }
};

exports.removeFromCart = async (req, res) => {
  const { product_id } = req.body;

  const user_id = req.user ? req.user.id : null;
  const session_id = !req.user ? req.headers['x-session-id'] : null;

  if (!user_id && !session_id) {
    return res.status(400).json({
      message: "Session ID szükséges"
    });
  }

  const whereClause = user_id
    ? { user_id, product_id }
    : { session_id, product_id };

  try {
    const item = await CartItem.findOne({ where: whereClause });

    if (!item) {
      return res.status(404).json({ message: "Termék nincs a kosárban" });
    }

    if (Number(item.quantity) > 1) {
      item.quantity = Number(item.quantity) - 1;
      await item.save();
      return res.json({ message: "Mennyiség csökkentve" });
    } else {
      await item.destroy();
      return res.json({ message: "Termék törölve a kosárból" });
    }

  } catch (error) {
    res.status(500).json({
      message: "Hiba törléskor",
      error: error.message
    });
  }
};
