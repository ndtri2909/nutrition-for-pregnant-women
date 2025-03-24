const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const workingStatusService = {
  createWorkingStatus: async (WorkingStatus) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Working_Statuses.create({
          ...WorkingStatus,
          ...logCreate(WorkingStatus.UPDATED_BY),
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Working_Statuses successfully!"
            : "Error while create Working_Statuses",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllWorkingStatus: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Working_Statuses.findAll({
          where: {
            IS_DELETED: false,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list WorkingStatus successfully"
            : "Error while get list WorkingStatus",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDWorkingStatus: async (WorkingStatusId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Working_Statuses.findOne({
          where: {
            id: WorkingStatusId,
            IS_DELETED: false,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get id Working_Statuses successfully"
            : "Error while get id Working_Statuses",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateWorkingStatus: async (WorkingStatus, WorkingStatusId) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if code exist or not
        const exist = await db.Working_Statuses.findOne({
          where: {
            CD: {
              [Op.like]: WorkingStatus.CD,
            },

            IS_DELETED: false,
          },
        });
        if (exist && exist.id != WorkingStatusId) {
          throw createError.Conflict(" Working_Statuses CD already exists");
        }
        const response = await db.Working_Statuses.update(
          {
            ...WorkingStatus,
            ...logUpdate(WorkingStatus.UPDATED_BY),
          },
          {
            where: {
              id: WorkingStatusId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Working_Statuses successfully"
            : "Error while update Working_Statuses",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteWorkingStatus: async (WorkingStatusId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Working_Statuses.update(
          {
            IS_DELETED: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: WorkingStatusId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Working_Statuses successfully"
            : "Error while delete Working_Statuses",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = workingStatusService;
