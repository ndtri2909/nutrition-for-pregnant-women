import { useSnackbar } from "notistack";
import { useState } from "react";
import { useRecoilState } from "recoil";
import authApi from "../api/authApi";
import { authState } from "../recoil/atom/authState";


export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const loginDirect = async (data) => {
    setIsLoading(true);
    setError(undefined);
    try {
      let res = await authApi.login(data);
      if(res && res?.data){
        if (res?.data?.elements?.user?.IS_ADMIN === true) {
          setSuccess(res.data.message);
          setAuth({
            profile: res.data.elements.user
          });
          localStorage.setItem("accessToken", res.data.elements.access_token);
          localStorage.setItem("isLogged", true);
          window.location.href = "/";
          setError(undefined);
        }else{
          setIsLoading(false)
          enqueueSnackbar("Tài khoản không phải ADMIN", { variant: "error" });
        }
      }
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data?.status !== 401) {
        enqueueSnackbar(error.response.data?.message, { variant: "error" });
      }

    }
  };

  const logoutDirect = async () => {
    try {
        setAuth({
          profile: "",
        });
        localStorage.removeItem('accessToken')
        localStorage.removeItem('isLogged')
        window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };


  return {
    isLoading,
    error,
    success,
    auth,
    loginDirect,
    logoutDirect
  };
};
