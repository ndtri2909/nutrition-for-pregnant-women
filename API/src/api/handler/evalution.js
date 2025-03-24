
const { dataGetAllUser } = require("../helpers/api");
const resultEvalution = async (infoEvalution) => {
  console.log(infoEvalution)
  const result1 = await dataGetAllUser();
  const infoUser = result1.data;
  
  return infoEvalution.map((evaluation) => {
    const user = infoUser.elements.find(
      (element) => element?.USER_ID == evaluation?.USER_ID
    );
    const evaluator = infoUser.elements.find(
      (element) => element?.USER_ID == evaluation?.EVALUATOR_ID
    );
    
    return {
      ...evaluation,
      USER_NAME: `${user.User?.FIRST_NAME} ${user.User?.LAST_NAME}`,
      EVALUATOR_NAME: `${evaluator.User?.FIRST_NAME} ${evaluator.User?.LAST_NAME}`,
    };
  });
};


module.exports = resultEvalution;
