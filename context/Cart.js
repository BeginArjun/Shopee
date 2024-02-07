import { createContext, useContext, useEffect,useState } from "react";
import { useAuth } from "./Auth";
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../store/slice/cartSlice'; 

const context=createContext({})

export default function CartProvider({children}){
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const {user}=useAuth()
    useEffect(()=>{
        const API_URL=`http://192.168.137.1:3000/api/cart/`
        const fetchData=async()=>{
            const response=await fetch(API_URL,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${user}`
                }
            })
            const data=await response.json()
            
            if(data && data.cartItems){
                const updatedCartItems = data.cartItems.map(cartItem => ({
                    id: cartItem.id,
                    qty: cartItem.quantity,
                    productId: cartItem.product.id,
                    product: cartItem.product.product,
                    price: cartItem.product.price,
                    display_images: cartItem.product.display_images,
                    caption: cartItem.product.caption 
                }));
                dispatch(setCart(updatedCartItems));
            }
            else{
                dispatch(setCart([]));
            }
        }
        fetchData()
    },[dispatch])
    return( 
        <context.Provider value={{cart,dispatch}}>
            {children}
        </context.Provider>
    )
}

export const useCart=()=>useContext(context)