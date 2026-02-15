'use strict';

module.exports = (sequelize, DataTypes) => {
  const Giftcard = sequelize.define('Giftcard', {
    card_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    platform: DataTypes.STRING,
    value: DataTypes.DECIMAL(10,2),
    code: {
      type: DataTypes.STRING,
      unique: true
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'giftcards',
    timestamps: false
  });

  return Giftcard;
};
