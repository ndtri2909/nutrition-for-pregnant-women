const moment = require("moment");
const { Op } = require("sequelize");
const isValidDateTime = (datetime) => {
  var formats = [moment.ISO_8601, "MM/DD/YYYY  :)  HH*mm*ss"];
  return moment(datetime, formats, true).isValid();
  // moment(datetime, moment.ISO_8601, true).isValid();
};

const forObjectGetAll = (object) => {
  const where = {};
  where.IS_DELETED = false;

  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key]) {
      const isDay =
        key === "CHECK_IN_DATE_TIME" ||
        key === "CHECK_OUT_DATE_TIME" ||
        key === "CREATED_DATE";

      if (isDay) {
        const splitDay = moment(object[key]).format("YYYY-MM-DD");
       
        //after set up dayStart and endDay
        const dayStart = new Date(`${splitDay}T17:00:00.110Z`);

        const endDay = new Date(`${splitDay}T16:59:59.308Z`);
        dayStart.setDate(dayStart.getDate() - 1);
       
        where[key] = {
          [Op.between]: [dayStart, endDay],
        };
      } else {
        where[key] = object[key];
      }
    }
  }
  return where;
};

module.exports = { isValidDateTime, forObjectGetAll };
