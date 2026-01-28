exports.getUsers = (req, res) => {
  res.json([
    { id: 1, name: 'Vegh Vencel' }
  ]);
};

exports.createUser = (req, res) => {
  const user = req.body;
  res.status(201).json({
    message: 'Felhasználó létrehozva', 
    user
  });
};