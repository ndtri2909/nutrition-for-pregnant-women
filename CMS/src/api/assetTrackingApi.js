import axiosApiInstance from "../utils/axiosClient";

const assetTrackingApi = {
  getAllAssetTrackings: () => {
    const path = `/assetTracking/getAll`;
    return axiosApiInstance.get(path);
  },
  getAssetTracking: (id) => {
    const path = `/assetTracking/getAssetTracking/${id}`;
    return axiosApiInstance.get(path);
  },
  createAssetTracking: (data) => {
    const path = `/assetTracking/createAssetTracking`;
    return axiosApiInstance.post(path, data);
  },
  updateAssetTracking: (data, id) => {
    const path = `/assetTracking/updateAssetTracking/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteAssetTracking: (id) => {
    const path = `/assetTracking/deleteAssetTracking/${id}`;
    return axiosApiInstance.delete(path);
  },
  getAllByQuery: (query) => {
    const path = `/assetTracking/getAllByQuery`;
    return axiosApiInstance.post(path, query);
  },
};

export default assetTrackingApi;
