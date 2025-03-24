import axiosApiInstance from "../utils/axiosClient";

const assetStockCountApi = {
  getAllAssetStockCounts: () => {
    const path = `/assetStockCount/getAll`;
    return axiosApiInstance.get(path);
  },
  getAssetStockCount: (id) => {
    const path = `/assetStockCount/getAssetStockCount/${id}`;
    return axiosApiInstance.get(path);
  },
  createAssetStockCount: (data) => {
    const path = `/assetStockCount/createAssetStockCount`;
    return axiosApiInstance.post(path, data);
  },
  updateAssetStockCount: (data, id) => {
    const path = `/assetStockCount/updateAssetStockCount/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteAssetStockCount: (id) => {
    const path = `/assetStockCount/deleteAssetStockCount/${id}`;
    return axiosApiInstance.delete(path);
  },
  getAllByQuery: (query) => {
    const path = `/assetStockCount/getAllByQuery`;
    return axiosApiInstance.post(path, query);
  },
  // getAssetStockCount: (data) => {
  //   const path = `/assetStockCount/getRevenueAssetStockCountByDateRange/${data?.START_MONTH}/${data?.START_YEAR}/${data?.END_MONTH}/${data?.END_YEAR}`;
  //   return axiosApiInstance.get(path);
  // },
};

export default assetStockCountApi;
