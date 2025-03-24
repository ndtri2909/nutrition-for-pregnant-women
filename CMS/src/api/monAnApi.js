import axiosApiInstance from "../utils/axiosClient";

const monAnApi = {
  getAllMonAn: () => {
    const path = `/monan/getAllMonAn`;
    return axiosApiInstance.get(path);
  },
  getAllByQueryMonAn: () => {
    const path = `/monan/getAllByQueryMonAn`;
    return axiosApiInstance.get(path);
  },
  getMonAn: (id) => {
    const path = `/monan/getIdMonAn/${id}`;
    return axiosApiInstance.get(path);
  },
  createMonAn: (data) => {
    const path = `/monan/createMonAn`;
    return axiosApiInstance.post(path, data);
  },
  uploadFileMonAn: (data) => {
    const path = `/monan/uploadFileMonAn`;
    return axiosApiInstance.post(path, data);
  },
  updateMonAn: (data, id) => {
    const path = `/monan/updateMonAn/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteMonAn: (id) => {
    const path = `/monan/deleteMonAn/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default monAnApi;
