"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Leave_Policies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      NAME: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CD: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DESC: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      MIN_LEAVE_DAYS: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      MAX_LEAVE_DAYS: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      DAYS_REQUEST_BEFORE_LEAVE: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      IS_PAID: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
    await queryInterface.dropTable("Leave_Policies");
  },
};
