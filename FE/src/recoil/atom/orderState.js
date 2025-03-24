import { atom } from "recoil";

const orderState = atom({
    key: "orderState",
    default: []
})

const noteState = atom({
    key: "noteState",
    default: null
})

const orderSuccessState = atom({
    key: "orderSuccessState",
    default: undefined
})

export {
    orderSuccessState,
    orderState,
    noteState
}