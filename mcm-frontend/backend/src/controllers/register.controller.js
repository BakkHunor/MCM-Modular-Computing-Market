const db = require('../models');
const User = db.User;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Hiányzó adatok'
    });
  }

  try {
    const user = await User.create({
      username,
      email,
      password
    });

    res.status(201).json({
      message: 'Felhasználó létrehozva',
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Adatbázis hiba',
      error: error.message
    });
  }
};
