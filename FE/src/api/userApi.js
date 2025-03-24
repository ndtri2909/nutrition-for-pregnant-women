import axiosApiInstance from "../utils/axiosClient";

const userApi = {
    getAllUsers: () => {
        const path = `/user/getAllUser`;
        return axiosApiInstance.get(path);
    },
    getUser: (id) => {
        const path = `/user/getIdUser/${id}`;
        return axiosApiInstance.get(path);
    },
    // createUser: (data) => {
    //     const path = `/user/createUser`;
    //     return axiosApiInstance.post(path, data);
    // },
    updateUser: (id, data) => {
        const path = `/user/updateUser/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteUser: (id) => {
        const path = `/user/deleteUser/${id}`;
        return axiosApiInstance.delete(path);
    },

    login: (data) => {
        const path = `/auth/login`;
        return axiosApiInstance.post(path, data);
    },

    register: (data) => {
        const path = `/auth/register`;
        return axiosApiInstance.post(path, data);
    },
};

export default userApi;

