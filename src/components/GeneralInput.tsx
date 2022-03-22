import React, {ChangeEvent, KeyboardEvent} from 'react';

type propsInputtype = {
    title: string
    error: boolean
    setTitle: (title: string) => void
    setError: (error: boolean) => void
    addProductHandler: () => void
    value: string

}

const GeneralInput = (props: propsInputtype) => {
    const onChangeAddProductHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value)
        props.setError(false)
    }
    const onKeyPressAddProductHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addProductHandler()
        }
    }
    return (
        <div>
            <input
                value={props.value}
                onChange={onChangeAddProductHandler}
                onKeyPress={onKeyPressAddProductHandler}
            />
        </div>
    );
};

export default GeneralInput;