const axios = require("axios");

const dataGetAllUser = async () => {
  const { data } = await axios.get(
    `${process.env.EMPLOYEE_DATA_BASE_URL}/api/v1/employee/getAll`
  );

  return { data };
};


const getInfoUserByQuery = async (dataid) =>{
  const {data} = await axios.post(`${process.env.EMPLOYEE_DATA_BASE_URL}/api/v1/user/getAllByQuery`,dataid, 
  {
    headers: {
      Authorization: `${process.env.SERVICE_AUTH_TOKEN}`
    }
  }
  );
  return {data}
}

const getInfoEmployeeByQuery = async (dataid) =>{
  const {data} = await axios.post(`${process.env.EMPLOYEE_DATA_BASE_URL}/api/v1/employee/getAllByQuery`,dataid,{
    headers: {
      Authorization: `${process.env.SERVICE_AUTH_TOKEN}`
    }
  });
  return {data}
}
const getEvaluationResultByQuery = async (datas) =>{
  const {data} = await axios.post(`${process.env.EMPLOYEE_DATA_BASE_URL}/api/v1/evaluationResult/getAllByQuery`, datas,{
    headers: {
      Authorization: `${process.env.SERVICE_AUTH_TOKEN}`
    }
  })
  return {data}
}
const getEvaluationType = async (CD) =>{
  const {data} = await axios.get(`${process.env.EMPLOYEE_DATA_BASE_URL}/api/v1/evaluationType/getAll`,{
    headers: {
      Authorization: `${process.env.SERVICE_AUTH_TOKEN}`
    }
  })
  const id = data.elements.filter((item)=> item?.CD === CD)?.[0]?.id
  return id
}
module.exports = { dataGetAllUser, getInfoEmployeeByQuery, getEvaluationResultByQuery, getInfoUserByQuery, getEvaluationType };
