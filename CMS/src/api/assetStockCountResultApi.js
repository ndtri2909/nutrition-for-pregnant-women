import axiosApiInstance from "../utils/axiosClient";

const assetStockCountResultApi = {
  getAllAssetStockCountResults: () => {
    const path = `/assetStockCountResult/getAll`;
    return axiosApiInstance.get(path);
  },
  getAssetStockCountResult: (id) => {
    const path = `/assetStockCountResult/getAssetStockCountResult/${id}`;
    return axiosApiInstance.get(path);
  },
  createAssetStockCountResult: (data) => {
    const path = `/assetStockCountResult/createAssetStockCountResult`;
    return axiosApiInstance.post(path, data);
  },
  updateAssetStockCountResult: (data, id) => {
    const path = `/assetStockCountResult/updateAssetStockCountResult/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteAssetStockCountResult: (id) => {
    const path = `/assetStockCountResult/deleteAssetStockCountResult/${id}`;
    return axiosApiInstance.delete(path);
  },
  getAllByQuery: (query) => {
    const path = `/assetStockCountResult/getAllByQuery`;
    return axiosApiInstance.post(path, query);
  },
  // getAssetStockCountResult: (data) => {
  //   const path = `/assetStockCountResult/getRevenueAssetStockCountResultByDateRange/${data?.START_MONTH}/${data?.START_YEAR}/${data?.END_MONTH}/${data?.END_YEAR}`;
  //   return axiosApiInstance.get(path);
  // },
};

export default assetStockCountResultApi;
