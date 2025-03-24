const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const tinTucService = {
  createTinTuc: async (tinTuc) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Tin_Tuc.create({
          ...tinTuc,
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Tin_Tuc successfully!"
            : "Error while create Tin_Tuc",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllTinTuc: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Tin_Tuc.findAll({
          where: {
            IS_DELETED: false,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list TinTuc successfully"
            : "Error while get list TinTuc",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDTinTuc: async (TinTucId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Tin_Tuc.findOne({
          where: {
            id: TinTucId,
            IS_DELETED: false,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get id Tin_Tuc successfully"
            : "Error while get id Tin_Tuc",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateTinTuc: async (TinTuc, TinTucId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Tin_Tuc.update(
          {
            ...TinTuc,
          },
          {
            where: {
              id: TinTucId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Tin_Tuc successfully"
            : "Error while update Tin_Tuc",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteTinTuc: async (TinTucId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Tin_Tuc.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: TinTucId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Tin_Tuc successfully"
            : "Error while delete Tin_Tuc",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = tinTucService;
