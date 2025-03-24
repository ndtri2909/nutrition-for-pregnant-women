import axiosApiInstance from "../utils/axiosClient";

const congThucApi = {
  getAllCongThuc: () => {
    const path = `/congThuc/getAllCongThuc`;
    return axiosApiInstance.get(path);
  },
  getCongThuc: (id) => {
    const path = `/congThuc/getIdCongThuc/${id}`;
    return axiosApiInstance.get(path);
  },
  createCongThuc: (data) => {
    const path = `/congThuc/createCongThuc`;
    return axiosApiInstance.post(path, data);
  },
  updateCongThuc: (data, id) => {
    const path = `/congThuc/updateCongThuc/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteCongThuc: (id) => {
    const path = `/congThuc/deleteCongThuc/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default congThucApi;
