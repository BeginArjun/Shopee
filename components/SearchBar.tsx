import { TextInput, View, Image, StyleSheet } from "react-native"
import search from '../assets/icons/search.png'
import { color, sizes } from "../styles"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

export default function SearchBar(){
    const [value,setValue]=useState('')
    const {navigate}=useNavigation()
    const handleSubmit=async()=>{
        try{
           navigate('Search',{search:value})
        }
        catch(err){
            console.error(err)
        }
    }
    return(
        <View style={[color.backgroundSecondary,{borderRadius:10}]}>
            <View style={[color.backgroundSecondary,styles.container]}>
                <View>
                    <TextInput placeholder="Search" style={[color.contentSecondary,sizes.body3,{width:'100%'}]}
                    placeholderTextColor={color.contentSecondary.color}
                    value={value}
                    onChangeText={(text)=>setValue(text)}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="search"
                    />
                </View>
                <View>  
                    <Image source={search} width={24} height={24}/>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        width:'100%',
        borderRadius:10,
        paddingHorizontal:15
    }
})