import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Loader from '../components/Loader';
import { color, layout, sizes } from '../styles';

import {FavouriteBtn,CartBtn} from '../components/Button';
import CartProvider from '../context/Cart';

import edit from '../assets/icons/edit.png'
import CreateReview from '../components/CreateReview';


const ProductDisplay=({image,product}:{image:string,product:any})=>{
    return(
        <View style={[color.backgroundPrimary,styles.imageDisplay]}>
            <Image source={{uri:image}} width={298} height={315}/>
            <View style={styles.imageDisplayIcons}>
                <FavouriteBtn product={product}/>
                <CartBtn 
                product={product}
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

const Reviews=({review}:{review:Review})=>{
    return(
        <View>
            <View>
                <Text style={[sizes.body1,color.contentPrimary]}>{review.user.name}</Text>
                <Text style={[sizes.caption1,color.contentSecondary]}>{review.rating}</Text>
            </View>
            <View>
                <Text style={[sizes.body1,color.contentPrimary]}>{review.review}</Text>
            </View>
        </View>
    )
}

export const WriteReview=({title,productId}:{title:string,productId:string})=>{
    const [visible,setVisible]=useState(false)
    return(
        <TouchableOpacity
        style={[color.backgroundAccent,{paddingVertical:12,paddingHorizontal:12,borderRadius:10,alignItems:'center',flexDirection:'row',justifyContent:'space-between',gap:5}]}
        onPress={()=>setVisible(!visible)}
        >
            <Image source={edit} style={{width:20,height:20,objectFit:'contain'}}/>
            <Text style={[sizes.heading3, color.contentOnColorInverse]}>
                {title}
            </Text>
            <CreateReview visible={visible} setVisible={setVisible} productId={productId}/>
        </TouchableOpacity>
    )
}

const ProductReviews=({reviews}:{reviews:Review[]})=>{
    return(
        <View style={styles.reviewContainer}>
            <View style={styles.reviewHeading}>
                <Text style={[sizes.heading2,color.contentPrimary,{fontWeight:'800'}]}>Reviews</Text>
                <TouchableOpacity>
                    <Text style={[sizes.body1,color.contentSecondary]}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
                {
                    reviews.length>0?(
                        <FlatList
                        data={reviews}
                        renderItem={({item}:{item:Review})=><Reviews review={item}/>}
                        keyExtractor={(item)=>item.id}
                        />
                    ):(<WriteReview title="Be the first to write a review"/>)
                }
            </View>
        </View>
    )
}


const ProductView=({product}:{product:Product})=>{
    return(
        <View style={[styles.productView]}>
            <ProductDisplay image={product.display_images} product={product}/>
            <ProductTitle title={product.product} price={product.price} caption={product.caption}/>
            <ProductBody desc={product.description}/>
        </View>
    )
}

export default function Product({route,navigation}){
    const {productId}=route.params
    const [product,setProduct]=useState<Product | null>(null)
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
    },
    reviewContainer:{
        width:'100%',
        marginBottom:25,
        gap:10
    },
    reviewHeading:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    }
})