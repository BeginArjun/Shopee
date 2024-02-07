import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
var initialState=[];

const orderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{
        setOrder:(state,action)=>{
            return action.payload
        },
        updateOrderList:(state,action)=>{
            const {order}=action.payload;
            return [order,...state]
        }
    }
})
export const {setOrder}=orderSlice.actions
export default orderSlice.reducer