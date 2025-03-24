import cityApi from "../api/cityApi";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { cityState } from "../recoil/atom/locationState";

export const useCities = () => {
    const [cities, setCities] = useRecoilState(cityState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        getAllCities()
    },[])

    const getAllCities = async () => {
        setIsLoading(true)
        try {
            let res = await cityApi.getAllCities()
            if (res.data) {
                setCities(res.data?.elements)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const updateCity = async (id, data) => {
        setIsLoading(true)
        try {
            let res = await cityApi.updateCity(id, data)
            if (res.data) {
                setIsLoading(false)
                getAllCities()
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const deleteCity = async (id) => {
        setIsLoading(true)
        try {
            let res = await cityApi.deleteCity(id)
            if (res.data) {
                setIsLoading(false)
                setCities(cities?.filter(item => item.id !== id))
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    return {
        getAllCities,
        deleteCity,
        updateCity,
        isLoading,
        cities,
    }
}