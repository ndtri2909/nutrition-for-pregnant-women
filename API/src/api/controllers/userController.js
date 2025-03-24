const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const userService = require("../services/userService");

const userController = {
  getAllUser: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await userService.getAlluser();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getCountUserByCity: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await userService.dashboardByCity();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await userService.getIDuser(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isCheck = await db.Users.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await userService.updateuser(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const { PASSWORD } = req.params;

      const isCheck = await db.Users.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      const passwordHash = await authService.hashPassword(PASSWORD);
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await userService.updateuser(
        passwordHash,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
