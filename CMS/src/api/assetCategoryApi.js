import axiosApiInstance from "../utils/axiosClient";

const assetCategoryApi = {
  getAllAssetCategorys: () => {
    const path = `/assetCategory/getAll`;
    return axiosApiInstance.get(path);
  },
  getAssetCategory: (id) => {
    const path = `/assetCategory/getAssetCategory/${id}`;
    return axiosApiInstance.get(path);
  },
  createAssetCategory: (data) => {
    const path = `/assetCategory/createAssetCategory`;
    return axiosApiInstance.post(path, data);
  },
  updateAssetCategory: (data, id) => {
    const path = `/assetCategory/updateAssetCategory/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteAssetCategory: (id) => {
    const path = `/assetCategory/deleteAssetCategory/${id}`;
    return axiosApiInstance.delete(path);
  },
  getAllByQuery: (query) => {
    const path = `/assetCategory/getAllByQuery`;
    return axiosApiInstance.post(path, query);
  },
};

export default assetCategoryApi;
