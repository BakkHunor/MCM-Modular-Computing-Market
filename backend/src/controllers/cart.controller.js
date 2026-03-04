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
      return res.status(404).json({
        message: "Termék nem található"
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        message: "A termék nincs készleten"
      });
    }

    if (product.requires_login && !user_id) {
      return res.status(401).json({
        message: "Ehhez a termékhez be kell jelentkezni"
      });
    }

    const qtyToAdd = Number(quantity) || 1;

    if (qtyToAdd <= 0) {
      return res.status(400).json({
        message: "Érvénytelen mennyiség"
      });
    }

    const whereClause = user_id
      ? { user_id, product_id }
      : { session_id, product_id };

    const existingItem = await CartItem.findOne({ where: whereClause });

    if (existingItem) {

      const newQuantity = Number(existingItem.quantity) + qtyToAdd;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          message: "Nincs elegendő készlet"
        });
      }

      existingItem.quantity = newQuantity;
      await existingItem.save();

    } else {

      if (qtyToAdd > product.stock) {
        return res.status(400).json({
          message: "Nincs elegendő készlet"
        });
      }

      await CartItem.create({
        user_id,
        session_id,
        product_id,
        quantity: qtyToAdd
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
      return res.status(404).json({
        message: "Termék nincs a kosárban"
      });
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