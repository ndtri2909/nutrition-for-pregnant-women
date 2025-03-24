import { atom } from "recoil";

const usersState = atom({
    key: "usersState",
    default: []
})

const profileState = atom({
    key: "profileState",
    default: undefined
})

export {
    usersState,
    profileState
}