import { useState } from "react";
import { useRecoilState } from "recoil";
import { useSnackbar } from "notistack";
import { assetTypesState } from "../recoil/atom/assetState";
import assetTypeApi from "../api/assetTypeApi";

export const useAssetType = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [assetCat, setAssetType] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [assetTypes, setAssetTypes] = useRecoilState(assetTypesState);


  const getAllAssetTypes = async () => {
    setIsLoading(true);
    try {
      let res = await assetTypeApi.getAllAssetTypes();
      if (res.data) {
        setIsLoading(false);
        setAssetTypes(res.data.elements?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getAssetTrackingType = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetTypeApi.getAssetTrackingType(id);
      if (res.data) {
        setIsLoading(false);
        setAssetType(res.data?.elements?.assetTrackingType);
      }
    } catch (error) {
      setIsLoading(false);

    }
  };
  const createAssetTrackingType = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await assetTypeApi.createAssetTrackingType(data);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllAssetTypes();
        setAssetType(undefined);
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const updateAssetTrackingType = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await assetTypeApi.updateAssetTrackingType(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAllAssetTypes();
        setAssetType(undefined);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const deleteAssetTrackingType = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetTypeApi.deleteAssetTrackingType(id);
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
    assetTypes,
    isLoading,
    setAssetType,
    setAssetTypes,
    getAssetTrackingType,
    deleteAssetTrackingType,
    updateAssetTrackingType,
    createAssetTrackingType,
    getAllAssetTypes,
  };
};
