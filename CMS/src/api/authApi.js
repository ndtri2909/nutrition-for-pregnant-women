import axios from "axios";
import axiosApiInstance from "../utils/axiosClient";
import { serverHost } from "../config/serverHost";
const authApi = {

    login: (data) => {
        const path = `/auth/login`;
        return axiosApiInstance.post(path, data, );
    },
};

export default authApi;