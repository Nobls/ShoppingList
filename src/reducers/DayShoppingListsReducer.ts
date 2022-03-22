import {dayShoppingListsType, filterValueType} from "../App";
import {v1} from "uuid";

let initialState: dayShoppingListsType[] = []

export const DayShoppingListsReducer = (state = initialState, action: allDayShoppingListsReducerType):dayShoppingListsType[] => {
    switch (action.type) {
        case "REMOVE-SHOPPING-LIST": {
            return state.filter(f => f.id !== action.payload.shopListID)
        }

        case "ADD-SHOPPING-LIST": {
            return [...state, {
                id: action.payload.shopListID,
                titleList: action.payload.title,
                filter: 'All' as filterValueType
            }]
        }

        case "FILTER-PRODUCT": {
            return state.map(m=>m.id === action.payload.shopListID ?
                {...m, filter: action.payload.valueFilterBtn} : m)
        }
        default:
            return state
    }
}

export type allDayShoppingListsReducerType =
    removeShoppingListACType
    | addShoppingListACType
    | filterProductACType

export type removeShoppingListACType = ReturnType<typeof removeShoppingListAC>
export const removeShoppingListAC = (shopListID: string) => {
    return {
        type: 'REMOVE-SHOPPING-LIST',
        payload: {shopListID}
    } as const
}

export type addShoppingListACType = ReturnType<typeof addShoppingListAC>
export const addShoppingListAC = (title: string) => {
    return {
        type: 'ADD-SHOPPING-LIST',
        payload: {title, shopListID: v1()}
    } as const
}

export type filterProductACType = ReturnType<typeof filterProductAC>
export const filterProductAC = (shopListID: string, valueFilterBtn: filterValueType) => {
    return {
        type: 'FILTER-PRODUCT',
        payload: {shopListID, valueFilterBtn}
    } as const
}