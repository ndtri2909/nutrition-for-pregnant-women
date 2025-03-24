import axiosApiInstance from "../utils/axiosClient";

const phanLoaiApi = {
  getAllPhanLoai: () => {
    const path = `/phanLoai/getAllPhanLoai`;
    return axiosApiInstance.get(path);
  },
  getPhanLoai: (id) => {
    const path = `/phanLoai/getIdPhanLoai/${id}`;
    return axiosApiInstance.get(path);
  },
  createPhanLoai: (data) => {
    const path = `/phanLoai/createPhanLoai`;
    return axiosApiInstance.post(path, data);
  },
  updatePhanLoai: (data, id) => {
    const path = `/phanLoai/updatePhanLoai/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deletePhanLoai: (id) => {
    const path = `/phanLoai/deletePhanLoai/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default phanLoaiApi;
