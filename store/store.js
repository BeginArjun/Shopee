import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import orderReducer from './slice/orderSlice';
import favouriteReducer from './slice/favouriteSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        order:orderReducer,
        favourite:favouriteReducer
    },
});

export default store;