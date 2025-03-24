"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Labor_Contractes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      USER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CONTRACT_DATE: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      START_CONTRACT_DATE: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      END_CONTRACT_DATE: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      FILE_NAME: {
       type: Sequelize.STRING,
        allowNull: false,
      },
      FILE_PATH_DRIVE: {
       type: Sequelize.STRING,
        allowNull: false,
      },
      STATUS_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CD: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      CREATED_DATE: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      CREATED_BY: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      MODIFIED_DATE: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      MODIFIED_BY: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      IS_DELETED: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Labor_Contractes");
  },
};
