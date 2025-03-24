import { atom, selector } from "recoil";

// asset stock count
export const assetStockCountsState = atom({
    key: "assetStockCounts",
    default: [],
});

export const assetStockCountState = atom({
    key: "assetStockCount",
    default: undefined,
});

export const stockCountNewState = atom({
    key: "stockCountNew",
    default: undefined,
});



// asset stock count result
export const assetStockCountResultsState = atom({
    key: "assetStockCountResults",
    default: [],
});

export const stockCountResultState = atom({
    key: "stockCountResult",
    default: undefined,
});