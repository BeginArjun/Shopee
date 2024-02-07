import { HorizontalCartCard } from '../components/ProductCard';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { color, sizes } from '../styles';
import { getCartTotal } from '../utils/getCartTotal';
import { setCart } from '../store/slice/cartSlice';

import Gpay from '../assets/icons/GPay.png'
import Amex from '../assets/icons/Amex.png'
import ApplePay from '../assets/icons/ApplePay.png'
import Master from '../assets/icons/Mastercard.png'
import Visa from '../assets/icons/Visa.png'
import Paypal from '../assets/icons/paypal.png'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/Auth';
import { useNavigation } from '@react-navigation/native';
import getCurrentUser from '../middleware/currentUser';
import { setOrder } from '../store/slice/orderSlice';

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
    const {user}=useAuth()
    const dispatch=useDispatch()
    const cart=useSelector((state)=>state.cart)
    const navigation=useNavigation()
    const handleClick=async()=>{
        try{
            const res=await fetch('http://192.168.137.1:3000/api/order/create',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user}`
            },
            body:JSON.stringify({orderItems:cart,amount:total})
            })
            const data=await res.json()
            if(res.ok){
                dispatch(setCart([]))
                const currUser=await getCurrentUser(user)
                dispatch(setOrder(data))
                navigation.navigate('Order Confirmation',{order:data,user:currUser})
            }
    }
        catch(err){
            console.log(err)
        }
    }
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
            <TouchableOpacity style={[color.backgroundAccent,{paddingVertical:16,paddingHorizontal:10,alignItems:'center',borderRadius:12}]}
            onPress={()=>handleClick()}
            >
                <Text style={[color.contentOnColorInverse]}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    )
}

const CartView=()=>{
    const cart = useSelector((state) => state.cart);
    const [reload,setReload]=useState(false)
    useEffect(()=>{
        setReload(!reload)
    },[cart])
    if(!cart){
        return <Loader/>
    }
    console.log(cart)
    return(
        <View style={{justifyContent:'space-between',height:'100%'}}>
        <FlatList
        data={cart}
        renderItem={({item})=><HorizontalCartCard {...item}/>}
        extraData={reload}
        keyExtractor={(item)=>item.id}
        />
        <CartInfo total={getCartTotal(cart)}/>
        </View>
    )
}

export default CartView