import React from 'react'
import Button from '../../ui/Button.jsx'
import { useDispatch } from 'react-redux'
import { removeProduct } from './cartSlice.js';

export default function DeleteItem({pizzaId}) {
    const dispatch = useDispatch(); 
    function handleClick() {
        dispatch(removeProduct(pizzaId));
    }
    return (
        <Button onClick={handleClick} type="small">Delete</Button>
    )
}
