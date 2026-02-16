'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    total_amount: DataTypes.DECIMAL(10,2)
  }, {
    tableName: 'orders',
    timestamps: false
  });

  return Order;
};
