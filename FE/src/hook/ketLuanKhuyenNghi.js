import { useState } from "react";
import ketLuanKhuyenNghiApi from "../api/ketLuanKhuyenNghiApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { ketLuanKhuyenNghiState } from "../recoil/atom/ketLuanKhuyenNghiState";

export const useKetLuanKhuyenNghi = () => {
    const [KetLuanKhuyenNghi, setKetLuanKhuyenNghi] = useRecoilState(ketLuanKhuyenNghiState);
    const [isLoading, setIsLoading] = useState(false);
    const getKetLuanKhuyenNghiByValue = async (data, callback) => {
        setIsLoading(true)
        try {
            let res = await ketLuanKhuyenNghiApi.getAllketLuanKhuyenNghiByValue(data)
            if (res.data) {
                setKetLuanKhuyenNghi(res.data?.elements
                    )
                setIsLoading(false)
                    callback() 

            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    return {
        getKetLuanKhuyenNghiByValue,
        isLoading,
        KetLuanKhuyenNghi,
    }
}