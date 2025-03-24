const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const monAnService = require("../services/monAnService");

const monAnController = {
  createMonAn: async (req, res, next) => {
    try {

      const { status, message, elements } = await monAnService.createMonAn(req.body);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllMonAn: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await monAnService.getAllMonAn();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllByQueryMonAn: async (req, res, next) => {
    try {
      const MonAn = req.body
      const { status, message, elements } =
        await monAnService.getAllByQueryMonAn(MonAn);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdMonAn: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await monAnService.getIDMonAn(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateMonAn: async (req, res, next) => {
    try {
      const { id } = req.params;

      const isCheck = await db.Mon_An.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");

      const { status, message } = await monAnService.updateMonAn(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },

  deleteMonAn: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Mon_An.findOne({
        where: {
          id: id,
          IS_DELETED: false,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await monAnService.deleteMonAn(
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  updateFileMonAn: async (req, res, next) => {
    try {
      const id = req.body.MONAN_ID;
      if(!id)
        return res.status(404).json("Id not found");
      console.log(req.file)
      const {
        status, 
        message
      } = await monAnService.uploadFileMonAn(id,req.file);
      return res.status(status).json(createSuccess(
        status,
        message,
      ))
    } catch (error) {
      next(error)
    }
  },
  deleteFileMonAn: async (req, res, next) => {
    try {
      const {id} = req.params;
      const {
        status, 
        message
      } = await monAnService.deleteFileMonAn(id);
      return res.status(status).json(createSuccess(
        status,
        message,
      ))
    } catch (error) {
      next(error)
    }
  },
};

module.exports = monAnController;
