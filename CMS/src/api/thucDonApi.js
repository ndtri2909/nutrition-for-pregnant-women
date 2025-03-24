import axiosApiInstance from "../utils/axiosClient";

const thucDonApi = {
  getAllThucDon: () => {
    const path = `/thucDon/getAllThucDon`;
    return axiosApiInstance.get(path);
  },
  createThucDon: (data) => {
    const path = `/thucDon/createThucDon`;
    return axiosApiInstance.post(path, data);
  },
  settingThucDon: (data) => {
    const path = `/thucDon/settingThucDon`;
    return axiosApiInstance.post(path, data);
  },
  updateThucDon: (data, id) => {
    const path = `/thucDon/updateThucDon/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteThucDon: (id) => {
    const path = `/thucDon/deleteThucDon/${id}`;
    return axiosApiInstance.delete(path);
  },
  deleteSettingThucDon: (id) => {
    const path = `/thucDon/deleteSettingThucDon/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default thucDonApi;
