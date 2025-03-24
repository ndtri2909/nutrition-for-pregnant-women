const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const bmiService = require("../services/bmiService");

const bmiController = {
  createBMI: async (req, res, next) => {
    try {
      const { status, message } = await bmiService.createBMI(req.body);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getCountBmiByPhanLoai: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await bmiService.dashboardByTypeBmi();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllBMIByUser: async (req, res, next) => {
    try {
        const { id } = req.params;
      const { status, message, elements } =
        await bmiService.getBMIByUser(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bmiController;
