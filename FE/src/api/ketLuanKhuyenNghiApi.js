import axiosClient from "../utils/axiosClient"

const ketLuanKhuyenNghiApi = {
    getAllketLuanKhuyenNghiByValue: (data) => {
        const path = `/ketLuanKhuyenNghi/getKetLuanKhuyenNghiByValue`;
        return axiosClient.post(path, data);
    },
};

export default ketLuanKhuyenNghiApi;

