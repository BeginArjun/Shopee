import { Image, Pressable, StyleSheet, View } from "react-native"
import heart from '../assets/icons/heart.png'
import cartImg from '../assets/icons/cart.png'
import { color } from "../styles"
import { useEffect, useMemo, useState } from "react"
import { useCart } from "../context/Cart"

export const FavouriteBtn=()=>{
    return(
        <View style={[color.backgroundSecondary,styles.container]}>
            <Image source={heart} width={30} height={30} style={styles.image}/>
        </View>
    )
}

export const CartBtn=({userId,productId,cartId}:{userId:string,productId:string,cartId})=>{
    const {cart,setCart}=useCart()
    const addToCart=async()=>{
        const API_URL=`http://192.168.137.1:3000/api/cart/${userId}?product=${productId}`
        const res=await fetch(API_URL,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const response=await fetch(`http://192.168.137.1:3000/api/cart/${cartId}`)
        const data=await response.json()
        setCart(data)
        console.log(cart)

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