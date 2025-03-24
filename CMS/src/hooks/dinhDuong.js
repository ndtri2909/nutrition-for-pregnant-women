import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState, } from "recoil";

import { dinhDuongState } from "../recoil/atom/dinhDuongState";
import dinhDuongApi from "../api/dinhDuongApi";

export const useDinhDuong = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [DinhDuong, setDinhDuong] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [DinhDuongs, setDinhDuongs] = useRecoilState(dinhDuongState);

useEffect(()=>{
    getAllDinhDuongs()
},[])
  // get all asset
  const getAllDinhDuongs = async () => {
    setIsLoading(true);
    try {
      let res = await dinhDuongApi.getAlldinhDuong();
      if (res.data) {
        setIsLoading(false);
        setDinhDuongs(res.data.elements);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // get asset
  const getDinhDuong = async (id) => {
    setIsLoading(true);
    try {
      let res = await dinhDuongApi.getdinhDuong(id);
      if (res.data) {
        setDinhDuong(res.data?.elements);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

    }
  };
  // create asset
  const createDinhDuong = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await dinhDuongApi.createdinhDuong(data);
      if (res.data) {
        setIsLoading(false);
        getAllDinhDuongs()
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
  const updateDinhDuong = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await dinhDuongApi.updatedinhDuong(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllDinhDuongs()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  // delete asset
  const deleteDinhDuong = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await dinhDuongApi.deletedinhDuong(id);
      if (res.data) {
        setIsLoading(false);
        getAllDinhDuongs()
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
    DinhDuong,
    DinhDuongs,
    getDinhDuong,
    setDinhDuong,
    setDinhDuongs,
    deleteDinhDuong,
    updateDinhDuong,
    createDinhDuong,
    getAllDinhDuongs,
  };
};
