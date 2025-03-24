const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op, Sequelize } = require("sequelize");
const fs = require("fs");

const monAnService = {
  createMonAn: async (MonAn) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Mon_An.create({
          ...MonAn,
        });

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create MonAn successfully!"
            : "Error while create MonAn",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllMonAn: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Mon_An.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Dinh_Duong,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
            {
              model: db.Cong_Thuc,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
            {
              model: db.Image_Mon_An,
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
            ? "Get list MonAns successfully"
            : "Error while get list MonAns",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllByQueryMonAn: async (MonAn) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Mon_An.findAll({
          where: {
            ...MonAn,
            IS_DELETED: false,
          },

          include: [
            {
              model: db.Dinh_Duong,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
            {
              model: db.Cong_Thuc,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
            {
                model: db.Image_Mon_An,
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
            ? "Get list MonAns successfully"
            : "Error while get list MonAns",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDMonAn: async (MonAnId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Mon_An.findOne({
          where: {
            id: MonAnId,
            IS_DELETED: false,
          },

          include: [
            {
              model: db.Dinh_Duong,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
            {
              model: db.Cong_Thuc,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
            {
                model: db.Image_Mon_An,
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
            ? "Get id MonAn successfully"
            : "Error while get id MonAn",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateMonAn: async (MonAn, MonAnId) => {
    return new Promise(async (resolve, reject) => {
      try {

        const response = await db.Mon_An.update(
          {
            ...MonAn,
          },
          {
            where: {
              id: MonAnId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update MonAn successfully"
            : "Error while update MonAn",
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteMonAn: async (MonAnId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Mon_An.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: MonAnId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete MonAn successfully"
            : "Error while delete MonAn",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  uploadFileMonAn: async (MONAN_ID, uploadFile) => {
    return new Promise(async (resolve, reject) => {
      try {
        const existMonAn = await db.Mon_An.findOne({
          where: {
            id: MONAN_ID,

            IS_DELETED: false,
          },
        });
        if (!existMonAn) throw createError.NotFound("MonAn not found");

        const uploadFileMonAn = await db.Image_Mon_An.create({
          NAME: uploadFile.filename,
          MONAN_ID,
        });
        resolve({
          status: 200,
          message: "Create MonAn upload file successfully",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteFileMonAn: async (imageMonAnId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteFile = await db.Image_Mon_An.findOne({
          where: {
            id: imageMonAnId,
            IS_DELETED: false,
          },
        });
        if (!deleteFile) throw createError.NotFound("File not exist");
        const filePath = `./${process.env.BASE_URL}/files/${deleteFile.NAME}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file: ${filePath}`, err);
          }
        });
        const response = await db.Image_Mon_An.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: imageMonAnId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: 200,
          message: "delete file successfully",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};


module.exports = monAnService;
