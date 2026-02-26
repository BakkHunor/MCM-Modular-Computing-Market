const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Hiányzó adatok'
    });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if (!passwordRegex.test(password)) {
  return res.status(400).json({
    message: "A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell kisbetűt, nagybetűt és számot."
  });
}

  try {
    // Jelszó hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
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
