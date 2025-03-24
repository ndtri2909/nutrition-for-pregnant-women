import { useEffect, useState } from "react";
import { useRecoilState, } from "recoil";
import { phanLoaiState } from "../recoil/atom/phanLoaiState";
import phanLoaiApi from "../api/phanLoaiApi,";

export const usePhanLoai = () => {
  const [PhanLoai, setPhanLoai] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [PhanLoais, setPhanLoais] = useRecoilState(phanLoaiState);

useEffect(()=>{
    getAllPhanLoais()
},[])
  // get all asset
  const getAllPhanLoais = async () => {
    setIsLoading(true);
    try {
      let res = await phanLoaiApi.getAllPhanLoai();
      if (res.data) {
        setIsLoading(false);
        setPhanLoais(res.data.elements);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // get asset
  const getPhanLoai = async (id) => {
    setIsLoading(true);
    try {
      let res = await phanLoaiApi.getPhanLoai(id);
      if (res.data) {
        setPhanLoai(res.data?.elements);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

    }
  };
  // create asset
  const createPhanLoai = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await phanLoaiApi.createPhanLoai(data);
      if (res.data) {
        setIsLoading(false);
        getAllPhanLoais()
        callback()
        return res.data?.elements
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // update asset
  const updatePhanLoai = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await phanLoaiApi.updatePhanLoai(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllPhanLoais()
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // delete asset
  const deletePhanLoai = async (id) => {
    setIsLoading(true);
    try {
      let res = await phanLoaiApi.deletePhanLoai(id);
      if (res.data) {
        setIsLoading(false);
        getAllPhanLoais()
        return res.data
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    PhanLoai,
    PhanLoais,
    getPhanLoai,
    setPhanLoai,
    setPhanLoais,
    deletePhanLoai,
    updatePhanLoai,
    createPhanLoai,
    getAllPhanLoais,
  };
};
