const express = require('express');
const router = express.Router();
const db = require('../models');

const Product = db.Product;
const { Op } = db.Sequelize;

router.get('/', async (req, res) => {
  try {
    const { category, limit, sort, search } = req.query;

    const whereClause = {};

    if (category) {
      whereClause.category = category;
    }

    if (search) {
      whereClause.name = {
        [Op.like]: `%${search}%`
      };
    }

    const queryOptions = { where: whereClause };

    if (sort === "price_asc") {
      queryOptions.order = [["price", "ASC"]];
    }

    if (sort === "price_desc") {
      queryOptions.order = [["price", "DESC"]];
    }

    if (limit) {
      queryOptions.limit = parseInt(limit);
    }

    const products = await Product.findAll(queryOptions);
    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: "Hiba a termékek lekérdezésekor",
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Termék nem található"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: "Hiba a termék lekérdezésekor",
      error: error.message
    });
  }
});


module.exports = router;
