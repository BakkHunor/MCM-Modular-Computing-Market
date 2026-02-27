'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {

    order_id: {
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

    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },

    total_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },

    zip_code: {
      type: DataTypes.STRING,
      allowNull: true
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true
    },

    address_line: {
      type: DataTypes.STRING,
      allowNull: true
    },

    additional_info: {
      type: DataTypes.TEXT,
      allowNull: true
    }

  }, {
    tableName: 'orders',
    timestamps: false
  });

  return Order;
};