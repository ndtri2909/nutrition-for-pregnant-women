import { useEffect, useState } from "react";
import { useRecoilState, } from "recoil";
import { tinTucState } from "../recoil/atom/tinTucState";
import tinTucApi from "../api/tinTucApi";

export const useTinTuc = () => {
  const [TinTuc, setTinTuc] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [TinTucs, setTinTucs] = useRecoilState(tinTucState);

useEffect(()=>{
    getAllTinTucs()
},[])
  // get all asset
  const getAllTinTucs = async () => {
    setIsLoading(true);
    try {
      let res = await tinTucApi.getAllTinTuc();
      if (res.data) {
        setIsLoading(false);
        setTinTucs(res.data.elements);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // get asset
  const getTinTuc = async (id) => {
    setIsLoading(true);
    try {
      let res = await tinTucApi.getTinTuc(id);
      if (res.data) {
        setTinTuc(res.data?.elements);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

    }
  };
  // create asset
  const createTinTuc = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await tinTucApi.createTinTuc(data);
      if (res.data) {
        setIsLoading(false);
        getAllTinTucs()
        callback()
        return res.data?.elements
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // update asset
  const updateTinTuc = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await tinTucApi.updateTinTuc(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllTinTucs()
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // delete asset
  const deleteTinTuc = async (id) => {
    setIsLoading(true);
    try {
      let res = await tinTucApi.deleteTinTuc(id);
      if (res.data) {
        setIsLoading(false);
        getAllTinTucs()
        return res.data
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    TinTuc,
    TinTucs,
    getTinTuc,
    setTinTuc,
    setTinTucs,
    deleteTinTuc,
    updateTinTuc,
    createTinTuc,
    getAllTinTucs,
  };
};
