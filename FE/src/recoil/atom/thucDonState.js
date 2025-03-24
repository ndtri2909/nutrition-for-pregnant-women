import { atom } from "recoil";

const thucDonState = atom({
    key: "thucDonState",
    default: []
})
const thucDonByPhanLoaiState = atom({
    key: "thucDonByPhanLoaiState",
    default: []
})

export {
    thucDonState,
    thucDonByPhanLoaiState
}