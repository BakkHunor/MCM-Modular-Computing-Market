const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Hiányzó adatok'
    });
  }

  // ideiglenes hitelesítés DB nélkül
  if (username !== 'admin' || password !== '1234') {
    return res.status(401).json({
      message: 'Hibás felhasználónév vagy jelszó'
    });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    message: 'Sikeres belépés',
    token
  });
};
