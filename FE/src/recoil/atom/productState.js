import { atom } from "recoil";

const productsState = atom({
    key: "productsState",
    default: []
})

const productTopState = atom({
    key: "productTopState",
    default: []
})



const productQuerysState = atom({
    key: "productQuerysState",
    default: []
})

const productMenuState = atom({
    key: "productMenuState",
    default: {
        id: 0,
        NAME: "Tất cả",
        DESC: "Tất cả",
        CD: "ALL",
        PATH: "products",
    },
})



const productCartState = atom({
    key: "productCarts",
    default: []
})

const quantityState = atom({
    key: "quantityState",
    default: 1
})

export {
    productsState,
    productMenuState,
    productQuerysState,
    productCartState,
    productTopState,
    quantityState
}