const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const congThucService = {
  createCongThuc: async (CongThuc) => {
    return new Promise(async (resolve, reject) => {
      try {
        let {MONAN_ID} = CongThuc
        const exist = await db.Mon_An.findOne({
            where: {
                MONAN_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        if (!exist) throw createError.Conflict("mon an not exists");
        const response = await db.Cong_Thuc.create({
          ...CongThuc,
        });
        
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Cong_Thuc successfully!"
            : "Error while create Cong_Thuc",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllCongThuc: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Cong_Thuc.findAll({
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
            ? "Get list CongThuc successfully"
            : "Error while get list CongThuc",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDCongThuc: async (CongThucId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Cong_Thuc.findOne({
          where: {
            id: CongThucId,
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
            ? "Get id Cong_Thuc successfully"
            : "Error while get id Cong_Thuc",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateCongThuc: async (CongThuc, CongThucId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await db.Mon_An.findOne({
            where: {
                MONAN_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        if (!exist) throw createError.Conflict("mon an not exists");
        const response = await db.Cong_Thuc.update(
          {
            ...CongThuc,
          },
          {
            where: {
              id: CongThucId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Cong_Thuc successfully"
            : "Error while update Cong_Thuc",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteCongThuc: async (CongThucId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Cong_Thuc.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: CongThucId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Cong_Thuc successfully"
            : "Error while delete Cong_Thuc",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports =  congThucService;
