const { DATE } = require("sequelize");
const { dataGetAllUser } = require("../helpers/api");
const { get_day_of_time } = require("./caculatorLeave");

const numberLeaveBeforeMonth = async (elements) => {
  let result = 0;
  let ele = elements.length;
  for (let i = 0; i < ele; i++) {
    // Sửa ele thành elements.length
    result += get_day_of_time(
      elements[i].FROM_DATE_TIME,
      elements[i].TO_DATE_TIME
    );
  }
  return result;
};

const totalDayAdded = async (elements) => {
  let monthDayAdded = 0;
  let day_added = elements[0].DAY_ADDED;
  let totalDayLeave = elements[0].ALLOW_DAYS;
  //get data user
  const result1 = await dataGetAllUser();
  const data1 = result1.data;
  const isCheck = data1.elements.find(
    (element) => element.USER_ID == elements[0].USER_ID
  );

  const dataUser = isCheck?.User;
  const fullName = `${dataUser.FIRST_NAME} ${dataUser.LAST_NAME}`;
  const ele = elements.length;
  //caculartor total day_added
  for (let i = 0; i < ele; i++) {
    monthDayAdded = monthDayAdded + elements[i].DAY_ADDED;
  }
  return { monthDayAdded, day_added, totalDayLeave, fullName };
};
const totalWorkDay = async (elements) => {
  // Biến lưu trữ số lượng ngày làm việc

  let workDays = 0;
  let timeKeeping = 0;
  // Duyệt qua từng bản ghi trong dữ liệu
  for (const entry of elements) {
    // Kiểm tra xem bản ghi hiện tại có đủ thông tin để tính số ngày làm việc hay không
    if (entry.LAST_CHECKOUT !== null && entry.FIRST_CHECKIN) {
      workDays++;
    } else {
      timeKeeping++;
    }
  }
  return { workDays, timeKeeping };
};
const totalDayUsed = async (elements) => {
  let totalDayLeavePaid = 0;
  let totalDayLeaveUnpaid = 0;
  const ele = elements.length;
  for (let i = 0; i < ele; i++) {
    const from_day = new Date(elements[i].FROM_DATE_TIME);
    const to_day = new Date(elements[i].TO_DATE_TIME);

    // Tính số milliseconds giữa hai ngày
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = Math.abs(to_day - from_day);
    // Tính số ngày bằng cách chia số milliseconds cho số milliseconds trong một ngày
    if (elements[i]["Leave_Status.CD"] == "PAID") {
      totalDayLeavePaid =
        totalDayLeavePaid + Math.floor(timeDifference / millisecondsPerDay) + 1;
    } else {
      totalDayLeaveUnpaid =
        totalDayLeaveUnpaid +
        Math.floor(timeDifference / millisecondsPerDay) +
        1;
    }
  }

  return { totalDayLeavePaid, totalDayLeaveUnpaid };
};
const absentceReport = async (
  beforeMonth,
  thisMonth,
  findAllAttendance,
  countDayLeave,
  numberLeaveBeforeMonth
) => {
  const before_month = beforeMonth.monthDayAdded - numberLeaveBeforeMonth;
  const this_month =
    thisMonth.monthDayAdded -
    countDayLeave.totalDayLeavePaid -
    countDayLeave.totalDayLeaveUnpaid -
    numberLeaveBeforeMonth;

  const objectReport = {
    USER: beforeMonth.fullName,
    BEFORE_MONTH: before_month,
    DAY_ADDED: thisMonth.day_added,
    DAY_USED: countDayLeave.totalDayLeavePaid,
    DAY_UNPAID: countDayLeave.totalDayLeaveUnpaid,
    THIS_MONTH: this_month,
    WORKING_DAYS: findAllAttendance.workDays,
    TOTAL_DAY_LEAVE: thisMonth.totalDayLeave,
    NO_TIMEKEPPING: findAllAttendance.timeKeeping,
  };

  return objectReport;
};

module.exports = {
  totalDayAdded,
  totalWorkDay,
  totalDayUsed,
  absentceReport,
  numberLeaveBeforeMonth,
};
