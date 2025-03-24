"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Candidates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      APPLY_DATE: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      LAST_NAME: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      FIRST_NAME: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      EMAIL: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PHONE: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      POSITION_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      POSITION_NAME: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DESC: {
        type: Sequelize.STRING,
        allowNull: true
      },
      NOTE: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      CD: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      USER_ID: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Candidates");
  },
};
