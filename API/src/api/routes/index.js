const express = require("express");
const createError = require("http-errors");
const logEvents = require("../helpers/logEvents.js");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const { authorize } = require("../middlewares/authorize");

let router = express.Router();

let initWebRoutes = (app) => {
  // router.all(
  //   "*",
  //   authorize
  //   //  checkUserPermission
  // );

  router.use("/workingStatus", require("./workingStatusRouter.js"));
  router.use("/district", require("./districtRouter.js"));
  router.use("/city", require("./cityRouter.js"));
  router.use("/ward", require("./wardRouter.js"));
  router.use("/congThuc", require("./congThucRouter.js"));
  router.use("/dinhDuong", require("./dinhDuongRouter.js"));
  router.use("/ketLuanKhuyenNghi", require("./ketLuanKhuyenNghiRouter.js"));
  router.use("/monan", require("./monAnRouter.js"));
  router.use("/phanLoai", require("./phanLoaiRouter.js"));
  router.use("/thucDon", require("./thucDonRouter.js"));
  router.use("/auth", require("./authRouter.js"));
  router.use("/user", require("./userRouter.js"));
  router.use("/bmi", require("./bmiRouter.js"));
  router.use("/tinTuc", require("./tinTucRouter.js"));
  router.get("/", (req, res) => {
    res.send("hello there !");
  });

  router.use((req, res, next) => {
    next(createError.NotFound("Not Found !"));
  });

  router.use((err, req, res, next) => {
    let contentLog = `idError:${uuid()} --- ${req.url} --- ${req.method} --- ${
      err.message
    }`;
    logEvents(contentLog);
    if (!err.status) {
      err["status"] = 500;
    }
    res.status(err.status).json({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    });
  });
  return app.use("/api", router);
};

module.exports = initWebRoutes;
