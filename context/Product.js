import { createContext, useContext, useEffect, useState } from "react";

const ProductContext=createContext([])

export default function ProductProvider({children}){
    const [products,setProducts]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            const API_URL=`http://192.168.137.1:3000/api/products`
            const response=await fetch(API_URL)
            const data=await response.json()
            setProducts(data)
        }
        fetchData()
    },[])
    return(
        <ProductContext.Provider value={products}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct=()=>useContext(ProductContext)