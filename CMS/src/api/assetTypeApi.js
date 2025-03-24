import axiosApiInstance from "../utils/axiosClient";

const assetTypeApi = {
  getAllAssetTypes: () => {
    const path = `/assetTrackingType/getAll`;
    return axiosApiInstance.get(path);
  },
  getAssetTrackingType: (id) => {
    const path = `/assetTrackingType/getAssetTrackingType/${id}`;
    return axiosApiInstance.get(path);
  },
  createAssetTrackingType: (data) => {
    const path = `/assetTrackingType/createAssetTrackingType`;
    return axiosApiInstance.post(path, data);
  },
  updateAssetTrackingType: (data, id) => {
    const path = `/assetTrackingType/updateAssetTrackingType/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteAssetTrackingType: (id) => {
    const path = `/assetTrackingType/deleteAssetTrackingType/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default assetTypeApi;
