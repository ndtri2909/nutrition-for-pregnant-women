import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState, } from "recoil";
import { ketLuanKhuyenNghiState } from "../recoil/atom/ketLuanKhuyenNghiState";
import ketLuanKhuyenNghiApi from "../api/ketLuanKhuyenNghiApi";

export const useKetLuanKhuyenNghi = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [KetLuanKhuyenNghi, setKetLuanKhuyenNghi] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [KetLuanKhuyenNghis, setKetLuanKhuyenNghis] = useRecoilState(ketLuanKhuyenNghiState);

useEffect(()=>{
    getAllKetLuanKhuyenNghis()
},[])
  // get all asset
  const getAllKetLuanKhuyenNghis = async () => {
    setIsLoading(true);
    try {
      let res = await ketLuanKhuyenNghiApi.getAllKetLuanKhuyenNghi();
      if (res.data) {
        setIsLoading(false);
        setKetLuanKhuyenNghis(res.data.elements);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const createKetLuanKhuyenNghi = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await ketLuanKhuyenNghiApi.createKetLuanKhuyenNghi(data);
      if (res.data) {
        setIsLoading(false);
        getAllKetLuanKhuyenNghis()
        callback()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        return res.data?.elements
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  // update asset
  const updateKetLuanKhuyenNghi = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await ketLuanKhuyenNghiApi.updateKetLuanKhuyenNghi(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllKetLuanKhuyenNghis()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  // delete asset
  const deleteKetLuanKhuyenNghi = async (id) => {
    setIsLoading(true);
    try {
      let res = await ketLuanKhuyenNghiApi.deleteKetLuanKhuyenNghi(id);
      if (res.data) {
        setIsLoading(false);
        getAllKetLuanKhuyenNghis()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        return res.data
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    KetLuanKhuyenNghi,
    KetLuanKhuyenNghis,
    setKetLuanKhuyenNghi,
    setKetLuanKhuyenNghis,
    deleteKetLuanKhuyenNghi,
    updateKetLuanKhuyenNghi,
    createKetLuanKhuyenNghi,
    getAllKetLuanKhuyenNghis,
  };
};
