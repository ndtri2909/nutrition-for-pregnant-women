import axiosApiInstance from "../utils/axiosClient";

const assetApi = {
  getAllAssets: () => {
    const path = `/asset/getAll`;
    return axiosApiInstance.get(path);
  },
  getAsset: (id) => {
    const path = `/asset/getAsset/${id}`;
    return axiosApiInstance.get(path);
  },
  createAsset: (data) => {
    const path = `/asset/createAsset`;
    return axiosApiInstance.post(path, data);
  },
  updateAsset: (data, id) => {
    const path = `/asset/updateAsset/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteAsset: (id) => {
    const path = `/asset/deleteAsset/${id}`;
    return axiosApiInstance.delete(path);
  },
  getAllByQuery: (query) => {
    const path = `/asset/getAllByQuery`;
    return axiosApiInstance.post(path, query);
  },
};

export default assetApi;
