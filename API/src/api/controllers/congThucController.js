const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const congThucService = require("../services/congThucService");

const congThucController = {
  createCongThuc: async (req, res, next) => {
    try {
      const { status, message } = await congThucService.createCongThuc(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getAllCongThuc: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await congThucService.getAllCongThuc();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },

  getIdCongThuc: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await congThucService.getIDCongThuc(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateCongThuc: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isCheck = await db.Cong_Thuc.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await congThucService.updateCongThuc(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteCongThuc: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Cong_Thuc.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await congThucService.deleteCongThuc(
        id,
        req.body.UPDATED_BY
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = congThucController;
