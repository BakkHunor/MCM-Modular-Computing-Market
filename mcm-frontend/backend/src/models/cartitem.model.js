'use strict';

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    cart_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
user_id: {
  type: DataTypes.INTEGER,
  allowNull: true
},
session_id: {
  type: DataTypes.STRING,
  allowNull: true
},
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'cart_items',
    timestamps: false
  });

  return CartItem;
};
