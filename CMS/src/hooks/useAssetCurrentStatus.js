import { useState } from "react";
import assetCurrentStatusApi from "../api/assetCurrentStatusApi";

export const useAssetCurrentStatus = () => {
  const [isLoading, setIsLoading] = useState(false);


  // create asset
  const createAssetCurrentStatus = async (data) => {
    setIsLoading(true);
    try {
      let res = await assetCurrentStatusApi.createAssetCurrentStatus(data);
      if (res.data) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };


  return {
    isLoading,
    createAssetCurrentStatus,
  };
};
