const { getInfoEmployeeByQuery, getInfoUserByQuery, getEvaluationType, getEvaluationResultByQuery } = require("../helpers/api");
const { convertDayToTime } = require("./caculatorLeave");
const showInFoEmployee = async (data, ORG_ID) => {
  data = JSON.parse(JSON.stringify(data));

  if (data.length) {
    let arrUserID = [];
    let result = [];
    data.forEach((item) => {
      arrUserID.push(item.USER_ID);
    });
    const infoEmployee = await getInfoEmployeeByQuery({
      USER_ID: arrUserID,
      ORG_ID,
    });
    const dataEmployee = infoEmployee.data.elements;
    for (let i = 0; i < data?.length; i++) {
      for (let j = 0; j < dataEmployee?.length; j++) {
        if (dataEmployee[j].USER_ID === data[i].USER_ID) {
          result.push({ ...data[i], employee: dataEmployee[j] });
        }
      }
    }
    return result;
  } else {
    let result = [];
    const infoEmployee = await getInfoEmployeeByQuery({
      USER_ID: data.USER_ID,
      ORG_ID,
    });
    const dataEmployee = infoEmployee.data.elements;
    if (data?.USER_ID === dataEmployee?.USER_ID) {
      result.push({ ...data, employee: dataEmployee });
    }
    return result;
  }
};
const showInFoEmployeeForAllowLeave = async (data, ORG_ID) => {
  data = JSON.parse(JSON.stringify(data));

  if (data.length) {
    let arrUserID = [];
    let result = [];
    data.forEach((item) => {
      arrUserID.push(item.USER_ID);
    });
    const infoEmployee = await getInfoEmployeeByQuery({
      USER_ID: arrUserID,
      ORG_ID,
    });
    const dataEmployee = infoEmployee.data.elements;
    for (let i = 0; i < data?.length; i++) {
      let total = 0
      if(data[i]?.Employee_Leaves?.length){
        data[i]?.Employee_Leaves.forEach((item)=>{
          total = Number(item?.TOTAL) + total
        })
      }
      for (let j = 0; j < dataEmployee?.length; j++) {
        if (dataEmployee[j].USER_ID === data[i].USER_ID) {
          result.push({ ...data[i], employee: dataEmployee[j], remains: data[i]?.ALLOW_DAYS - total });
        }
      }
    }
    return result;
  } else {
    
    return [];
  }
};
const showInFoEmployeeForQuitJob = async (data, ORG_ID) => {
  data = JSON.parse(JSON.stringify(data));

  if (data.length) {
    let arrUserID = [];
    let result = [];
    data.forEach((item) => {
      arrUserID.push(item.USER_ID);
      arrUserID.push(item.USER_ID_APPROVED);
    });
    const infoEmployee = await getInfoEmployeeByQuery({
      USER_ID: arrUserID,
      ORG_ID,
    });
    const dataEmployee = infoEmployee.data.elements;
    for (let i = 0; i < data?.length; i++) {
      let employee = undefined
      let approvedBy = undefined
      for (let j = 0; j < dataEmployee?.length; j++) {
        if (dataEmployee[j].USER_ID === data[i].USER_ID) {
          employee = dataEmployee[j]
        }
        if (dataEmployee[j].USER_ID === data[i].USER_ID_APPROVED) {
          approvedBy = dataEmployee[j]
        }
      }
      result.push({ ...data[i], employee: employee,approvedBy: approvedBy  });

    }
    return result;
  } else{
    
    return [];
  }
};
const showInFoEmployeeForQuitJobById = async (data, ORG_ID) =>{
  data = JSON.parse(JSON.stringify(data));
  let result = [];
    const infoEmployee = await getInfoEmployeeByQuery({
      USER_ID: data.USER_ID,
      ORG_ID,
    });
    const dataEmployee = infoEmployee.data.elements;
    if (data?.USER_ID === dataEmployee?.USER_ID ) {
      result.push({ ...data, employee: dataEmployee });
    }
    return result;
}
const showInFoEmployeeForLeaveRequest = async (data, ORG_ID) => {
  data = JSON.parse(JSON.stringify(data));
  let arrUserID = [];
  let result = [];
  data.forEach((item) => {
    arrUserID.push(item.USER_ID_LEAVE);
  });
  const infoEmployee = await getInfoEmployeeByQuery({
    USER_ID: arrUserID,
    ORG_ID,
  });
  const dataEmployee = infoEmployee.data.elements;
  for (let i = 0; i < data?.length; i++) {
    let leave = {};
    for (let j = 0; j < dataEmployee?.length; j++) {
      if (dataEmployee[j].USER_ID === data[i].USER_ID_LEAVE) {
        leave = { ...data[i], total: data[i].TOTAL };
        result.push({ ...leave, employee: dataEmployee[j] })
      }
      
    }
    ;
  }
  return result;
};
const showInfoUserForCandidate = async (data) =>{
  data = JSON.parse(JSON.stringify(data));
  let arrUserID = [];
  let result = [];
  data.forEach((item) => {
    arrUserID.push(item.USER_ID);
    arrUserID.push(item.CREATED_BY)
  });
  const infoUser = await getInfoUserByQuery({
    id: arrUserID,
  });
  const dataUser = infoUser.data.elements;
  const typeEvaluationId = await getEvaluationType("CANDIDATE_SCORES")
  const infoEvaluation = await getEvaluationResultByQuery({
    EVALUATION_TYPE_ID: typeEvaluationId
})
const dataEvaluation = infoEvaluation.data.elements;
  for(let i = 0; i < data?.length; i++){
    let user = undefined
    let createBy = undefined
    let evaluationCV = undefined
    for(let j = 0; j < dataUser?.length; j++){
      if(dataUser[j].id === data[i].USER_ID){
        user = dataUser[j]
      }
      if(dataUser[j].id ===data[i].CREATED_BY ){
        createBy = dataUser[j]
      }
    }
    for(let k = 0; k < dataEvaluation?.length; k++){
      if(dataEvaluation[k].USER_ID === data[i].USER_ID){
        evaluationCV = dataEvaluation[k]
      }
      }
    result.push({...data[i], User: user, CreateBy: createBy, ReviewCV: evaluationCV})
  }
  return result
}
module.exports = { showInFoEmployee,showInFoEmployeeForAllowLeave, showInFoEmployeeForLeaveRequest, showInfoUserForCandidate, showInFoEmployeeForQuitJob,showInFoEmployeeForQuitJobById };
