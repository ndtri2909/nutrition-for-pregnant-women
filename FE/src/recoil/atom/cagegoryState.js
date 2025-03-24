import { atom, selector } from "recoil";
import { selectOptions } from "../../commons";

const categoriesState = atom({
    key: "categoriesState",
    default: []
})

const categoryListState = selector({
    key: "categoryListState",
    get: ({ get }) => {
        const categories = get(categoriesState)
        if (categories?.length) {
            return selectOptions(categories)
        } else return []
    }
})

export {
    categoriesState,
    categoryListState
}