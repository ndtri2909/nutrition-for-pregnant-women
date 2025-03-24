const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const ketLuanKhuyenNghiService = require("../services/ketLuanKhuyenNghiService");

const ketLuanKhuyenNghiController = {
  createKetLuanKhuyenNghi: async (req, res, next) => {
    try {
      const { status, message } = await ketLuanKhuyenNghiService.createKetLuanKhuyenNghi(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getAllKetLuanKhuyenNghi: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await ketLuanKhuyenNghiService.getAllKetLuanKhuyenNghi();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getKetLuanKhuyenNghiByValue: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await ketLuanKhuyenNghiService.getKetLuanKhuyenNghiByValue(req.body);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdKetLuanKhuyenNghi: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await ketLuanKhuyenNghiService.getIDKetLuanKhuyenNghi(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateKetLuanKhuyenNghi: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isCheck = await db.KetLuan_KhuyenNghi.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await ketLuanKhuyenNghiService.updateKetLuanKhuyenNghi(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteKetLuanKhuyenNghi: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.KetLuan_KhuyenNghi.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await ketLuanKhuyenNghiService.deleteKetLuanKhuyenNghi(
        id,
        req.body.UPDATED_BY
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ketLuanKhuyenNghiController;
