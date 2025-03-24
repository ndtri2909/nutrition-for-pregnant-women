const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const thucDonService = require("../services/thucDonService");

const thucDonController = {
  createThucDon: async (req, res, next) => {
    try {
      const { status, message } = await thucDonService.createThucDon(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  settingThucDons: async (req, res, next) => {
    try {
      const { status, message } = await thucDonService.SettingThucDon(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteSettingThucDon: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Setting_ThucDon.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await thucDonService.deleteSettingThucDon(
        id,
        req.body.UPDATED_BY
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getAllThucDon: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await thucDonService.getAllThucDon();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllByQueryThucDon: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await thucDonService.getAllByQueryThucDon(req.body);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdThucDon: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await thucDonService.getIDThucDon(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateThucDon: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isCheck = await db.Thuc_Don.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await thucDonService.updateThucDon(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteThucDon: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Thuc_Don.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await thucDonService.deleteThucDon(
        id,
        req.body.UPDATED_BY
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = thucDonController;
