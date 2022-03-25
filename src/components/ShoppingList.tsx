import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValueType} from "../App";
import s from './shoppingList.module.css'
import {Checkbox, IconButton, TextField} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export type shopListType = {
    id: string
    title: string
    isDone: boolean
}

type propsType = {
    nameList: string
    shopList: Array<shopListType>
    removeProduct: (shopListID: string, id: string) => void
    addProduct: (shopListID: string, title: string) => void
    filterProduct: (shopListID: string, valueBtn: filterValueType) => void
    filter: filterValueType
    shopListID: string
    title: string
    onChangeCheckbox: (shopListID: string, idCheckBox: string, isDoneCheckBox: boolean) => void
    removeShoppingList: (tId: string) => void
}

export const ShoppingList = (props: propsType) => {


    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const addProductHandler = () => {
        if (title.trim() === '') {
            setError(true)
        } else {
            props.addProduct(props.shopListID, title)
            setTitle('')
        }
    }

    const onChangeAddProductHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddProductHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addProductHandler()
        }
    }

    const removeProductHandler = (id: string) => {
        props.removeProduct(props.shopListID, id)
    }

    const onClickFilterHandler = (valueFilterBtn: filterValueType) => {
        props.filterProduct(props.shopListID, valueFilterBtn)
    }

    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>, idCheckBox: string) => {
        props.onChangeCheckbox(props.shopListID, idCheckBox, event.currentTarget.checked)
    }
    const removeShoppingListHandler = () => {
        props.removeShoppingList(props.shopListID)
    }

    return (
        <div className={s.shopListCard}>
            <div className={s.shopListCardTitleFlex}>
                <h3 className={s.shopListTitle}>{props.nameList}</h3>
                <ClearIcon sx={{color:'red'}} onClick={removeShoppingListHandler} />
            </div>

            <div className={s.shopListCardInputFlex}>
                <TextField
                    className={s.shopListCardInput}
                    error={error}
                    id="outlined-basic"
                    label="Add Product"
                    variant="outlined"
                    onChange={onChangeAddProductHandler}
                    value={title}
                    onKeyPress={onKeyPressAddProductHandler}
                    size={'small'}
                />
                <IconButton style={{padding: '0',}} aria-label="delete" onClick={addProductHandler}>
                    <AddIcon sx={{color:'green'}}/>
                </IconButton>
            </div>
            <ul>
                {
                    props.shopList.map(m => {
                        return (
                            <li key={m.id} className={s.shopListItem}>
                                <Checkbox
                                    onChange={(event) => onChangeCheckboxHandler(event, m.id)}
                                    checked={m.isDone}
                                    defaultChecked
                                    sx={{color:'#6A81C1FF'}}
                                />
                                <span className={m.isDone ? s.opacityTitle : ''}>{m.title}</span>

                                <DeleteIcon onClick={() => removeProductHandler(m.id)} sx={{color:'#6A81C1FF'}}/>
                            </li>
                        )
                    })}
            </ul>
            <div className={s.shopListCardBtnFilter}>
                <button
                    className={`${props.filter === 'All' ? s.activeFilter : s.buttonFilter} ${s.buttonFilter} `}
                    onClick={() => onClickFilterHandler('All')}>All
                </button>

                <button
                    className={`${props.filter === 'Active' ? s.activeFilter : s.buttonFilter} ${s.buttonFilter}`}
                    onClick={() => onClickFilterHandler('Active')}>Active
                </button>

                <button
                    className={`${props.filter === 'Completed' ? s.activeFilter : s.buttonFilter} ${s.buttonFilter}`}
                    onClick={() => onClickFilterHandler('Completed')}>Bought
                </button>
            </div>
            {/*<ButtonGroup className={s.shopListCardBtnFilter} style={{color:'#fff'}} >
                <Button
                    className={`${props.filter === 'All' ? s.activeFilter : s.buttonFilter} ${s.buttonFilter}`}
                    onClick={() => onClickFilterHandler('All')}
                >All</Button>
                <Button
                     className={`${props.filter === 'Active' ? s.activeFilter : s.buttonFilter} ${s.buttonFilter}`}
                    onClick={() => onClickFilterHandler('Active')}
                >Active</Button>
                <Button
                     className={`${props.filter === 'Completed' ? s.activeFilter : s.buttonFilter} ${s.buttonFilter}`}
                    onClick={() => onClickFilterHandler('Completed')}
                >Bought</Button>
            </ButtonGroup>*/}

        </div>
    )
}