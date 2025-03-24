import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState, } from "recoil";
import { congThucState } from "../recoil/atom/congThucState";
import congThucApi from "../api/congThucApi";


export const useCongThuc = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [CongThuc, setCongThuc] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [CongThucs, setCongThucs] = useRecoilState(congThucState);

useEffect(()=>{
    getAllCongThucs()
},[])
  // get all asset
  const getAllCongThucs = async () => {
    setIsLoading(true);
    try {
      let res = await congThucApi.getAllCongThuc();
      if (res.data) {
        setIsLoading(false);
        setCongThucs(res.data.elements);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // get asset
  const getCongThuc = async (id) => {
    setIsLoading(true);
    try {
      let res = await congThucApi.getCongThuc(id);
      if (res.data) {
        setCongThuc(res.data?.elements);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

    }
  };
  // create asset
  const createCongThuc = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await congThucApi.createCongThuc(data);
      if (res.data) {
        setIsLoading(false);
        getAllCongThucs()
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
  const updateCongThuc = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await congThucApi.updateCongThuc(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllCongThucs()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  // delete asset
  const deleteCongThuc = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await congThucApi.deleteCongThuc(id);
      if (res.data) {
        setIsLoading(false);
        getAllCongThucs()
        callback()
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
    CongThuc,
    CongThucs,
    getCongThuc,
    setCongThuc,
    setCongThucs,
    deleteCongThuc,
    updateCongThuc,
    createCongThuc,
    getAllCongThucs,
  };
};
