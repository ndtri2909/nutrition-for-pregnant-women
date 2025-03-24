"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employee_Evalutions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      USER_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      EVALUATOR_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      FROM_DATE: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      TO_DATE: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      STATUS_EVALUATEE: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      NOTE: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Employee_Evalutions");
  },
};
