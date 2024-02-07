import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color, sizes } from "../styles";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem } from "../store/slice/cartSlice";
import { useAuth } from "../context/Auth";

export default function ProductCounter({quantity,id}:{quantity:number,id:string}){
    const [qty,setQty]=useState(quantity)
    const dispatch=useDispatch()
    const cart=useSelector((state)=>state.cart)
    const {user}=useAuth()
    const handleChange=(operation:'+' | '-')=>{
        let newQty=qty
        switch(operation){
            case '+':
                newQty++
                break
            case '-':
                if(newQty>0){
                    newQty--
                }
                break
            default:
                break
        }

        setQty(newQty)
        if(newQty===0){
            Alert.alert('Remove Item','Are you sure you want to remove this item from your cart?',[
                {
                    text:'Yes',
                    onPress:()=>{
                        console.log('deleting item',id)
                        deleteItem(id)
                    }
                },
                {
                    text:'No',
                    onPress:()=>setQty(1)
                }
            ])
        }
        patchQuantityToDatabase(id, newQty);
        dispatch(updateCartItem({itemId:id,quantity:newQty}) as any);

    };

    const deleteItem=async(itemId:string)=>{
        try{
            const API_URL = `http://192.168.137.1:3000/api/cart/delete?itemId=${itemId}`;
            const res=await fetch(API_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user}`
                }
            });
        }
        catch(err){
            console.error(err)
        }
    }
    const patchQuantityToDatabase = async (itemId: string, newQuantity: number) => {
        try {
            const API_URL = `http://192.168.137.1:3000/api/cart/update?itemId=${itemId}&qty=${newQuantity}`;
            const res=await fetch(API_URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user}`
                }
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[color.backgroundAccent,styles.button]} 
            onPress={()=>handleChange('+')}
            >
                <Text style={[{color:'#fff',fontSize:8}]}>+</Text>
            </TouchableOpacity>
            <View style={{width:16,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={[sizes.heading3,color.contentPrimary,{fontWeight:'500'}]}>{qty}</Text>
            </View>
            <TouchableOpacity style={[styles.button,color.backgroundSecondary]}
            onPress={()=>handleChange('-')}
            >
                <Text style={[color.contentPrimary,]}>-</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:7
    },
    button:{
        padding:9,
        borderRadius:8,
        width:24,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})