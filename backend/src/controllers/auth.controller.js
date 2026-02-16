exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Hiányzó adatok'
    });
  }

  // db majd később
  res.status(201).json({
    message: 'Felhasználó regisztrálva',
    user: {
      username,
      email
    }
  });
};
