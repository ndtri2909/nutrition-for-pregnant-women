import { atom, selector } from "recoil";
import { selectOptions } from "../../commons";

export const phanLoaiState = atom({
    key: "phanLoaiState",
    default: [],
});
export const phanLoaiOptionState = selector({
    key: "phanLoaiOptionState",
    get: ({ get }) => {
        const phanLoai = get(phanLoaiState);
        if (phanLoai.length) {
            return selectOptions(phanLoai);
        }
        return [];
    }
})