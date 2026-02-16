'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price_at_purchase: DataTypes.DECIMAL(10,2)
  }, {
    tableName: 'orderdetails',
    timestamps: false
  });

  return OrderDetail;
};
