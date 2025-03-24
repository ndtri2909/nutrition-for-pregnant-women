import { useState } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState, } from "recoil";
import { assetStockCountResultsState } from "../recoil/atom/stockCountState";
import assetStockCountResultApi from "../api/assetStockCountResultApi";

export const useAssetStockCountResult = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [assetStockCountResult, setAssetStockCountResult] = useState(undefined);
  const [assetStockCountResults, setAssetStockCountResults] = useRecoilState(assetStockCountResultsState);


  // get all asset
  const getAllAssetStockCountResults = async () => {
    setIsLoading(true);
    try {
      let res = await assetStockCountResultApi.getAllAssetStockCountResults();
      if (res.data) {
        setIsLoading(false);
        setAssetStockCountResults(res.data.elements?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  //get all by query
  const getAllByQuery = async (query) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountResultApi.getAllByQuery(query);
      if (res.data) {
        setAssetStockCountResults(res.data?.elements);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // get asset
  const getAssetStockCountResult = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountResultApi.getAssetStockCountResult(id);
      if (res.data) {
        setAssetStockCountResult(res.data?.elements?.assetStockCountResult);
        setIsLoading(false);
        return res.data?.elements?.asset
      }
    } catch (error) {
      setIsLoading(false);

    }
  };


  // get asset by id after update
  const getAssetStockCountResultIdUpdate = async (id, boolean) => {
    try {
      let res = await assetStockCountResultApi.getAssetStockCountResult(id);
      if (res.data) {
        const result = res.data?.elements?.assetStockCountResult
        if (boolean) {
          //update list asset
          const _assetStockCountResults = [...assetStockCountResults];
          const index = _assetStockCountResults?.findIndex((item) => item.id === result.id);
          _assetStockCountResults[index] = { ...result };
          setAssetStockCountResults(_assetStockCountResults?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
        } else {
          //create asset
          setAssetStockCountResults([result, ...assetStockCountResults])
        }
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  // create asset
  const createAssetStockCountResult = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountResultApi.createAssetStockCountResult(data);
      if (res.data) {
        const result = res.data?.elements
        await getAssetStockCountResultIdUpdate(result?.id, false)
        await callback();
        setIsLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  // update asset
  const updateAssetStockCountResult = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountResultApi.updateAssetStockCountResult(data, id);
      if (res.data) {
        await getAssetStockCountResultIdUpdate(id, true)
        await callback();
        setIsLoading(false);
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  // delete asset
  const deleteAssetStockCountResult = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountResultApi.deleteAssetStockCountResult(id);
      if (res.data) {
        setIsLoading(false);
        setAssetStockCountResults(assetStockCountResults?.filter(item => item.id !== id))
        enqueueSnackbar(res.data.message, { variant: "success" });
        return res.data
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getAllByQuery,
    assetStockCountResult,
    assetStockCountResults,
    getAssetStockCountResult,
    setAssetStockCountResult,
    setAssetStockCountResults,
    deleteAssetStockCountResult,
    updateAssetStockCountResult,
    createAssetStockCountResult,
    getAllAssetStockCountResults,
  };
};
