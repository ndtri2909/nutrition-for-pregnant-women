import { atom } from "recoil";

const settingsState = atom({
    key: "settingsState",
    default: []
})

const settingByUserState = atom({
    key: "settingByUserState",
    default: []
})

const menuState = atom({
    key: "menuState",
    default: {
        "NAME": "Quản lý cài đặt",
        "ROOT": "setting",
        "PATH": "setting",
    }
})

export {
    settingByUserState,
    settingsState,
    menuState
}