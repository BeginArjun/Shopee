import { Text, View,TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../context/Auth';
import { useNavigation } from '@react-navigation/native';
import { useMemo,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color, sizes } from '../styles';

const LoginForm=()=>{
    const {setUser}=useAuth()
    const [values,setValues]=useState({email:'',password:''})
    const navigation=useNavigation()
    const handleSubmit=()=>{
        const login=async()=>{
            const res=await fetch('http://192.168.137.1:3000/api/user/login',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    
                },
                body:JSON.stringify(values)
            })
            const data=await res.json()
            console.log(data)
            setUser(data)
            await AsyncStorage.setItem('jwt',JSON.stringify(data))
        }
        login()
        console.log("Pressed")
    }
    return(
        <View style={[color.backgroundPrimary,{gap:10}]}>
            <View style={[styles.fields,color.backgroundPrimary]}>
                <Text style={[color.contentPrimary]}>Email: </Text>
                <TextInput
                style={styles.field}
                placeholder='Email'
                value={values.email}
                onChangeText={(text)=>setValues({...values,email:text})}
                placeholderTextColor={color.contentSecondary.color}
                />
            </View>
            <View style={[styles.fields,color.backgroundPrimary]}>
                <Text style={[color.contentPrimary]}>Password: </Text>
                <TextInput
                style={styles.field}
                placeholder='Password'
                value={values.password}
                onChangeText={(text)=>setValues({...values,password:text})}
                placeholderTextColor={color.contentSecondary.color}
                secureTextEntry
                />
            </View>
            <TouchableOpacity onPress={()=>handleSubmit()} style={[styles.loginButton,color.backgroundAccent]}>
                <Text style={[color.contentTertiary,sizes.body1]}>Login</Text>
            </TouchableOpacity>
            <Pressable style={{alignItems:'flex-end',padding:5}}
            onPress={()=>navigation.navigate('Register')}
            >
                <Text style={[color.contentPrimary,sizes.caption1]}>Don't have an account?
                    <Text style={[{color:'blue',textDecorationLine:'underline'}]}> Register Now</Text>
                </Text>
            </Pressable>
        </View>
    )
}


export default function Login() {
    const {user}=useAuth()
    const navigation=useNavigation()
    // if(user){
    //     navigation.goBack()
    // }
    return (
        <View style={styles.container}>
           <LoginForm/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    loginButton:{
        width:335,
        height:52,
        paddingHorizontal:10,
        paddingVertical:16,
        borderRadius:12,
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
        color:'#000'
    }
})