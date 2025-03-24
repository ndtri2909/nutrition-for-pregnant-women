const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op } = require("sequelize");

const ketLuanKhuyenNghiService = {
  createKetLuanKhuyenNghi: async (KetLuanKhuyenNghi) => {
    return new Promise(async (resolve, reject) => {
      try {
        let {PHANLOAI_ID} = KetLuanKhuyenNghi
        const exist = await db.Phan_Loai.findOne({
            where: {
                id: PHANLOAI_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        if (!exist) throw createError.Conflict("phan loai not exists");
        const response = await db.KetLuan_KhuyenNghi.create({
          ...KetLuanKhuyenNghi,
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create KetLuan_KhuyenNghi successfully!"
            : "Error while create KetLuan_KhuyenNghi",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllKetLuanKhuyenNghi: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.KetLuan_KhuyenNghi.findAll({
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
              include: [
                {
                  model: db.Thuc_Don,
                  required: false,
                  where: {
                    IS_DELETED: false,
                  },
                },
              ],
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list KetLuanKhuyenNghi successfully"
            : "Error while get list KetLuanKhuyenNghi",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getKetLuanKhuyenNghiByValue: async (data) =>{
    return new Promise(async (resolve, reject) => {
      try {
        if(data.TYPE !== 2){
          const {COMPARE} = data
            const response = await db.KetLuan_KhuyenNghi.findOne({
              where: {
                TYPE: data.TYPE,
                SOSANH: COMPARE,
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
              ],
            });
            resolve({
              status: response ? 200 : 404,
              message: response
                ? "Get  KetLuan_KhuyenNghi successfully"
                : "Error while get  KetLuan_KhuyenNghi",
              elements: response,
            });
        }else{
          const value = data.VALUE
          const khoang = data.KHOANG
          const response = await db.KetLuan_KhuyenNghi.findOne({
            where: {
              [Op.and]: [
                {NHONHAT: {
                  [Op.lte]: value
                  
                }},{LONNHAT:{
                  [Op.gte]: value
                },}
              ],
              KHOANG: khoang,
              
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
            ],
          });
          resolve({
            status: response ? 200 : 404,
            message: response
              ? "Get  KetLuan_KhuyenNghi successfully"
              : "Error while get  KetLuan_KhuyenNghi",
            elements: response,
          });
        }
        
      } catch (error) {
        reject(error);
      }
    })
  },
  getIDKetLuanKhuyenNghi: async (KetLuanKhuyenNghiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.KetLuan_KhuyenNghi.findOne({
          where: {
            id: KetLuanKhuyenNghiId,
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
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get id KetLuan_KhuyenNghi successfully"
            : "Error while get id KetLuan_KhuyenNghi",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateKetLuanKhuyenNghi: async (KetLuanKhuyenNghi, KetLuanKhuyenNghiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let {PHANLOAI_ID} = KetLuanKhuyenNghi
        const exist = await db.Phan_Loai.findOne({
            where: {
                id: PHANLOAI_ID,
                IS_DELETED: false,
            },
            raw: true
          })
        if (!exist) throw createError.Conflict("phan loai not exists");
        const response = await db.KetLuan_KhuyenNghi.update(
          {
            ...KetLuanKhuyenNghi,
          },
          {
            where: {
              id: KetLuanKhuyenNghiId,
              IS_DELETED: false,
            },
          }
        );

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update KetLuan_KhuyenNghi successfully"
            : "Error while update KetLuan_KhuyenNghi",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteKetLuanKhuyenNghi: async (KetLuanKhuyenNghiId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.KetLuan_KhuyenNghi.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: KetLuanKhuyenNghiId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete KetLuan_KhuyenNghi successfully"
            : "Error while delete KetLuan_KhuyenNghi",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = ketLuanKhuyenNghiService;
