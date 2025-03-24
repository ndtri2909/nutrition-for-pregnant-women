import axiosApiInstance from "../utils/axiosClient";

const ketLuanKhuyenNghiApi = {
  getAllKetLuanKhuyenNghi: () => {
    const path = `/ketLuanKhuyenNghi/getAllKetLuanKhuyenNghi`;
    return axiosApiInstance.get(path);
  },
  createKetLuanKhuyenNghi: (data) => {
    const path = `/ketLuanKhuyenNghi/createKetLuanKhuyenNghi`;
    return axiosApiInstance.post(path, data);
  },
  getKetLuanKhuyenNghiByValue: (data) => {
    const path = `/ketLuanKhuyenNghi/getKetLuanKhuyenNghiByValue`;
    return axiosApiInstance.post(path, data);
  },
  updateKetLuanKhuyenNghi: (data, id) => {
    const path = `/ketLuanKhuyenNghi/updateKetLuanKhuyenNghi/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteKetLuanKhuyenNghi: (id) => {
    const path = `/ketLuanKhuyenNghi/deleteKetLuanKhuyenNghi/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default ketLuanKhuyenNghiApi;
