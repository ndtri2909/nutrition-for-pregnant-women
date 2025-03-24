const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const thucDonService = {
  createThucDon: async (ThucDon) => {
    return new Promise(async (resolve, reject) => {
      try {
        let {PHANLOAI_ID} = ThucDon
        const exist = await db.Phan_Loai.findOne({
            where: {
                id: PHANLOAI_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        if (!exist) throw createError.Conflict("phan loai not exists");
        const response = await db.Thuc_Don.create({
          ...ThucDon,
        });
        
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Thuc_Don successfully!"
            : "Error while create Thuc_Don",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  SettingThucDon: async (setting) => {
    return new Promise(async (resolve, reject) => {
      try {
        let {MONAN_ID, THUCDON_ID} = setting
        const existThucDon = await db.Thuc_Don.findOne({
            where: {
                id: THUCDON_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        const existMonAn = await db.Mon_An.findOne({
            where: {
                id: MONAN_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        if (!existThucDon) throw createError.Conflict("thuc don not exists");
        if (!existMonAn) throw createError.Conflict("mon an not exists");
        const response = await db.Setting_ThucDon.create({
          ...setting,
        });
        
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create Setting_ThucDon successfully!"
            : "Error while create Setting_ThucDon",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteSettingThucDon: async (ThucDonId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Setting_ThucDon.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: ThucDonId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete setting Thuc_Don successfully"
            : "Error while delete setting Thuc_Don",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllThucDon: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Thuc_Don.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Phan_Loai,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
            {
              model: db.Setting_ThucDon,
              required: false,
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
                },
              ],
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list ThucDon successfully"
            : "Error while get list ThucDon",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllByQueryThucDon: async (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Thuc_Don.findAll({
          where: {
            ...query,
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Phan_Loai,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
            {
              model: db.Setting_ThucDon,
              required: false,
              where: {
                IS_DELETED: false,
              },
              attributes: ['MONAN_ID'],
              include: [
                {
                  model: db.Mon_An,
                  required: false,
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
                },
              ],
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list ThucDon successfully"
            : "Error while get list ThucDon",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIDThucDon: async (ThucDonId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Thuc_Don.findOne({
          where: {
            id: ThucDonId,
            IS_DELETED: false,
          },
          include: [
            {
              model: db.Phan_Loai,
              required: false,
              where: {
                IS_DELETED: false,
              },
            },
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
            ? "Get id Thuc_Don successfully"
            : "Error while get id Thuc_Don",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateThucDon: async (ThucDon, ThucDonId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await db.Phan_Loai.findOne({
            where: {
                id: ThucDon?.PHANLOAI_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        if (!exist) throw createError.Conflict("phan loai not exists");
        const response = await db.Thuc_Don.update(
          {
            ...ThucDon,
          },
          {
            where: {
              id: ThucDonId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update Thuc_Don successfully"
            : "Error while update Thuc_Don",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteThucDon: async (ThucDonId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Thuc_Don.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: ThucDonId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete Thuc_Don successfully"
            : "Error while delete Thuc_Don",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports =  thucDonService;
