const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const workingStatusService = require("../services/workingStatusService");

const workingStatusController = {
  createWorkingStatus: async (req, res, next) => {
    try {


      const { status, message } = await workingStatusService.createWorkingStatus(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getAllWorkingStatus: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await workingStatusService.getAllWorkingStatus();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdWorkingStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await workingStatusService.getIDWorkingStatus(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateWorkingStatus: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isCheck = await db.Working_Statuses.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await workingStatusService.updateWorkingStatus(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteWorkingStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Working_Statuses.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await workingStatusService.deleteWorkingStatus(
        id,
        req.body.UPDATED_BY
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = workingStatusController;
