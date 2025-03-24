import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import bmiApi from "../api/bmiApi";
import { bmiState, bmisState } from "../recoil/atom/bmiState";
import { profileState } from "../recoil/atom/userState";
import { convertBmi } from "../commons";

export const useBMI = () => {
    const [bmi, setbmi] = useRecoilState(bmiState);
    const [bmis, setbmis] = useRecoilState(bmisState);
    const profile = useRecoilValue(profileState)
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        if(profile){
            getAllBmi()
        }
    },[profile])
    
    const getAllBmi = async () => {
        setIsLoading(true)
        try {
            let res = await bmiApi.getAllBMIByUserId(profile?.id)
            if (res.data) {
                setbmi(convertBmi(res.data?.elements))
                setbmis(res.data?.elements)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const createBmi = async (data, callback) => {
        setIsLoading(true)
        try {
            let res = await bmiApi.createBMI({...data, USER_ID: profile?.id})
            if (res.data) {
                setIsLoading(false)
                callback()
                getAllBmi()
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    return {
        createBmi,
        isLoading,
        getAllBmi,
        bmi,
        bmis
    }
}