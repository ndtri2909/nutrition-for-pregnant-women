import axiosApiInstance from "../utils/axiosClient";

const assetCurrentStatusApi = {
    createAssetCurrentStatus: (data) => {
        const path = `/assetCurrentStatus/createAssetCurrentStatus`;
        return axiosApiInstance.post(path, data);
    },
};

export default assetCurrentStatusApi;