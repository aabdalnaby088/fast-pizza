import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cart: [
        {
            pizzaId: 12, 
            name: 'mediterranean', 
            quantity: 2, 
            unitPrice: 16,
            totalPrice: 32,
        }
    ], 
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {            
            state.cart.push(action.payload);
            
        },
        removeProduct(state, action){
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action){
            const item = state.cart.find(item => item.pizzaId == action.payload); 
            item.quantity++; 
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action){
            const item = state.cart.find(item => item.pizzaId == action.payload); 
            if(item.quantity > 1){
                item.quantity--;
            }
            item.totalPrice = item.quantity * item.unitPrice;
        },
        clearCart(state){
            state.cart = []; 
        },
    }
})


export const { addProduct, removeProduct, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions; 

export default cartSlice.reducer


export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0); 
export const getCartItems = (state) => state.cart.cart;
export const getCurrentQuantityById = id => state => state.cart.cart.find(item=> item.pizzaId == id)?.quantity?? 0;
