"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Interview_Schedules",{
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            USER_ID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            CANDIDATE_USER_ID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            LOCATION_ID: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            ROOM_ID: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            INTERVIEW_START_TIME: {
                type: Sequelize.DATE,
                allowNull: false
            },
            INTERVIEW_END_TIME: {
                type: Sequelize.DATE,
                allowNull: false
            },
            TITLE: {
                type: Sequelize.STRING,
                allowNull: true
            },
            DESC: {
                type: Sequelize.STRING,
                allowNull: true
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
        await queryInterface.dropTable("Interview_Schedules");
      },
}