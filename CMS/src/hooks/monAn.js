import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState, } from "recoil";
import { monAnState } from "../recoil/atom/monAnState";
import monAnApi from "../api/monAnApi";

export const useMonAn = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [MonAn, setMonAn] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [MonAns, setMonAns] = useRecoilState(monAnState);

useEffect(()=>{
    getAllMonAns()
},[])
  // get all asset
  const getAllMonAns = async () => {
    setIsLoading(true);
    try {
      let res = await monAnApi.getAllMonAn();
      if (res.data) {
        setIsLoading(false);
        setMonAns(res.data.elements);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // get asset
  const getMonAn = async (id) => {
    setIsLoading(true);
    try {
      let res = await monAnApi.getMonAn(id);
      if (res.data) {
        setMonAn(res.data?.elements);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

    }
  };
  // create asset
  const createMonAn = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await monAnApi.createMonAn(data);
      if (res.data) {
        setIsLoading(false);
        getAllMonAns()
        callback()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        return res.data?.elements
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const updateFileMonAn = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await monAnApi.uploadFileMonAn(data);
      if (res.data) {
        setIsLoading(false);
        getAllMonAns()
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
  const updateMonAn = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await monAnApi.updateMonAn(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllMonAns()
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  // delete asset
  const deleteMonAn = async (id) => {
    setIsLoading(true);
    try {
      let res = await monAnApi.deleteMonAn(id);
      if (res.data) {
        setIsLoading(false);
        getAllMonAns()
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
    MonAn,
    MonAns,
    getMonAn,
    setMonAn,
    setMonAns,
    deleteMonAn,
    updateMonAn,
    createMonAn,
    getAllMonAns,
    updateFileMonAn
  };
};
