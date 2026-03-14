'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING,

    requires_login: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    price: DataTypes.DECIMAL(10,2),
    stock: DataTypes.INTEGER,
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'products',
    timestamps: false
  });

  return Product;
};
