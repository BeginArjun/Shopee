import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFav } from "../store/slice/favouriteSlice";
import { useAuth } from "./Auth";
const context=createContext([])

export default function FavProvider({children}){
    const dispatch=useDispatch()
    const fav=useSelector((state)=>state.favourite)
    const {user}=useAuth()
    useEffect(()=>{
        const fetchData=async()=>{
            const res=await fetch('http://192.168.137.1:3000/api/favourite',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${user}`
                }
            })
            const data=await res.json()
            if(data && data.favourites){
                const updatedFavItems = data.favourites.map(favItem => ({
                    id: favItem.id,
                    productId: favItem.product.id,
                    product: favItem.product.product,
                    price: favItem.product.price,
                    display_images: favItem.product.display_images,
                    caption: favItem.product.caption 
                }));
                dispatch(setFav(updatedFavItems));
            }
        }
        fetchData()
    },[dispatch])
    return( 
        <context.Provider value={{fav,setFav}}>
            {children}
        </context.Provider>
    )
}

export const useFav=()=>useContext(context)