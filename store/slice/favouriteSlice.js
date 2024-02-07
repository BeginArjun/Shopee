import { createSlice } from "@reduxjs/toolkit";

const favSlice=createSlice({
    name:'favourite',
    initialState:[],
    reducers:{
        setFav:(state,action)=>{
            return action.payload
        },
        addFav:(state,action)=>{
           return [action.payload,...state]
        },
        removeFav:(state,action)=>{
            return state.filter((item)=>item.productId!==action.payload)
        }
    }
})

export const {setFav,addFav,removeFav}=favSlice.actions
export default favSlice.reducer