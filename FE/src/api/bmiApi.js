import axiosClient from "../utils/axiosClient"

const bmiApi = {
    getAllBMIByUserId: (id) => {
        const path = `/bmi/getBMIByUser/${id}`;
        return axiosClient.get(path);
    },
    createBMI: (data) => {
        const path = `/bmi/createBMI`;
        return axiosClient.post(path, data);
    },
};

export default bmiApi;

