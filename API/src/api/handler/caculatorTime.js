const moment = require("moment");
const { Op } = require("sequelize");
const { dataGetAllUser } = require("../helpers/api");
const { getInfoEmployeeByQuery } = require("../helpers/api");
const { convertDayToTime } = require("../handler/caculatorLeave");
require("dotenv").config();

const calculateStatus = async (totalSecond) => {
  const secondOfEightHour = 28800;
  return totalSecond > secondOfEightHour
    ? process.env.STATUS_GREAT
    : totalSecond === secondOfEightHour
    ? process.env.STATUS_OK
    : process.env.STATUS_NOT_OK;
};
//Merge data by user id and date.
const groupUsersAndDate = async (dataAttendance) => {
  // Initialize a map
  const groupedUsers = new Map();
  //Loop data
  dataAttendance.rows.forEach((element) => {
    const userId = element.USER_ID;
    const day = element.ATTENDANCE_DATE;
    // ex : [1 - 2023-09-11]
    const userFollowDay = `${userId}-${day}`;
    //check if not exist then set userId and day
    if (!groupedUsers.has(userFollowDay)) {
      groupedUsers.set(userFollowDay, []);
    }
    // lements with the same id and date are placed in a common array.
    groupedUsers.get(userFollowDay).push(element);
  });
  // convert to array
  const result = Array.from(groupedUsers);
  return result;
};

const calculateTimeDifference = async (data) => {
  // Initialize an object to store work hours information
  const workHours = {};
  // Iterate through each date in the input data
  for (const date in data) {
    // Get the list check in ,checkout, ex [0:"2023-07-09",1:["in","out","in","out"]]
    const userFollowDay = data[date][1];
    let totalWorkTime = 0;
    let checkInTime = null;
    // Iterate through each user data for the day
    for (const dataUser of userFollowDay) {
      // Check if there is a check-in time
      if (dataUser.CHECK_IN_DATE_TIME != null) {
        checkInTime = new Date(dataUser.CHECK_IN_DATE_TIME);
      }
      // Save common information for the work day
      workHours[date] = {
        CHECK_IN_DATE_TIME: userFollowDay[0]?.CHECK_IN_DATE_TIME,
        CHECK_IN_STATUS: userFollowDay[0]?.CHECK_IN_STATUS,
        DATE: userFollowDay[0]?.ATTENDANCE_DATE,
        USER_ID: userFollowDay[0]?.USER_ID,
        CHECK_OUT_STATUS: userFollowDay[0]?.CHECK_OUT_STATUS,
        LOCATION_ID: userFollowDay[0]?.LOCATION_ID,
        NOTE: userFollowDay[0]?.NOTE
      };
      // Check if there is a check-out time and there was a check-in time
      if (dataUser.CHECK_OUT_DATE_TIME != null && checkInTime) {
        const checkOutTime = new Date(dataUser.CHECK_OUT_DATE_TIME);
        const workTime = (checkOutTime - checkInTime) / 1000;
        totalWorkTime += workTime;
        checkInTime = null;
        //add common information for the work day
        workHours[date].CHECK_OUT_DATE_TIME = dataUser?.CHECK_OUT_DATE_TIME;
        workHours[date].CHECK_OUT_STATUS = dataUser?.CHECK_OUT_STATUS;
        workHours[date].STATUS = await calculateStatus(totalWorkTime);
      }
    }
    //add common information for the work day
    workHours[date].TOTAL_WORK_TIME = totalWorkTime;
  }

  return workHours;
};

const employeeWorkStatus = async (dataAttendance, ORG_ID) => {
  try {
    data = JSON.parse(JSON.stringify(dataAttendance.rows));
    const convertData = [];
    let arrUserID = [];
    data.forEach((item) => {
      arrUserID.push(item.USER_ID);
    });
    if (data.length) {
      //get data
      const dataEmployee = await getInfoEmployeeByQuery({
        USER_ID: arrUserID,
        ORG_ID,
      });
      const infoEmployee = dataEmployee.data;
      //Group by user on a daily basis
      const dataUsers = await groupUsersAndDate(dataAttendance);
      const result = await calculateTimeDifference(dataUsers);
      // Find user in list dataEmployee
      for (let convert in result) {
        const infoUser = infoEmployee.elements.find(
          (element) => element?.USER_ID == result[convert]?.USER_ID
        );
        // check if user exist then group
        if (infoUser) {
          const objectInfoUser = {
            ...infoUser,
            WORK: result[convert],
          };
          convertData.push(objectInfoUser);
        }
      }
    }

    return convertData;
  } catch (error) {
    console.log(error);
  }
};

