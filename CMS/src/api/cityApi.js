import axiosClient from "../utils/axiosClient"

const cityApi = {
    getAllCities: () => {
        const path = `/city/getAll`;
        return axiosClient.get(path);
    },
    deleteCity: (id) => {
        const path = `/city/deleteCity/${id}`;
        return axiosClient.delete(path);
    },
    updateCity: (id, data) => {
        const path = `/city/updateCity/${id}`;
        return axiosClient.patch(path, data);
    },
};

export default cityApi;

