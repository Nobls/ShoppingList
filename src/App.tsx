import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {shopListType, ShoppingList} from "./components/ShoppingList";
import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {addShoppingListAC, filterProductAC, removeShoppingListAC} from "./reducers/DayShoppingListsReducer";
import {addProductAC, onChangeCheckboxAC, removeProductAC} from "./reducers/ShopListReducer";

export type filterValueType = "All" | "Active" | "Completed";

export type dayShoppingListsType = {
    id: string
    titleList: string
    filter: filterValueType
}

export type shopListStateType = {
    [key: string]: shopListType[]
}


function App() {
    const dayShoppingLists = useSelector<rootReducerType, dayShoppingListsType[]>(state => state.DayShoppingLists)
    const shopList = useSelector<rootReducerType, shopListStateType>(state => state.ShopList)
    const dispatch = useDispatch()

    const addProduct = (shopListID: string, title: string) => {
        dispatch(addProductAC(shopListID, title))
    }

    const removeProduct = (shopListID: string, id: string) => {
        dispatch(removeProductAC(shopListID, id))
    }

    const removeShoppingList = (shopListID: string) => {
        dispatch(removeShoppingListAC(shopListID))
    }

    const filterProduct = (shopListID: string, valueFilterBtn: filterValueType) => {
        dispatch(filterProductAC(shopListID, valueFilterBtn))
    }

    const onChangeCheckbox = (shopListID: string, idCheckBox: string, isDoneCheckBox: boolean) => {
        dispatch(onChangeCheckboxAC(shopListID, idCheckBox, isDoneCheckBox))
    }

    const [titleNewShoppingList, setTitleNewShoppingList] = useState('')

    const newTitleShoppingListValue = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleNewShoppingList(event.currentTarget.value)
        console.log(titleNewShoppingList)
    }

    const addShoppingList = (title: string) => {
        dispatch(addShoppingListAC(title))
    }

    return (

        <div className="App">

            <AppBar position="static">
                <Toolbar
                    className={'toolBar'}
                >
                    <Typography variant="h6" style={{display: 'flex', alignItems: 'center'}}>
                        Shopping List
                        <ShoppingBasketIcon style={{marginLeft: '10px'}}/>
                    </Typography>
                    <div className={'inputWrapper'}>
                        <input style={{
                            height: '30px',
                            borderRadius: '5px',
                            marginRight: '20px',
                            backgroundColor: '#dadfed',
                            textAlign: 'center',
                            outline: 'none',
                            border: '1px solid #6A81C1FF'
                        }} value={titleNewShoppingList} type="date" onChange={newTitleShoppingListValue}/>
                        <Button style={{backgroundColor: '#dadfed'}} size={'small'}
                                onClick={() => addShoppingList(titleNewShoppingList)}>+</Button>
                    </div>

                </Toolbar>
            </AppBar>

            <Grid container spacing={0}>
                {
                    dayShoppingLists.map(m => {
                        let shopListForShoppingList = shopList[m.id]

                        if (m.filter === 'Active') {
                            shopListForShoppingList = shopList[m.id].filter(f => !f.isDone)
                        }

                        if (m.filter === 'Completed') {
                            shopListForShoppingList = shopList[m.id].filter(f => f.isDone)
                        }
                        return (
                            <ShoppingList
                                key={m.id}
                                shopListID={m.id}
                                title={m.titleList}
                                nameList={m.titleList}
                                shopList={shopListForShoppingList}
                                removeProduct={removeProduct}
                                addProduct={addProduct}
                                filterProduct={filterProduct}
                                filter={m.filter}
                                onChangeCheckbox={onChangeCheckbox}
                                removeShoppingList={removeShoppingList}
                            />
                        )
                    })
                }
            </Grid>
        </div>
    );
}

export default App;
