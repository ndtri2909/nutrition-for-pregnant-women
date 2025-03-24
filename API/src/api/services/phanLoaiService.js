const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const phanLoaiService = {
  createPhanLoai: async (PhanLoai) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Phan_Loai.create({
          ...PhanLoai,
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Phan_Loai successfully!"
            : "Error while create Phan_Loai",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllPhanLoai: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Phan_Loai.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Thuc_Don,
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
            ? "Get list PhanLoai successfully"
            : "Error while get list PhanLoai",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDPhanLoai: async (PhanLoaiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Phan_Loai.findOne({
          where: {
            id: PhanLoaiId,
            IS_DELETED: false,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get id Phan_Loai successfully"
            : "Error while get id Phan_Loai",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updatePhanLoai: async (PhanLoai, PhanLoaiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Phan_Loai.update(
          {
            ...PhanLoai,
          },
          {
            where: {
              id: PhanLoaiId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Phan_Loai successfully"
            : "Error while update Phan_Loai",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deletePhanLoai: async (PhanLoaiId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Phan_Loai.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: PhanLoaiId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Phan_Loai successfully"
            : "Error while delete Phan_Loai",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = phanLoaiService;
