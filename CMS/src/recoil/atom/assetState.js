import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const assetOptions = (array) => {
    const list = [];
    for (let item of array) {
        list.push({
            ...item,
            value: item.CD,
            label: item.CD + " - " + item.NAME
        });
    }
    return list;
};


// asset
export const assetsState = atom({
    key: "assetsState",
    default: [],
});

export const assetListState = atom({
    key: "assetListState",
    default: [],
});

export const assetSelectState = atom({
    key: "assetSelectState",
    default: undefined,
});

export const assetFindSelectState = atom({
    key: "assetFindSelectState",
    default: undefined,
});

export const assetOptionState = selector({
    key: "assetOptionState",
    get: ({ get }) => {
        const assets = get(assetsState)
        if (assets?.length) {
            return assetOptions(assets)
        }
        return []
    }
})


// asset category
export const assetCatState = atom({
    key: "assetCatState",
    default: [],
});

export const assetCatOptionState = selector({
    key: "assetCatOptionState",
    get: ({ get }) => {
        const assetCats = get(assetCatState)
        if (assetCats?.length) {
            return selectOptions(assetCats)
        }
        return []
    }
})


// assetStatuses
export const assetStatusesState = atom({
    key: "assetStatusesState",
    default: [],
});
export const assetStatusOptionState = selector({
    key: "assetStatusOptionState",
    get: ({ get }) => {
        const assetStatuses = get(assetStatusesState)
        if (assetStatuses?.length) {
            return selectOptions(assetStatuses)
        }
        return []
    }
})

// assetCurrentStatusesState
export const assetCurrentStatusesState = atom({
    key: "assetCurrentStatusesState",
    default: [],
});


// asset tracking type
export const assetTypesState = atom({
    key: "assetTypesState",
    default: [],
});

export const assetTypeOptionState = selector({
    key: "assetTypeOption",
    get: ({ get }) => {
        const assetTypes = get(assetTypesState)
        if (assetTypes?.length) {
            return selectOptions(assetTypes)
        }
        return []
    }
})

