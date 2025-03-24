import { atom } from "recoil";

const collapsedState = atom({
    key: "collapsedState",
    default: false
})

const collapsedMobileState = atom({
    key: "collapsedMobileState",
    default: false
})

const loadingModuleState = atom({
    key: "loadingModuleState",
    default: false
})

const searchDrawerState = atom({
    key: "searchDrawerState",
    default: false
})

const reLoadState = atom({
    key: "reLoadState",
    default: false
})

export {
    collapsedState,
    loadingModuleState,
    collapsedMobileState,
    searchDrawerState,
    reLoadState
}