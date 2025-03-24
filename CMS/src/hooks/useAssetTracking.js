import { useState } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState, } from "recoil";
import assetTrackingApi from "../api/assetTrackingApi";
import { assetTrackingState } from "../recoil/atom/assetTrackingState";

export const useAssetTracking = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [assetTracking, setAssetTracking] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [assetTrackings, setAssetTrackings] = useRecoilState(assetTrackingState);


  // get all asset
  const getAllAssetTrackings = async () => {
    setIsLoading(true);
    try {
      let res = await assetTrackingApi.getAllAssetTrackings();
      if (res.data) {
        setIsLoading(false);
        setAssetTrackings(res.data.elements?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  //get all by query
  const getAllByQuery = async (query) => {
    setIsLoading(true);
    try {
      let res = await assetTrackingApi.getAllByQuery(query);
      if (res.data) {
        setIsLoading(false);
        setAssetTrackings(res.data?.elements?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // get asset
  const getAssetTracking = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetTrackingApi.getAssetTracking(id);
      if (res.data) {
        setAssetTracking(res.data?.elements?.assetTracking);
        setIsLoading(false);
        return res.data?.elements?.assetTracking
      }
    } catch (error) {
      setIsLoading(false);

    }
  };


  // get asset by id after update
  const getAssetTrackingIdUpdate = async (id, boolean) => {
    try {
      let res = await assetTrackingApi.getAssetTracking(id);
      if (res.data) {
        const result = res.data?.elements?.assetTracking
        if (boolean) {
          //update list asset
          const _assetTrackings = [...assetTrackings];
          const index = _assetTrackings?.findIndex((item) => item.id === result.id);
          _assetTrackings[index] = { ...result };
          setAssetTrackings(_assetTrackings?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
        } else {
          //create asset
          setAssetTrackings([result, ...assetTrackings])
        }
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  // create asset
  const createAssetTracking = async (data) => {
    setIsLoading(true);
    try {
      let res = await assetTrackingApi.createAssetTracking(data);
      if (res.data) {
        setIsLoading(false);
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        return res.data?.elements
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  // update asset
  const updateAssetTracking = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await assetTrackingApi.updateAssetTracking(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAssetTrackingIdUpdate(id, true)
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  // delete asset
  const deleteAssetTracking = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetTrackingApi.deleteAssetTracking(id);
      if (res.data) {
        setIsLoading(false);
        setAssetTrackings(assetTrackings?.filter(item => item.id !== id))
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
    getAllByQuery,
    assetTracking,
    assetTrackings,
    getAssetTracking,
    setAssetTracking,
    setAssetTrackings,
    deleteAssetTracking,
    updateAssetTracking,
    createAssetTracking,
    getAllAssetTrackings,
  };
};
