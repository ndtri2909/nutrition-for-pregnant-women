const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const dinhDuongService = require("../services/dinhDuongService");

const dinhDuongController = {
  createDinhDuong: async (req, res, next) => {
    try {
      const { status, message } = await dinhDuongService.createDinhDuong(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getAllDinhDuong: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await dinhDuongService.getAllDinhDuong();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },

  getIdDinhDuong: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await dinhDuongService.getIDDinhDuong(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateDinhDuong: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isCheck = await db.Dinh_Duong.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await dinhDuongService.updateDinhDuong(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteDinhDuong: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Dinh_Duong.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await dinhDuongService.deleteDinhDuong(
        id,
        req.body.UPDATED_BY
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = dinhDuongController;
