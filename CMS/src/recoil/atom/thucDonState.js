import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

export const thucDonState = atom({
    key: "thucDonState",
    default: [],
});

export const thucDonOptionState = selector({
    key: "thucDonOptionState",
    get: ({ get }) => {
        const thucDon = get(thucDonState);
        if (thucDon.length) {
            return selectOptions(thucDon);
        }
        return [];
    }
})
