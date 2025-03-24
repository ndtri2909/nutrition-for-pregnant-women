const { getEvaluationResultByQuery, getInfoUserByQuery } = require("../helpers/api");

const showInfoEvaluatedForCandidate = async (data) =>{
    data = JSON.parse(JSON.stringify(data));
    let arrUserID = [];
    let tempResult = [];
    let result = []
    data.forEach((item) => {
      arrUserID.push(item.USER_ID);
    });
    const infoEvaluation = await getEvaluationResultByQuery({
        USER_ID: arrUserID
    })
    const infoUser = await getInfoUserByQuery({
        id: arrUserID,
      });
    const dataUser = infoUser.data.elements;
    const dataEvaluation = infoEvaluation.data.elements;
    for(let i = 0; i < data?.length; i++){
      let evaluation = []
      let user = undefined
      for(let j = 0; j < dataEvaluation?.length; j++){
        if(dataEvaluation[j].USER_ID === data[i].USER_ID){
            evaluation.push({...dataEvaluation[j],Candidate_Status:data[i]?.Candidate_Status })
        }
        }
      for (let k = 0; k < dataUser?.length; k++ ){
        if(dataUser[k]?.id === data[i].USER_ID){
            user = dataUser[k]
          }
        }
    tempResult.push({...data[i], evaluation: evaluation, User: user})
    }
    tempResult.forEach((item)=>{
        if(item.evaluation.length > 0){
            result.push(item)
        }
    })
    return result
  }
  module.exports = {showInfoEvaluatedForCandidate };