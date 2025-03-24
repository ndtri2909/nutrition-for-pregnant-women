import { useState } from "react";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileState, usersState } from "../recoil/atom/userState";

export const useUsers = () => {

    const [users, setUsers] = useRecoilState(usersState);
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const setProfile = useSetRecoilState(profileState)

    const getAllUsers = async () => {
        setIsLoading(true)
        try {
            let res = await userApi.getAllUsers()
            if (res.data) {
                setUsers(res.data?.elements)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const updateUser = async (id, data) => {
        setIsLoading(true)
        try {
            let res = await userApi.updateUser(id, data)
            if (res.data) {
                getAllUsers()
                setIsLoading(false)
                toast.success("Cập nhật người dùng thành công!");
            }
        } catch (error) {
            setIsLoading(false)
            toast.error("Cập nhật người dùng thất bại!");
        }
    }

    const deleteUser = async (id) => {
        setIsLoading(true)
        try {
            let res = await userApi.deleteUser(id)
            if (res.data) {
                getAllUsers()
                setIsLoading(false)
                toast.success("Xóa người dùng thành công!");
            }
        } catch (error) {
            setIsLoading(false)
            toast.error("Xóa người dùng thất bại!");
        }
    }

    const getUser = async (id, callback) => {
        setIsLoading(true)
        try {
            let res = await userApi.getUser(id)
            if (res.data) {
                callback(res.data)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const login = async (data, callback) => {
        setIsLoading(true)
        try {
            let res = await userApi.login(data)
            if (res.data) {
                setProfile(res.data?.elements?.user)
                localStorage.setItem("accessToken", res.data?.elements?.access_token);
                localStorage.setItem("profile", JSON.stringify(res.data?.elements?.user));
                localStorage.setItem("isLogged", true);
                window.location.href = "/"
                callback()
                setIsLoading(false)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setIsLoading(false)
        }
    }



    const logout = () => {
        setProfile(undefined)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLogged");
        localStorage.removeItem("profile");
        window.location.href = "/"
    }


    const register = async (data, callback) => {
        setIsLoading(true)
        try {
            let res = await userApi.register(data)
            if (res.data.status === 200) {
                callback()
                setIsLoading(false)
                toast.success("Đăng ký tài khoản thành công!");
            }
        } catch (error) {
            setIsLoading(false)
            toast.error("Đăng ký tài khoản không thành công thành công!");
        }
    }

    return {
        getAllUsers,
        updateUser,
        deleteUser,
        getUser,
        setUser,
        isLoading,
        user,
        users,
        login,
        register,
        logout
    }
}