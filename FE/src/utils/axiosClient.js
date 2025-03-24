import axios from 'axios';
import { serverHost } from '../config/serverHost';


const BACKEND_URL = serverHost.user;

const accessToken =
    localStorage.getItem('accessToken') || '';

const axiosApiInstance = axios.create({
    baseURL: BACKEND_URL,
    // withCredentials: true,
    // credentials: 'include',
    // headers: {
    //     Authorization: `${accessToken}`,
    // },
    timeout: 60000,
});

export default axiosApiInstance;

