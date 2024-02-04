import { useState } from "react"
import { TextInput, View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { color } from "../styles"

const RegisterForm=()=>{
    const [values,setValues]=useState({name:'',email:'',password:'',phoneNo:'',address:''})

    const handleSubmit=async()=>{
        const res=await fetch('http://192.168.137.1:3000/api/user/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })
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
                />
            </View>
            <View style={styles.fields}>
                <Text style={[color.contentPrimary]}>E-mail: </Text>
                <TextInput
                placeholder='xyz@gmail.com'
                value={values.email}
                onChangeText={(text)=>setValues({...values,email:text})}
                placeholderTextColor={color.contentSecondary.color}
                />
            </View>
            <View style={styles.fields}>
                <Text style={[color.contentPrimary]}>Password: </Text>
                <TextInput
                placeholder='Password'
                value={values.password}
                onChangeText={(text)=>setValues({...values,password:text})}
                placeholderTextColor={color.contentSecondary.color}
                secureTextEntry
                />
            </View>
            <View style={styles.fields}>
                <Text style={color.contentPrimary}>Address :</Text>
                <TextInput
                placeholder='Address'
                value={values.address}
                onChangeText={(text)=>setValues({...values,address:text})}
                placeholderTextColor={color.contentSecondary.color}
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
    }
})