import axiosApiInstance from "../utils/axiosClient";

const userApi = {
  getAllUsers: () => {
    const path = `/user/getAllUser`;
    return axiosApiInstance.get(path);
  },
  getCountUserByCity: () => {
    const path = `/user/getCountUserByCity`;
    return axiosApiInstance.get(path);
  },
  createUser: (data) => {
    const path = `/auth/register`;
    return axiosApiInstance.post(path, data);
  },
  updateUser: (data, id) => {
    const path = `/user/updateUser/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteUser: (id) => {
    const path = `/user/deleteUser/${id}`;
    return axiosApiInstance.delete(path);
  },

};

export default userApi;
