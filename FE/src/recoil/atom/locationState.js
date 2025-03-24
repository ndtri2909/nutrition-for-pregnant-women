import { atom, selector } from "recoil";
import { selectOptions, selectOptionsCity } from "../../commons";

const cityState = atom({
    key: "cityState",
    default: []
})
const citySelectState = atom({
    key: "citySelectState",
    default: undefined
})

const cityOptionState = selector({
    key: "cityOptionState",
    get: ({ get }) => {
        const cities = get(cityState)
        if (cities?.length) {
            return selectOptionsCity(cities)
        } else return []
    }
})


const districtState = atom({
    key: "districtState",
    default: []
})
const districtSelectState = atom({
    key: "districtSelectState",
    default: undefined
})

const districtOptionState = selector({
    key: "districtOptionState",
    get: ({ get }) => {
        const districts = get(districtState)
        const citySelect = get(citySelectState)
        if (districts?.length) {
            const district = selectOptions(districts)
            if (citySelect) {
                return district?.filter(item => item.CITY_ID === citySelect)
            } else {
                return district
            }
        } else return []
    }
})



const wardState = atom({
    key: "wardState",
    default: []
})
const wardSelectState = atom({
    key: "wardSelectState",
    default: undefined
})


const wardOptionState = selector({
    key: "wardOptionState",
    get: ({ get }) => {
        const wards = get(wardState)
        const districtOption = get(districtOptionState)
        const districtSelect = get(districtSelectState)
        if (wards?.length) {
            const ward = selectOptions(wards)
            if (districtOption?.length) {
                if (districtSelect) {
                    return ward?.filter(item => item.DISTRICT_ID === districtSelect)
                } else {
                    let data = []
                    ward?.forEach(item => {
                        const check = districtOption?.some(el => el.id === item.DISTRICT_ID)
                        if (check) { data.push(item) }
                    })
                    return [...data]
                }
            } else return []
        } else return []
    }
})


export {
    cityState,
    cityOptionState,
    districtState,
    districtOptionState,
    wardState,
    wardOptionState,
    citySelectState,
    districtSelectState,
    wardSelectState
}