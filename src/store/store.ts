import {combineReducers, createStore} from "redux";
import {DayShoppingListsReducer} from "../reducers/DayShoppingListsReducer";
import {ShopListReducer} from "../reducers/ShopListReducer";

let rootReducer = combineReducers({
    DayShoppingLists: DayShoppingListsReducer,
    ShopList:ShopListReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)