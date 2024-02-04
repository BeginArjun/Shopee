import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Loader from '../components/Loader';
import { color, layout, sizes } from '../styles';

import {FavouriteBtn,CartBtn} from '../components/Button';
import CartProvider from '../context/Cart';


const ProductDisplay=({image,id}:{image:string,id:string})=>{
    return(
        <View style={[color.backgroundPrimary,styles.imageDisplay]}>
            <Image source={{uri:image}} width={298} height={315}/>
            <View style={styles.imageDisplayIcons}>
                <FavouriteBtn/>
                <CartBtn userId='d6b94b5f-bc33-406a-859f-a71bb5438b56'
                cartId='54d29d80-e84b-4b48-ba96-c0ec63b6ba83'
                productId={id}
                />
            </View>
        </View>
    )
}

const ProductBody=({desc}:{desc:string})=>{
    return(
        <View style={{marginTop:20,marginBottom:50}}>
            <Text style={[sizes.body1,{color:'rgba(0, 0, 0, 0.40)'}]}>{desc}</Text>
        </View>
    )
}

const ProductTitle=({title,price,caption}:{title:string,price:Number,caption:string})=>{
    return(
        <View>
            <Text style={[sizes.heading2,color.contentPrimary,{fontWeight:'800'}]}
            >${parseFloat(`${price}`).toFixed(2)}</Text>
            <Text style={[sizes.heading2,color.contentPrimary,{fontWeight:'600'}]}>{title}</Text>
            <Text style={[sizes.body1,color.contentSecondary]}>{caption}</Text>
        </View>
    )
}


const ProductView=({product}:{product})=>{
    return(
        <View style={[styles.productView]}>
            <ProductDisplay image={product.display_images} id={product.id}/>
            <ProductTitle title={product.product} price={product.price} caption={product.caption}/>
            <ProductBody desc={product.description}/>
        </View>
    )
}

export default function Product({route,navigation}){
    const {productId}=route.params
    const [product,setProduct]=useState(null)
    useEffect(()=>{
        const fetchData=async()=>{
            const API_URL=`http://192.168.137.1:3000/api/products/${productId}`
            const res=await fetch(API_URL)
            const data=await res.json()
            setProduct(data)
        }
        fetchData()
    },[productId])
    if(!product){
       return <Loader/>
    }
    return (
        <CartProvider>
        <ScrollView style={[color.backgroundPrimary,{padding:10}]}>
            <ProductView product={product}/>
        </ScrollView>
        </CartProvider>
    )
}

const {width}=Dimensions.get("window")

const styles=StyleSheet.create({
    productView:{
        
    },
    imageDisplay:{
        width:width,
        height:356,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
    },
    imageDisplayIcons:{
        position:'absolute',
        right:-15,
        bottom:100,
        width:100,
        display:'flex',
        flexDirection:'column',
        height:20,
        justifyContent:'space-between',
        alignItems:'center',
        gap:15
    }
})