const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend alap működik');
});

app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api', require('./src/routes/protected.routes'));
app.use('/api/cart', require('./src/routes/cart.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend fut: http://localhost:${PORT}`);
});
