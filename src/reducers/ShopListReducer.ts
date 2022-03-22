import {shopListStateType} from "../App";
import {v1} from "uuid";
import {addShoppingListACType, removeShoppingListACType} from "./DayShoppingListsReducer";

let initialState: shopListStateType = {}

export const ShopListReducer = (state = initialState, action: allShopListReducerType):shopListStateType => {
    switch (action.type) {
        case "ADD-PRODUCT": {
            return {
                ...state,
                [action.payload.shopListID]:
                    [
                        {id: v1(), title: action.payload.title.trim(), isDone: true},
                        ...state[action.payload.shopListID]
                    ]
            }
        }

        case "REMOVE-PRODUCT":{
            /*let newState = {...state}*/
            return {...state, [action.payload.shopListID]:
                    state[action.payload.shopListID]
                        .filter(f=>f.id !== action.payload.id)}
        }

        case "ONCHANGE-CHECKBOX":{
            /*let newState = {...state}*/
            return {...state,
                [action.payload.shopListID]:
                    state[action.payload.shopListID]
                        .map(m=>m.id === action.payload.idCheckBox ?
                            {...m, isDone: action.payload.isDoneCheckBox}: m)}
        }

        case "REMOVE-SHOPPING-LIST": {
            let copyState = {...state}
            delete copyState[action.payload.shopListID]
            return copyState
        }

        case "ADD-SHOPPING-LIST": {
            return {...state, [action.payload.shopListID]: []}
        }
        default:
            return state
    }
}

export type allShopListReducerType = addProductACType | removeProductAC | onChangeCheckboxACType | removeShoppingListACType |addShoppingListACType

export type addProductACType = ReturnType<typeof addProductAC>
export const addProductAC = (shopListID: string, title: string) => {
    return {
        type: 'ADD-PRODUCT',
        payload: {shopListID, title}
    } as const
}

export type removeProductAC = ReturnType<typeof removeProductAC>
export const removeProductAC = (shopListID: string, id: string) => {
  return{
      type: 'REMOVE-PRODUCT',
      payload:{shopListID,id}
  }as const
}

export type onChangeCheckboxACType = ReturnType<typeof onChangeCheckboxAC>
export const onChangeCheckboxAC = (shopListID: string, idCheckBox: string, isDoneCheckBox: boolean) => {
  return{
      type: 'ONCHANGE-CHECKBOX',
      payload: {shopListID, idCheckBox, isDoneCheckBox}
  } as const
}