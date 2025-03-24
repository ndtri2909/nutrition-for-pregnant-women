import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { useSnackbar } from "notistack";
import { authState } from "../recoil/atom/authState";
import { useAuth } from "./auth";

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [countUser, setCountUser] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();



  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      let res = await userApi.getAllUsers();
      if (res.data) {
        setUsers(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const getCountUserByCity = async () => {
    setIsLoading(true);
    try {
      let res = await userApi.getCountUserByCity();
      if (res.data) {
        setCountUser(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };

  const createUser = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await userApi.createUser(data);
      if (res.data) {
        getAllUsers();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setUser(undefined);
      }
    } catch (error) {
      // enqueueSnackbar("Request failed !", { variant: "error" })
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateUser = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await userApi.updateUser(data, id);
      if (res.data) {
        getAllUsers();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setUser(undefined);
      }
    } catch (error) {

      enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setIsLoading(true);
    try {
      let res = await userApi.deleteUser(id);
      if (res.data) {
        getAllUsers();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {

      // enqueueSnackbar("Request failed !", { variant: "error" })
      setIsLoading(false);
    }
  };

  return {
    users,
    countUser,
    getCountUserByCity,
    deleteUser,
    user,
    setUser,
    updateUser,
    createUser,
    getAllUsers,
    isLoading,
    error,
  };
};
