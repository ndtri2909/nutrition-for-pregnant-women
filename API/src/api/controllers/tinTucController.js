const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const tinTucService = require("../services/tinTucService");

const tinTucController = {
  createTinTuc: async (req, res, next) => {
    try {


      const { status, message } = await tinTucService.createTinTuc(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getAllTinTuc: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await tinTucService.getAllTinTuc();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdTinTuc: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await tinTucService.getIDTinTuc(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateTinTuc: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isCheck = await db.Tin_Tuc.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await tinTucService.updateTinTuc(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteTinTuc: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Tin_Tuc.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await tinTucService.deleteTinTuc(
        id,
        req.body.UPDATED_BY
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = tinTucController;
