import axiosClient from "../utils/axiosClient"

const settingApi = {
    getAllSettings: () => {
        const path = `/menu/getAllMenus`;
        return axiosClient.get(path);
    },
    getSetting: (id) => {
        const path = `/menu/getIdMenus/${id}`;
        return axiosClient.get(path);
    },
    getSettingByUser: (id) => {
        const path = `/menu/getMenuByUser/${id}`;
        return axiosClient.get(path);
    },
    createSetting: (data) => {
        const path = `/menu/createMenu`;
        return axiosClient.post(path, data);
    },
    updateSetting: (id, data) => {
        const path = `/menu/updateMenu/${id}`;
        return axiosClient.patch(path, data);
    },
    deleteSetting: (id) => {
        const path = `/menu/deleteMenu/${id}`;
        return axiosClient.delete(path);
    },
};

export default settingApi;

