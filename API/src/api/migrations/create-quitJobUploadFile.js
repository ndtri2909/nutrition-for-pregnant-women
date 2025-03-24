"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Candidate_Upload_Files", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
              },
              ATTACHMENT: {
                type: Sequelize.STRING,
                allowNull: false,
              },
              IS_SIGNATURE: {
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
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Quit_Job_Upload_Files");
      },
}