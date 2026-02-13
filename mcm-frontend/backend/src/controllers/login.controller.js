const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Hiányzó adatok'
    });
  }

  try {
    const user = await User.findOne({
      where: { username }
    });

    if (!user) {
      return res.status(404).json({
        message: 'Felhasználó nem található'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Hibás jelszó'
      });
    }

    res.status(200).json({
      message: 'Sikeres bejelentkezés'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Szerver hiba',
      error: error.message
    });
  }
};
