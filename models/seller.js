"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      seller.hasMany(models.products, {
        foreignKey: "product_id",
      });
    }
  }
  seller.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: /^[0-9]{10}$/i,
        },
      },
    },
    {
      sequelize,
      modelName: "seller",
      freezeTableName: false,
    }
  );
  return seller;
};
