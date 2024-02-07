import { createSlice } from '@reduxjs/toolkit';

const cartSlice=createSlice({
    name:'cart',
    initialState:[
    ],
    reducers:{
        setCart:(state,action)=>{
            return action.payload
        },
        updateCartItem:(state,action)=>{
            const { itemId, quantity } = action.payload;
            const updatedCart = state.map(item =>
                item.id === itemId ? { ...item, qty: quantity } : item
            );
            return updatedCart.filter(item => item.qty > 0);
        }
    }
})

export const { setCart,updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;