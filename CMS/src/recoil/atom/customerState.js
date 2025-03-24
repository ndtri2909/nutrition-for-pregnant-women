import { atom, selector } from "recoil";
import { selectOptions } from "../../common";


// customer
export const customerState = atom({
    key: "customerState",
    default: [],
});

export const customerByQueryState = atom({
    key: "customerByQueryState",
    default: [],
});

export const customerTotalState = atom({
    key: "customerTotalState",
    default: undefined,
});

export const commentSaleTrackingState = atom({
    key: "commentSaleTrackingState",
    default: [],
});

export const commentSaleTrackingQueryState = atom({
    key: "commentSaleTrackingQueryState",
    default: [],
});

export const customerTopLeadStatus5State = atom({
    key: "customerTopLeadStatus5State",
    default: [],
});

export const customerSalePinelineState = atom({
    key: "customerSalePinelineState",
    default: [],
});

export const customerSelectState = atom({
    key: "customerSelectState",
    default: undefined,
});


// sourceRegistration
export const sourceRegistrationState = atom({
    key: "sourceRegistrationState",
    default: [],
});

export const sourceRegistrationOptionState = selector({
    key: "sourceRegistrationOptionState",
    get: ({ get }) => {
        const sourceRegistrations = get(sourceRegistrationState)
        if (sourceRegistrations?.length) {
            return selectOptions(sourceRegistrations)
        }
        return []
    }
})


// customer status
export const customerStatusState = atom({
    key: "customerStatusState",
    default: [],
});

export const customerStatusOptionState = selector({
    key: "customerStatusOptionState",
    get: ({ get }) => {
        const customerStatuss = get(customerStatusState)
        if (customerStatuss?.length) {
            return selectOptions(customerStatuss)
        }
        return []
    }
})

// customer type
export const customerTypeState = atom({
    key: "customerTypeState",
    default: [],
});

export const customerTypeSelectState = atom({
    key: "customerTypeSelect",
    default: undefined,
});

export const customerTypeOptionState = selector({
    key: "customerTypeOptionState",
    get: ({ get }) => {
        const customerTypes = get(customerTypeState)
        if (customerTypes?.length) {
            return selectOptions(customerTypes)
        }
        return []
    }
})


// customer sub type
export const customerSubTypeState = atom({
    key: "customerSubType",
    default: [],
});

export const customerSubTypeOptionState = selector({
    key: "customerSubTypeOption",
    get: ({ get }) => {
        const customerSubTypes = get(customerSubTypeState)
        if (customerSubTypes?.length) {
            return selectOptions(customerSubTypes)
        }
        return []
    }
})

export const customerSubTypeByTypeSelectState = selector({
    key: "customerSubTypeByTypeSelect",
    get: ({ get }) => {
        const customerSubTypeOptions = get(customerSubTypeOptionState)
        const customerTypeSelect = get(customerTypeSelectState)
        if (customerSubTypeOptions?.length) {
            if (customerTypeSelect) {
                const data = customerSubTypeOptions?.filter(item => item.CUSTOMER_TYPE_ID === customerTypeSelect)
                return data;
            }
        }
        return []
    }
})

// customer category
export const customerCatState = atom({
    key: "customerCatState",
    default: [],
});

export const customerCatOptionState = selector({
    key: "customerCatOptionState",
    get: ({ get }) => {
        const customerCats = get(customerCatState)
        if (customerCats?.length) {
            return selectOptions(customerCats)
        }
        return []
    }
})



// customer contact
export const customerContactState = atom({
    key: "customerContactState",
    default: [],
});

export const contactByCustomerState = atom({
    key: "contactByCustomerState",
    default: [],
});



// paginationState
export const paginationState = atom({
    key: "paginationState",
    default: {
        from: 0,
        to: 50,
        page: 1,
        sizepage: 50
    },
});
export const sizeState = atom({
    key: "sizeState",
    default: 50,
});
