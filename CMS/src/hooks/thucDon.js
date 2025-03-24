import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState, } from "recoil";
import { thucDonState } from "../recoil/atom/thucDonState";
import thucDonApi from "../api/thucDonApi";

export const useThucdon = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [Thucdon, setThucdon] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [Thucdons, setThucdons] = useRecoilState(thucDonState);

useEffect(()=>{
    getAllThucdons()
},[])
  // get all asset
  const getAllThucdons = async () => {
    setIsLoading(true);
    try {
      let res = await thucDonApi.getAllThucDon();
      if (res.data) {
        setIsLoading(false);
        setThucdons(res.data.elements);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // create asset
  const createThucdon = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await thucDonApi.createThucDon(data);
      if (res.data) {
        setIsLoading(false);
        getAllThucdons()
        callback()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        return res.data?.elements
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const settingThucdon = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await thucDonApi.settingThucDon(data);
      if (res.data) {
        setIsLoading(false);
        getAllThucdons()
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
  const updateThucdon = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await thucDonApi.updateThucDon(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllThucdons()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  // delete asset
  const deleteThucdon = async (id) => {
    setIsLoading(true);
    try {
      let res = await thucDonApi.deleteThucDon(id);
      if (res.data) {
        setIsLoading(false);
        getAllThucdons()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        return res.data
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const deleteSettingThucdon = async (id) => {
    setIsLoading(true);
    try {
      let res = await thucDonApi.deleteSettingThucDon(id);
      if (res.data) {
        setIsLoading(false);
        getAllThucdons()
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
    Thucdon,
    Thucdons,
    setThucdon,
    setThucdons,
    deleteThucdon,
    updateThucdon,
    createThucdon,
    getAllThucdons,
    settingThucdon,
    deleteSettingThucdon
  };
};
