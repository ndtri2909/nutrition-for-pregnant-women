import { useState } from "react";
import { useRecoilState } from "recoil";
import assetStatusApi from "../api/assetStatusApi";
import { assetStatusesState } from "../recoil/atom/assetState";

export const useAssetStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assetStatuses, setAssetStatuses] = useRecoilState(assetStatusesState)

  const getAllAssetStatuses = async () => {
    setIsLoading(true);
    try {
      let res = await assetStatusApi.getAllAssetStatuses();
      if (res.data) {
        setAssetStatuses(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    assetStatuses,
    setAssetStatuses,
    getAllAssetStatuses,
  };
};
