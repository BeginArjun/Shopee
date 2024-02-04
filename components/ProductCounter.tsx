import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color, sizes } from "../styles";
import { useState } from "react";

export default function ProductCounter() {
    const [qty,setQty]=useState(1)
    const handleChange=(newQty)=>{
        
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[color.backgroundAccent,styles.button]}>
                <Text style={[{color:'#fff',fontSize:8}]}>+</Text>
            </TouchableOpacity>
            <View style={{width:16,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={[sizes.heading3,color.contentPrimary,{fontWeight:'500'}]}>{qty}</Text>
            </View>
            <TouchableOpacity style={[styles.button,color.backgroundSecondary]}>
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