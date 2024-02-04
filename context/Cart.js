import { createContext, useContext, useEffect, useMemo,useState } from "react";
import { useAuth } from "./Auth";

const context=createContext({})

export default function CartProvider({children}){
    const [cart,setCart]=useState()
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
            setCart(data)
        }
        fetchData()
    },[])
    return( 
        <context.Provider value={{cart,setCart}}>
            {children}
        </context.Provider>
    )
}

export const useCart=()=>useContext(context)