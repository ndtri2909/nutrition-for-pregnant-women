"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("employee_leaves", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
              },
              FROM_DATE_TIME: {
                type: Sequelize.DATE,
                allowNull: false,
              },
              USER_ID: {
                type: Sequelize.INTEGER,
                allowNull: false,
              },
              USER_ID_APPROVED: {
                type: Sequelize.INTEGER,
                allowNull: true,
              },
              REASON: {
                type: Sequelize.TEXT,
                allowNull: true,
              },
              NOTE: {
                type: Sequelize.TEXT,
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
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Employee_Quit_Jobs");
      },
}