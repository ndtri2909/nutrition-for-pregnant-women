import { useEffect, useState } from "react";
import bmiApi from "../api/bmiApi";


export const useBmi = () => {
  const [countBmi, setcountBmi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getCountBmiByPhanLoai();
  }, []);

  const getCountBmiByPhanLoai = async () => {
    setIsLoading(true);
    try {
      let res = await bmiApi.getCountBmiByPhanLoai();
      if (res.data) {
        setcountBmi(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };

  return {
    countBmi, 
    isLoading
  };
};
