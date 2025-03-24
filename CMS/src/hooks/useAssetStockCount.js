import { useState } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState, } from "recoil";
import assetStockCountApi from "../api/assetStockCountApi";
import { assetStockCountsState } from "../recoil/atom/stockCountState";

export const useAssetStockCount = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [assetStockCount, setAssetStockCount] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [assetStockCounts, setAssetStockCounts] = useRecoilState(assetStockCountsState);


  // get all asset
  const getAllAssetStockCounts = async () => {
    setIsLoading(true);
    try {
      let res = await assetStockCountApi.getAllAssetStockCounts();
      if (res.data) {
        setIsLoading(false);
        setAssetStockCounts(res.data.elements?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  //get all by query
  const getAllByQuery = async (query) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountApi.getAllByQuery(query);
      if (res.data) {
        setAssetStockCounts(res.data?.elements);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // get asset
  const getAssetStockCount = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountApi.getAssetStockCount(id);
      if (res.data) {
        setAssetStockCount(res.data?.elements?.assetStockCount);
        setIsLoading(false);
        return res.data?.elements?.assetStockCount
      }
    } catch (error) {
      setIsLoading(false);

    }
  };


  // get asset by id after update
  const getAssetStockCountIdUpdate = async (id, boolean) => {
    try {
      let res = await assetStockCountApi.getAssetStockCount(id);
      if (res.data) {
        const result = res.data?.elements?.assetStockCount
        const _assetStockCounts = [...assetStockCounts];
        if (boolean) {
          //update list asset
          const index = _assetStockCounts?.findIndex((item) => item.id === result.id);
          _assetStockCounts[index] = { ...result };
          setAssetStockCounts(_assetStockCounts?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
        } else {
          //create asset
          setAssetStockCounts([result, ..._assetStockCounts])
        }
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message, { variant: "error" });
    }
  };

  // create asset
  const createAssetStockCount = async (data, setStockCountNew) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountApi.createAssetStockCount(data);
      if (res.data) {
        const result = res.data?.elements
        setIsLoading(false);
        getAssetStockCountIdUpdate(result?.id, false)
        // enqueueSnackbar(res.data.message, { variant: "success" });
        setStockCountNew(result)
      }
    } catch (error) {
      // enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  // update asset
  const updateAssetStockCount = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountApi.updateAssetStockCount(data, id);
      if (res.data) {
        getAssetStockCountIdUpdate(id, true)
        callback();
        setIsLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  // delete asset
  const deleteAssetStockCount = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetStockCountApi.deleteAssetStockCount(id);
      if (res.data) {
        setIsLoading(false);
        setAssetStockCounts(assetStockCounts?.filter(item => item.id !== id))
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
    assetStockCount,
    assetStockCounts,
    getAssetStockCount,
    setAssetStockCount,
    setAssetStockCounts,
    deleteAssetStockCount,
    updateAssetStockCount,
    createAssetStockCount,
    getAllAssetStockCounts,
  };
};
