import { FlatList, Text, View } from 'react-native';
import { useAuth } from '../context/Auth';
import { useEffect, useState } from 'react';
import { setOrder } from '../store/slice/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { OrderCard } from '../components/ProductCard';
import { color } from '../styles';


export default function Order(){
    const {user}:any=useAuth()
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchOrders=async()=>{
            try{
                const res=await fetch('http://192.168.137.1:3000/api/order',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${user}`   
                    }
                })
                const data=await res.json()
                dispatch(setOrder(data))
            }
            catch(err){
                console.log(err)
            }
        }

        fetchOrders()
    },[])
    const orders=useSelector((state:any)=>state.order)
    return (
        <View style={[color.backgroundPrimary,{padding:10}]}>
            <FlatList
            data={orders}
            renderItem={({item}:{item:Order})=><OrderCard order={item}/>}
            />
        </View>
    )
}