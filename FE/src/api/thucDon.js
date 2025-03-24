import axiosClient from "../utils/axiosClient"

const thucDonApi = {
    getAllThucDonByQuery: (data) => {
        const path = `/thucDon/getAllByQueryThucDon`;
        return axiosClient.post(path, data);
    },
};

export default thucDonApi;

