import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button';
import { decreaseItemQuantity, getCurrentQuantityById, increaseItemQuantity, removeProduct } from './cartSlice';

export default function UpdateItemsQuantity({ id }) {
    const quantity = useSelector(getCurrentQuantityById(id));
    const dispatch = useDispatch();
    function handleIncrease() {
        dispatch(increaseItemQuantity(id));
    }
    function handleDecrease() {
        if (quantity == 1) dispatch(removeProduct(id));
        else dispatch(decreaseItemQuantity(id));
    }
    return (
        <div className='flex justify-center items-center gap-3'>

            <Button onClick={handleDecrease} type={'small'}>
                -
            </Button>
            <p className='text-sm text-stone-500'>{quantity}</p>

            <Button onClick={handleIncrease} type={'small'}>
                +
            </Button>
        </div>
    )
}
