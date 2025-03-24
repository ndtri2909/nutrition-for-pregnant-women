const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const dinhDuongService = {
  createDinhDuong: async (DinhDuong) => {
    return new Promise(async (resolve, reject) => {
      try {
        let {MONAN_ID} = DinhDuong
        const exist = await db.Mon_An.findOne({
            where: {
                id: MONAN_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        if (!exist) throw createError.Conflict("mon an not exists");
        const response = await db.Dinh_Duong.create({
          ...DinhDuong,
        });
        
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Dinh_Duong successfully!"
            : "Error while create Dinh_Duong",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllDinhDuong: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Dinh_Duong.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Mon_An,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list DinhDuong successfully"
            : "Error while get list DinhDuong",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDDinhDuong: async (DinhDuongId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Dinh_Duong.findOne({
          where: {
            id: DinhDuongId,
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Mon_An,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },

          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get id Dinh_Duong successfully"
            : "Error while get id Dinh_Duong",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateDinhDuong: async (DinhDuong, DinhDuongId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await db.Mon_An.findOne({
            where: {
                id: DinhDuong?.MONAN_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        if (!exist) throw createError.Conflict("mon an not exists");
        const response = await db.Dinh_Duong.update(
          {
            ...DinhDuong,
          },
          {
            where: {
              id: DinhDuongId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Dinh_Duong successfully"
            : "Error while update Dinh_Duong",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteDinhDuong: async (DinhDuongId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Dinh_Duong.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: DinhDuongId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Dinh_Duong successfully"
            : "Error while delete Dinh_Duong",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports =  dinhDuongService;
