import { useEffect, useState } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import PrimaryProductCard from "../components/ProductCard"





export default function SearchResults({route,navigation}){
    const {search}=route.params
    const [searchResult,setSearchResult]=useState([])
    useEffect(()=>{
        const fetchSearchResults=async()=>{
            try{
                const API_URL=`http://192.168.137.1:3000/api/products/search?name=${search}`
                console.log(API_URL)
                const res=await fetch(API_URL)
                const data=await res.json()
                console.log("Data: ",data)
                setSearchResult(data)
            }
            catch(err){
                console.log("Catched: ",err)
            }
        }
        fetchSearchResults()
    },[search])
    console.log(searchResult)
    return(
        <View>
            <FlatList
            data={searchResult}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=><PrimaryProductCard {...item} image={item.display_images} subtitle={item.caption}/>}
            horizontal={false}
            numColumns={2}
            style={{paddingHorizontal:20,width:'100%'}}
            columnWrapperStyle={{justifyContent:'space-between',alignItems:'center'}}
            contentContainerStyle={{justifyContent:'center',alignContent:'center'}}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'column',
    }
})