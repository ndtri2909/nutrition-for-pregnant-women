import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

export const monAnState = atom({
    key: "monAnState",
    default: [],
});

export const monAnOptionState = selector({
    key: "monAnOptionState",
    get: ({ get }) => {
        const monan = get(monAnState);
        if (monan.length) {
            return selectOptions(monan);
        }
        return [];
    }
})
