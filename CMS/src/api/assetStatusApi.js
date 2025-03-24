import axiosApiInstance from "../utils/axiosClient";

const assetStatusApi = {
    getAllAssetStatuses: (data) => {
        const path = `/assetStatus/getAll`;
        return axiosApiInstance.get(path);
    },
};

export default assetStatusApi;