import { useState } from "react";
import { useRecoilState } from "recoil";
import { useSnackbar } from "notistack";
import assetCategoryApi from "../api/assetCategoryApi";
import { assetCatState } from "../recoil/atom/assetState";

export const useAssetCats = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [assetCat, setAssetCat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [assetCats, setAssetCats] = useRecoilState(assetCatState);


  const getAllAssetCategorys = async () => {
    setIsLoading(true);
    try {
      let res = await assetCategoryApi.getAllAssetCategorys();
      if (res.data) {
        setIsLoading(false);
        setAssetCats(res.data.elements?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getAssetCategory = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetCategoryApi.getAssetCategory(id);
      if (res.data) {
        setIsLoading(false);
        setAssetCat(res.data?.elements?.assetCategory);
      }
    } catch (error) {
      setIsLoading(false);

    }
  };
  const createAssetCategory = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await assetCategoryApi.createAssetCategory(data);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllAssetCategorys();
        setAssetCat(undefined);
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const updateAssetCategory = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await assetCategoryApi.updateAssetCategory(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllAssetCategorys();
        setAssetCat(undefined);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const deleteAssetCategory = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetCategoryApi.deleteAssetCategory(id);
      if (res.data) {
        setIsLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
        return res.data
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return {
    assetCat,
    assetCats,
    isLoading,
    setAssetCat,
    setAssetCats,
    getAssetCategory,
    deleteAssetCategory,
    updateAssetCategory,
    createAssetCategory,
    getAllAssetCategorys,
  };
};
