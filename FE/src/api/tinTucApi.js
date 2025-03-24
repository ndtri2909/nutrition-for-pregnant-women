import axiosApiInstance from "../utils/axiosClient";

const tinTucApi = {
  getAllTinTuc: () => {
    const path = `/tinTuc/getAllTinTuc`;
    return axiosApiInstance.get(path);
  },
  getTinTuc: (id) => {
    const path = `/tinTuc/getIdTinTuc/${id}`;
    return axiosApiInstance.get(path);
  },
  createTinTuc: (data) => {
    const path = `/tinTuc/createTinTuc`;
    return axiosApiInstance.post(path, data);
  },
  updateTinTuc: (data, id) => {
    const path = `/tinTuc/updateTinTuc/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteTinTuc: (id) => {
    const path = `/tinTuc/deleteTinTuc/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default tinTucApi;
