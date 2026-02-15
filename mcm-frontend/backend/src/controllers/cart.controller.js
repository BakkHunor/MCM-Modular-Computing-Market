const db = require('../models');
const CartItem = db.CartItem;

exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  try {
    const existingItem = await CartItem.findOne({
      where: { user_id, product_id }
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
    } else {
      await CartItem.create({
        user_id,
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
  const user_id = req.user.id;

  try {
    const cart = await CartItem.findAll({
      where: { user_id }
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
  const user_id = req.user.id;

  try {
    const item = await CartItem.findOne({
      where: { user_id, product_id }
    });

    if (!item) {
      return res.status(404).json({ message: "Termék nincs a kosárban" });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
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
