"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: /^[0-9]{10}$/i,
        },
      },
      isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customers");
  },
};
