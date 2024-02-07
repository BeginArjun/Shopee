import { Image, Pressable, StyleSheet, View,Text, TouchableOpacity, Alert } from "react-native"
import heart from '../assets/icons/heart.png'
import heartfilled from '../assets/icons/heart_filled.png'
import cartImg from '../assets/icons/cart.png'
import { color } from "../styles"
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from "../store/slice/cartSlice";
import {addFav, removeFav, setFav} from '../store/slice/favouriteSlice'
import { useAuth } from "../context/Auth"

export const FavouriteBtn=({product}:{product:Product})=>{
    const {user}=useAuth()
    const dispatch=useDispatch()
    const favoriteProducts = useSelector((state) => state.favourite);

  const isProductInFavorites = favoriteProducts.some((favProduct) => favProduct.productId === product.id);
    const handleClick = async () => {
        try {
            const res = await fetch(`http://192.168.137.1:3000/api/favourite/create?productId=${product.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}`
                }
            })
            const data = await res.json()
            console.log("D",data)
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
        catch (err) {
            console.error(err)

        }
    }

    const handleRemoveFavorite = async () => {
        try {
          const res = await fetch(`http://192.168.137.1:3000/api/favourite/delete?productId=${product.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user}`
            }
          });
    
          const data = await res.json();
          console.log(data)
          if (data) {
            dispatch(removeFav(product.id));
          }
        } catch (err) {
          console.error(err);
        }
    };

    const handleToggleFavorite = () => {
        if (isProductInFavorites) {
          handleRemoveFavorite();
        } else {
          handleClick();
        }
      };

    return(
        <TouchableOpacity style={[color.backgroundSecondary,styles.container]}
        onPress={()=>handleToggleFavorite()}
        >
            <Image source={isProductInFavorites?heartfilled:heart} width={30} height={30} style={styles.image}/>
        </TouchableOpacity>
    )

}

export const CartBtn=({product}:{product:any})=>{
    const dispatch=useDispatch()
    const {user}=useAuth()
    const addToCart=async()=>{
       try{ 
            const API_URL = `http://192.168.137.1:3000/api/cart?product=${product.id}`
            const res = await fetch(API_URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}`
                }})
            const data = await res.json()

            if (data && data.cartItems) {
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

            if(res.ok){
                Alert.alert('Success','Item added to cart')
            }
        }
        catch(err){
            console.error(err)
            
        }

    }
    return(
        <Pressable onPress={()=>addToCart()}
         style={[color.backgroundSecondary,styles.container]}>
            <Image source={cartImg} width={30} height={30} style={styles.image}/>
        </Pressable>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        width:35,
        height:35,
        borderRadius:23,
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        objectFit:'contain'
    }
})