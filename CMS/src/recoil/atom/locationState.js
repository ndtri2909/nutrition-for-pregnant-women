import { atom, selector } from "recoil";
import { selectOptions, selectOptionsCity } from "../../common";

export const cityState = atom({
    key: "cityState",
    default: []
})
export const citySelectState = atom({
    key: "citySelectState",
    default: undefined
})

export const cityOptionState = selector({
    key: "cityOptionState",
    get: ({ get }) => {
        const cities = get(cityState)
        if (cities?.length) {
            return selectOptionsCity(cities)
        } else return []
    }
})
// work place
export const workPlacesState = atom({
    key: "workPlacesState",
    default: [],
});

export const workPlaceOptionState = selector({
    key: "workPlaceOptionState",
    get: ({ get }) => {
        const workPlaces = get(workPlacesState)
        if (workPlaces?.length) {
            return selectOptions(workPlaces)
        }
        return []
    }
})

// department
export const departmentState = atom({
    key: "departmentState",
    default: [],
});

export const departmentOptionState = selector({
    key: "departmentOptionState",
    get: ({ get }) => {
        const deparment = get(departmentState)
        if (deparment?.length) {
            return selectOptions(deparment)
        }
        return []
    }
})

// working status
export const workingStatusState = atom({
    key: "workingStatusState",
    default: [],
});

export const workingStatusOptionState = selector({
    key: "workingStatusOptionState",
    get: ({ get }) => {
        const workingStatuss = get(workingStatusState)
        if (workingStatuss?.length) {
            return selectOptions(workingStatuss)
        }
        return []
    }
})

