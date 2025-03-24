import { atom } from "recoil";

export const curentState = atom({
    key: "curent",
    default: undefined
})

export const statussState = atom({
    key: "statuss",
    default: []
})

export const bmiResultState = atom({
    key: "bmiResultState",
    default: null
})
export const dataChartState = atom({
    key: "dataChartState",
    default: undefined
})
