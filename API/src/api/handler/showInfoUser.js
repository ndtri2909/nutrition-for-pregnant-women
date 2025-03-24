const { getInfoUserByQuery } = require("../helpers/api");

const showInfoUserForInterviewSchedule = async (data) =>{
    data = JSON.parse(JSON.stringify(data));
    let arrUserID = [];
    let candidateUserId = []
    let result = [];
    data.forEach((item) => {
      arrUserID.push(item.USER_ID);
      candidateUserId.push(item?.CANDIDATE_USER_ID)
    });
    const infoUser = await getInfoUserByQuery({
      id: arrUserID,
    });
    const infoCandidateUser = await getInfoUserByQuery({
        id: candidateUserId,
      });
    const dataUser = infoUser.data.elements;
    const dataCandidateUser = infoCandidateUser.data.elements;
    for(let i = 0; i < data?.length; i++){
      let user = undefined
      let candidateUser = undefined
      for(let j = 0; j < dataUser?.length; j++){
        if(dataUser[j].id === data[i].USER_ID){
          user = dataUser[j]
        }
      }
      for(let k = 0; k < dataCandidateUser?.length; k++){
        if(dataCandidateUser[k].id === data[i].CANDIDATE_USER_ID){
            candidateUser = dataCandidateUser[k]
          }
      }
      result.push({...data[i], User: user, Candidate_User:candidateUser })
    }
    return result
  }

const showInfoUserAward = async (data) =>{
  data = JSON.parse(JSON.stringify(data));
  let arrUserID = [];
    let rewarderId = []
    let result = [];
    data.forEach((item) => {
      arrUserID.push(item.USER_ID);
      rewarderId.push(item?.CANDIDATE_USER_ID)
    });

    const infoUser = await getInfoUserByQuery({
      id: arrUserID.concat(rewarderId),
    });
    const dataUser = infoUser.data.elements;

    for(let i = 0; i < data?.length; i++){
      let user = undefined
      let rewarder = undefined
      for(let j = 0; j < dataUser?.length; j++){
        if(dataUser[j].id === data[i].USER_ID){
          user = dataUser[j]
        }
        if(dataUser[j].id === data[i].REWARDER_ID){
          rewarder = dataUser[j]
        }
      }
      result.push({...data[i], User: user, Rewarder:rewarder })
    }
    return result
}
  module.exports = {showInfoUserForInterviewSchedule, showInfoUserAward}