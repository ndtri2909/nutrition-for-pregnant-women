import axiosApiInstance from "../utils/axiosClient";

const loginHistoryApi = {
    createUserLoginHistory: (data) => {
        const path = `/userloginhistory/createUserLoginHistory`;
        return axiosApiInstance.post(path, data);
    },

    getAll: () => {
        const path = `/userloginhistory/getAll`;
        return axiosApiInstance.get(path);
    },
};
export default loginHistoryApi;
