import React from 'react';
import {Button} from "@mui/material";
import s from './shoppingList.module.css'


type ButtonType = {
    nameButton: string
    callBackButton: () => void
    variant?: 'text' | 'outlined' | 'contained' | undefined
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}

export const GeneralButton = (props: ButtonType) => {
    const collBackHandler = () => {
        props.callBackButton()
    }

    return (

        <div>
            <Button style={{display: 'flex'}}
                    className={s.buttonFilter}
                    size={'small'}
                    variant={props.variant}
                    onClick={collBackHandler}
            >
                {props.nameButton}
            </Button>
        </div>
    );
};

