import { useState } from "react";
import assetApi from "../api/assetApi";
import { useRecoilState, } from "recoil";
import { useSnackbar } from "notistack";
import { assetListState, assetsState } from "../recoil/atom/assetState";

export const useAssets = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [asset, setAsset] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useRecoilState(assetsState);
  const [assetList, setAssetList] = useRecoilState(assetListState);

  // get all asset
  const getAllAssets = async () => {
    setIsLoading(true);
    try {
      let res = await assetApi.getAllAssets();
      if (res.data) {
        const data = res.data.elements?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE))
        setIsLoading(false);
        setAssetList(data);
        setAssets(data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  //get all by query
  const getAllByQuery = async (query) => {
    setIsLoading(true);
    try {
      let res = await assetApi.getAllByQuery(query);
      if (res.data) {
        setAssets(res.data?.elements);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  // get asset
  const getAsset = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetApi.getAsset(id);
      if (res.data) {
        setAsset(res.data?.elements?.asset);
        setIsLoading(false);
        return res.data?.elements?.asset
      }
    } catch (error) {
      setIsLoading(false);

    }
  };


  // get asset by id after update
  const getAssetIdUpdate = async (id, boolean) => {
    try {
      let res = await assetApi.getAsset(id);
      if (res.data) {
        const result = res.data?.elements?.asset
        if (boolean) {
          //update list asset
          const _assets = [...assets];
          const index = _assets?.findIndex((item) => item.id === result.id);
          _assets[index] = { ...result };
          setAssets(_assets?.sort((a, b) => new Date(b?.MODIFIED_DATE) - new Date(a?.MODIFIED_DATE)));
        } else {
          //create asset
          setAssets([result, ...assets])
        }
        return result
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  // create asset
  const createAsset = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await assetApi.createAsset(data);
      if (res.data) {
        const result = res.data?.elements
        callback();
        setIsLoading(false);
        getAssetIdUpdate(result?.id, false)
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  // update asset
  const updateAsset = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await assetApi.updateAsset(data, id);
      if (res.data) {
        callback();
        setIsLoading(false);
        getAssetIdUpdate(id, true)
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  // delete asset
  const deleteAsset = async (id) => {
    setIsLoading(true);
    try {
      let res = await assetApi.deleteAsset(id);
      if (res.data) {
        setIsLoading(false);
        setAssets(assets?.filter(item => item.id !== id))
        enqueueSnackbar(res.data.message, { variant: "success" });
        return res.data
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return {
    asset,
    assets,
    assetList,
    getAsset,
    setAsset,
    setAssets,
    isLoading,
    deleteAsset,
    updateAsset,
    createAsset,
    getAllAssets,
    getAllByQuery,
    getAssetIdUpdate
  };
};
