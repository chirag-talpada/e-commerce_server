"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product_category.belongsTo(models.category, {
        foreignKey: "category_id",
      });

      product_category.belongsTo(models.products, {
        foreignKey: "product_id",
      });
    }
  }
  product_category.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "product_category",
      freezeTableName: true,
    }
  );
  return product_category;
};
