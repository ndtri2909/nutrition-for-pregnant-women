import { atom } from "recoil";

const starsState = atom({
    key: "starsState",
    default: []
})

export {
    starsState,
}