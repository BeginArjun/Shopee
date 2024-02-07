import { useState } from "react"
import { TextInput, View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { color } from "../styles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "../context/Auth"

const RegisterForm=()=>{
    const [values,setValues]=useState({name:'',email:'',password:'',phoneNo:'',address:''})
    const {setUser}=useAuth()
    const handleSubmit=async()=>{
        const res=await fetch('http://192.168.137.1:3000/api/user/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })
        const json=await res.json()
        console.log(json)
        const data=res.headers.get('set-cookie')
        console.log("Res ",res)
        const tokenContainer=data?.split(';')[0]
        const token=tokenContainer?.split('=')[1]
        console.log("Token: ",token)
        await AsyncStorage.setItem('jwt',token)
        setUser(token)
    }

    return(
        <View style={[color.backgroundPrimary,{gap:10}]}>
            <View style={[styles.fields]}>
                <Text style={[color.contentPrimary]}>Name: </Text>
                <TextInput
                placeholder='John Doe'
                value={values.name}
                onChangeText={(text)=>setValues({...values,name:text})}
                placeholderTextColor={color.contentSecondary.color}
                style={styles.field}
                />
            </View>
            <View style={styles.fields}>
                <Text style={[color.contentPrimary]}>E-mail: </Text>
                <TextInput
                placeholder='xyz@gmail.com'
                value={values.email}
                onChangeText={(text)=>setValues({...values,email:text})}
                placeholderTextColor={color.contentSecondary.color}
                style={styles.field}
                />
            </View>
            <View style={styles.fields}>
                <Text style={[color.contentPrimary]}>Password: </Text>
                <TextInput
                placeholder='Password'
                value={values.password}
                onChangeText={(text)=>setValues({...values,password:text})}
                placeholderTextColor={color.contentSecondary.color}
                style={styles.field}
                secureTextEntry
                />
            </View>
            <View style={styles.fields}>
                <Text style={color.contentPrimary}>Phone Number :</Text>
                <TextInput
                placeholder='Phone Number'
                value={values.phoneNo}
                onChangeText={(text)=>setValues({...values,phoneNo:text})}
                placeholderTextColor={color.contentSecondary.color}
                style={styles.field}
                />
            </View>
            <TouchableOpacity style={[styles.registerButton,color.backgroundAccent]}
            onPress={()=>handleSubmit()}
            >
                <Text style={[color.contentOnColorInverse]}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default function Register(){
    return(
        <View style={styles.container}>
            <RegisterForm/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    registerButton:{
        width:335,
        height:50,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    fields:{
        paddingVertical:16,
        paddingLeft:12,
        paddingRight:10,
        borderRadius:12,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    field:{
        color:color.contentPrimary.color,
    }
})