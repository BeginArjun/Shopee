import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import CartProvider, { useCart } from '../context/Cart';
import { HorizontalCartCard } from '../components/ProductCard';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { color, layout, sizes } from '../styles';
import { getCartTotal } from '../utils/getCartTotal';

import Gpay from '../assets/icons/GPay.png'
import Amex from '../assets/icons/Amex.png'
import ApplePay from '../assets/icons/ApplePay.png'
import Master from '../assets/icons/Mastercard.png'
import Visa from '../assets/icons/Visa.png'
import Paypal from '../assets/icons/paypal.png'
import { Image } from 'react-native';

const Icons=[Paypal,Visa,Master,Gpay,ApplePay,Amex]


const CartTotal=({total}:{total:number})=>{
    return(
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={[color.contentPrimary,sizes.body2,{fontWeight:'700'}]}>Total:</Text>
            <Text style={[color.contentPrimary,sizes.body2,{fontWeight:'700'}]}>${total}</Text>
        </View>
    )
}

const CartInfo=({total}:{total:number})=>{
    return(
        <View style={{borderTopWidth:1,gap:10,borderColor:color.contentStateDisabled.color,paddingTop:10}}>
            <CartTotal total={total}/>
            <View style={{flexDirection:'row',width:336,justifyContent:'space-between'}}>
                {
                    Icons.map((icon,idx)=>{
                        return(
                            <Image source={icon} key={idx} style={{width:52,height:32,objectFit:'contain'}}/>
                        )
                    })
                }
            </View>
            <TouchableOpacity style={[color.backgroundAccent,{paddingVertical:16,paddingHorizontal:10,alignItems:'center',borderRadius:12}]}>
                <Text style={[color.contentOnColorInverse]}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    )
}

const CartView=()=>{
    const {cart}=useCart()
    const [cartItem,setCartItems]=useState([])
    useEffect(() => {
        if (cart && cart.cartItems) {
            const updatedCartItems = cart.cartItems.map(cartItem => ({
                id: cartItem.id,
                qty: cartItem.quantity,
                product: cartItem.product.product,
                price: cartItem.product.price,
                display_images: cartItem.product.display_images,
                caption: cartItem.product.caption 
            }));
            setCartItems(updatedCartItems);
        }
    }, [cart]);

    if(!cart){
        return <Loader/>
    }
    if(cart.cartItems.length===0){
        return(
            <View style={[layout.columnCenter]}>
                <Text style={[color.contentPrimary,sizes.heading1]}>No items in cart</Text>
            </View>
        )
    }
    return(
        <View style={{justifyContent:'space-between',height:'100%'}}>
        <FlatList
        data={cartItem}
        renderItem={({item})=><HorizontalCartCard {...item}/>}
        keyExtractor={(item)=>item.id}
        />
        <CartInfo total={getCartTotal(cartItem)}/>
        </View>
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