import axiosClient from "../utils/axiosClient"

const bmiApi = {
    getCountBmiByPhanLoai: () => {
        const path = `/bmi/getCountBmiByPhanLoai`;
        return axiosClient.get(path);
    },
};

export default bmiApi;

