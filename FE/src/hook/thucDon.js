import { useRecoilState } from "recoil";
import { useState } from "react";
import { thucDonByPhanLoaiState, thucDonState } from "../recoil/atom/thucDonState";
import thucDonApi from "../api/thucDon";

export const useThucDon = () => {
    const [ThucDon, setThucDon] = useRecoilState(thucDonState);
    const [ThucDonByPhanLoai, setThucDonByPhanLoai] = useRecoilState(thucDonByPhanLoaiState);
    const [isLoading, setIsLoading] = useState(false);

    const getAllByQueryThucDon = async (data) => {
        setIsLoading(true)
        try {
            let res = await thucDonApi.getAllThucDonByQuery(data)
            if (res.data) {
                setThucDon(res.data?.elements?.[0]?.Setting_ThucDons
                    )
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    const getAllThucDonByPhanLoai = async (data) => {
        setIsLoading(true)
        try {
            let res = await thucDonApi.getAllThucDonByQuery(data)
            if (res.data) {
                setThucDonByPhanLoai(res.data?.elements
                    )
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }



    return {
        getAllByQueryThucDon,
        isLoading,
        ThucDon,
        ThucDonByPhanLoai, 
        getAllThucDonByPhanLoai
    }
}