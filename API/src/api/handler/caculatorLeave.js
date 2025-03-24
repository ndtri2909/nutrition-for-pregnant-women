const db = require("../models");
const { dataGetAllUser, getInfoEmployeeByQuery } = require("../helpers/api");

const get_day_of_time = (d1, d2) => {
  let ms1 = d1.getTime();
  let ms2 = d2.getTime();
  if(Math.ceil((ms2 - ms1) / ( 60 * 60 * 1000)) >= 8 && Math.ceil((ms2 - ms1) / ( 60 * 60 * 1000)) < 23){
    return 1.0
  }else if(Math.ceil((ms2 - ms1) / ( 60 * 60 * 1000)) < 8){
    return ((ms2 - ms1) / (8 * 60 * 60 * 1000))
  }
  return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
};
const convertDayToTime =  (totalDay) => {
  let totalLeave = 0;
  //convert day follow work hour 8h == one day
  const oneDay = 8;
  if (totalDay <= oneDay) {
    totalLeave = totalLeave + totalDay / oneDay;
  }
  //24h
  const day = 24;
  if (totalDay > 23) {
    totalLeave = totalLeave + totalDay / day;
  }
  if (totalDay > 8 && totalDay < 23){
    totalLeave = 1
  }
  return totalLeave;
};
const caculatorLeave = async (dataLeave) => {
  const resultArray = [];
  data = JSON.parse(JSON.stringify(dataAttendance.rows));
  let arrUserID = [];
  data.forEach((item) => {
    arrUserID.push(item.USER_ID);
  });
  const dataEmployee = await getInfoEmployeeByQuery({ USER_ID: arrUserID });
  const infoEmployee = dataEmployee.data;
  for (let i = 0; i < dataLeave.length; i++) {
    const infoUser = infoEmployee.elements.find(
      (element) => element?.USER_ID == dataLeave[i].USER_ID
    );
    const statusLeave = dataLeave[i]["User_Attendance_Status.CD"];

    if (statusLeave == "APPROVED" || statusLeave == "REJECTED") {
      const leaveInfo = {
        infoUser,
        ...dataLeave[i],
      };

      resultArray.push(leaveInfo);
    }
  }

  return resultArray;
};
const showInfoAllowLeave = async (dataLeaveInput, ORG_ID) => {
  let result = [];
  const dataLeave = JSON.parse(JSON.stringify(dataLeaveInput));
  const dataEmployees = await getInfoEmployeeByQuery({ ORG_ID }); //get employees
  const employees = dataEmployees.data.elements;
  for (let i = 0; i < employees.length; i++) {
    let leave = {};
    for (let j = 0; j < dataLeave.length; j++) {
      if (employees[i].USER_ID === dataLeave[j].USER_ID) {
        let total = 0;
        let remain = 0;
       await dataLeave[j].Employee_Leaves.forEach((item) => {
        if(item?.Leave_Type?.Leave_Policy?.IS_PAID && item?.Leave_Type?.CD !== "WFH"){
          total = total + Number(item?.TOTAL)
        }
        });
       remain = Number(dataLeave[j].ALLOW_DAYS) - Number(total)
        leave = { ...dataLeave[j], total: total.toFixed(1), remain: remain.toFixed(1) };
      }
    }
    result.push({ ...employees[i], leaves: leave });
  }
  return result;
};

const showInfoLeaveRequest = async (data) => {
  const result1 = await dataGetAllUser();
  const infoEmployees = result1.data;

  const arrayRequest = data.map((item) => {
    const createdBy = item.CREATED_BY;
    const infoEmployee = infoEmployees.elements.find(
      (element) => element.USER_ID == createdBy
    );

    if (infoEmployee) {
      return {
        ...infoEmployee,
        userRequest: item,
      };
    }
  });
  return arrayRequest;
};
const showInfoLeave = async (data) => {
  let result = [];
  const convertDataInfo = JSON.parse(JSON.stringify(data));
  let arrUserID = [];
  convertDataInfo.forEach((item) => {
    arrUserID.push(item.USER_ID_APPROVED);
  });
  const dataEmployees = await getInfoEmployeeByQuery({ USER_ID: arrUserID }); //get employees
  const employees = dataEmployees.data.elements;
  for (let i = 0; i < convertDataInfo?.length; i++) {
    let leave = {};
    let employee = {};
    leave = { ...convertDataInfo[i], total: convertDataInfo[i].TOTAL };
    for (let j = 0; j < employees?.length; j++) {
      if (employees[j].USER_ID === convertDataInfo[i].USER_ID_APPROVED) {
        employee = employees[j];
      }
    }
    result.push({ ...leave, approvedBy: employee });
  }
  return result;
};
const showInfoMyLeave = async (leave, allowleave) => {
  const data = JSON.parse(JSON.stringify(leave));
  let totalRequestLeave = 0;
  let totalRequestApproved = 0;
  let totalDayLeavePaid = 0;
  let totalDayLeaveUnPaid = 0;
  let remainingDay = 0;
  let totalAllowLeave = allowleave.ALLOW_DAYS;
  for (let x of data) {
    totalRequestLeave = totalRequestLeave + Number(x.TOTAL);

    if (x.Employee_Leave_Status.NAME === "APPROVED") {
      totalRequestApproved = totalRequestApproved + Number(x.TOTAL);

      if (x?.Leave_Type?.Leave_Policy?.IS_PAID === true) {
        totalDayLeavePaid = totalDayLeavePaid + Number(x.TOTAL);
      } else {
        totalDayLeaveUnPaid = totalDayLeaveUnPaid + Number(x.TOTAL);
      }
    }
  }
  remainingDay = (totalAllowLeave - totalDayLeavePaid).toFixed(1);
  return {
    totalAllowLeave,
    totalRequestLeave,
    totalRequestApproved,
    totalDayLeavePaid,
    totalDayLeaveUnPaid,
    remainingDay,
  };
};
module.exports = {
  showInfoAllowLeave,
  caculatorLeave,
  get_day_of_time,
  showInfoLeaveRequest,
  convertDayToTime,
  showInfoLeave,
  showInfoMyLeave,
};
