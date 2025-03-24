import { useState } from "react";
import { useRecoilState } from "recoil";
import settingApi from "../api/settingApi";
import { settingByUserState, settingsState } from "../recoil/atom/settingState";

export const useSettings = () => {
    const [settings, setSettings] = useRecoilState(settingsState);
    const [settingByUser, setSettingByUser] = useRecoilState(settingByUserState);
    const [setting, setSetting] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const getAllSettings = async () => {
        setIsLoading(true)
        try {
            let res = await settingApi.getAllSettings()
            if (res.data) {
                setSettings(res.data?.elements)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    const getSettingByUser = async (id) => {
        setIsLoading(true)
        try {
            let res = await settingApi.getSettingByUser(id)
            if (res.data) {
                setSettingByUser(res.data?.elements)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const createSetting = async (data, callback, userId) => {
        setIsLoading(true)
        try {
            let res = await settingApi.createSetting(data)
            if (res.data) {
                getAllSettings()
                getSettingByUser(userId)
                setIsLoading(false)
                callback()
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const getSetting = async (id) => {
        setIsLoading(true)
        try {
            let res = await settingApi.getSetting(id)
            if (res.data) {
                setSetting(res.data)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }



    const updateSetting = async (id, data, callback, userId) => {
        setIsLoading(true)
        try {
            let res = await settingApi.updateSetting(id, data)
            if (res.data) {
                getAllSettings()
                setIsLoading(false)
                callback()
                getSettingByUser(userId)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const deleteSetting = async (id) => {
        setIsLoading(true)
        try {
            let res = await settingApi.deleteSetting(id)
            if (res.data) {
                getAllSettings()
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    return {
        getAllSettings,
        createSetting,
        deleteSetting,
        updateSetting,
        setSetting,
        getSetting,
        isLoading,
        settings,
        setting,
        getSettingByUser,
        settingByUser
    }
}