const getWorkingHour = async ({ list_user_attendace }) => {
  try {
    data = JSON.parse(JSON.stringify(list_user_attendace.rows));
    let arrUserID = [];
    data.forEach((item) => {
      arrUserID.push(item.USER_ID);
    });
    const convertData = [];
    //Group by user on a daily basis
    const dataUsers = await groupUsersAndDate(list_user_attendace);
    const result = await calculateTimeDifference(dataUsers);
    if (data.length) {
      //get data
      const dataEmployee = await getInfoEmployeeByQuery({ USER_ID: arrUserID });
      const infoEmployee = dataEmployee.data;
      // Find user in list dataEmployee
      for (let convert in result) {
        const objectInfoUser = {
          infoEmployee,
          WORK: result[convert],
        };
        convertData.push(objectInfoUser);
      }
    }
    return convertData;
  } catch (error) {
    console.log(error);
  }
};

const formatDay = (DATE) => {
  try {
    const splitDay = moment(DATE).format("DD-MM-YYYY");

    const startOfDay = new Date(`${splitDay}T17:00:00.110Z`);
    startOfDay.setDate(startOfDay.getDate() - 1);
    const endOfDay = `${splitDay}T16:59:59.308Z`;
    return { startOfDay, endOfDay };
  } catch (error) {
    console.log(error);
  }
};

const caculatorAttendanceMonth = async (data) => {
  // Initialize an object to store work hours information
  const workHours = {};
  // Iterate through each date in the input data
  for (const date in data) {
    // Get the list check in ,checkout, ex [0:"2023-07-09",1:["in","out","in","out"]]
    const userFollowDay = data[date][1];
    let totalWorkTime = 0;
    let checkInTime = null;
    // Iterate through each user data for the day
    for (const dataUser of userFollowDay) {
      // Check if there is a check-in time
      if (dataUser.CHECK_IN_DATE_TIME != null) {
        checkInTime = new Date(dataUser.CHECK_IN_DATE_TIME);
      }
      // Save common information for the work day
      workHours[date] = {
        DATE: userFollowDay[0]?.ATTENDANCE_DATE,
        USER_ID: userFollowDay[0]?.USER_ID,
      };
      // Check if there is a check-out time and there was a check-in time
      if (dataUser.CHECK_OUT_DATE_TIME != null && checkInTime) {
        const checkOutTime = new Date(dataUser.CHECK_OUT_DATE_TIME);
        const workTime = (checkOutTime - checkInTime) / 1000;
        totalWorkTime += workTime;
        checkInTime = null;
      }
    }
    //add common information for the work day
    workHours[date].TOTAL_WORK_TIME = totalWorkTime;
  }

  return workHours;
};

const timeSheetUser = async (listDayLeave, listAttendance) => {
  const newListAttendance = await groupUsersAndDate(listAttendance);
  const caculatorAttendance = await caculatorAttendanceMonth(newListAttendance);
  //get value
  const resultAttendance = Object.values(caculatorAttendance);
  const newListDayLeave = [];
  //caculator day leave
  for (let x of listDayLeave) {
    const from_date = moment(x.FROM_DATE_TIME);
    const to_date = moment(x.TO_DATE_TIME);
    const hourNumberLeave = to_date.diff(from_date, "hours");
    const convertDayToHour = await convertDayToTime(hourNumberLeave);
    newListDayLeave.push({ ...x, totalLeave: convertDayToHour });
  }
  //group 2 array resultAttendance with new listdayleave
  const newArray = resultAttendance.concat(newListDayLeave);
  return newArray;
};
module.exports = {
  getWorkingHour,
  formatDay,
  employeeWorkStatus,
  timeSheetUser,
};
