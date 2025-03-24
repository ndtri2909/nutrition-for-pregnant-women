import axiosApiInstance from "../utils/axiosClient";

const dinhDuongApi = {
  getAlldinhDuong: () => {
    const path = `/dinhDuong/getAllDinhDuong`;
    return axiosApiInstance.get(path);
  },
  getdinhDuong: (id) => {
    const path = `/dinhDuong/getIdDinhDuong/${id}`;
    return axiosApiInstance.get(path);
  },
  createdinhDuong: (data) => {
    const path = `/dinhDuong/createDinhDuong`;
    return axiosApiInstance.post(path, data);
  },
  updatedinhDuong: (data, id) => {
    const path = `/dinhDuong/updateDinhDuong/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deletedinhDuong: (id) => {
    const path = `/dinhDuong/deleteDinhDuong/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default dinhDuongApi;
