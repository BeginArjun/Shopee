import { FlatList, Text, View } from 'react-native';
import CartProvider, { useCart } from '../context/Cart';
import { HorizontalCartCard } from '../components/ProductCard';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { color, layout, sizes } from '../styles';

const CartView=()=>{
    const {cart}=useCart()
    if(!cart){
        return <Loader/>
    }
    if(cart.products.length===0){
        return(
            <View style={[layout.columnCenter]}>
                <Text style={[color.contentPrimary,sizes.heading1]}>No items in cart</Text>
            </View>
        )
    }
    return(
        <FlatList
        data={cart?.products}
        renderItem={({item})=><HorizontalCartCard {...item}/>}
        keyExtractor={(item)=>item.id}
        />
    )
}

export default function Cart() {
    return (
        <CartProvider>
            <View style={{padding:10}}>
                <CartView/>
            </View>
        </CartProvider>
    )
}