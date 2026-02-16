'use strict';

module.exports = (sequelize, DataTypes) => {
  const Gamekey = sequelize.define('Gamekey', {
    key_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    game_name: DataTypes.STRING,
    platform: DataTypes.STRING,
    code: {
      type: DataTypes.STRING,
      unique: true
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'gamekeys',
    timestamps: false
  });

  return Gamekey;
};
