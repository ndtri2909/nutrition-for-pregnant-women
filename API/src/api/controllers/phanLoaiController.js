const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const phanLoaiService = require("../services/phanLoaiService");

const phanLoaiController = {
  createPhanLoai: async (req, res, next) => {
    try {
      const { status, message } = await phanLoaiService.createPhanLoai(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getAllPhanLoai: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await phanLoaiService.getAllPhanLoai();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdPhanLoai: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await phanLoaiService.getIDPhanLoai(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updatePhanLoai: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isCheck = await db.Phan_Loai.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await phanLoaiService.updatePhanLoai(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deletePhanLoai: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Phan_Loai.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await phanLoaiService.deletePhanLoai(
        id,
        req.body.UPDATED_BY
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = phanLoaiController;
