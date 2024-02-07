import { Image, StyleSheet, Text, View ,ScrollView} from "react-native";
import { color , sizes,layout} from "../styles";
import HeroImg from "../assets/images/Primary_Card.png"
import { useProduct } from "../context/Product";
import PrimaryProductCard from "../components/ProductCard";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from "./Product";
import { useAuth } from "../context/Auth";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import Register from "./Register";
import getCurrentUser from "../middleware/currentUser";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack=createNativeStackNavigator()

const Header=({name}:{name:string})=>{
    return(
        <View style={[styles.header]}>
            <Text style={[styles.headingText,sizes.heading1,{fontFamily:'Inter'}]}>
                Hello {name}
            </Text>
        </View>
    )
}



const Hero=()=>{
    return(
        <View style={[layout.columnCenter,{padding:5,gap:10}]}>
            <View style={[layout.rowSpaceBetween,{width:'100%'}]}>
                <Text style={[color.contentPrimary,sizes.heading2,{fontFamily:'Inter'}]}>Deals of the Day</Text>
                <Text style={[color.contentTertiary,sizes.body1,{fontFamily:'Inter'}]}>View all</Text>
            </View>
            <View>
                <Image source={HeroImg}/>
            </View>
        </View>
    )
}

const ProductHomeView=()=>{
    const products=useProduct() as Product[]
    return(
        <View style={styles.productView}>
            {
                products.length>0 && products.map((product,idx)=>{
                    return(
                        <PrimaryProductCard
                            key={idx}
                            product={product.product}
                            price={product.price}
                            display_images={product.display_images}
                            caption={product.caption}
                            id={product.id}
                        />
                    )
                })
            }
        </View>
    )
}

const Recommended=()=>{
    return(
        <View style={[layout.columnSpaceBetween,{gap:10,alignItems:'flex-start'}]}>
            <Text style={[sizes.heading2,{fontFamily:'Inter',color:'#000'}]}>Recommended for you</Text>
            <ProductHomeView/>
            <View style={{marginBottom:20}}></View>
        </View>
    )
}


const HomeNavigator=()=>{
    const {user}=useAuth()
    return(
    <Stack.Navigator>
        {user?(<>  
        <Stack.Screen name="HomeScreen" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Product" component={Product}/>
        </>):(
            <>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            </>
        )}
    </Stack.Navigator>
    )
}

function Home(){
    const {user}=useAuth()
    const [name,setName]=useState()
    // Implement UseEffect to get the current user
    const currUser=getCurrentUser(user).then((res)=>setName(res.name)).catch((err)=>err)
    return(
        <ScrollView style={[styles.container,{gap:10}]}>
            <Header name={name}/>
            <Hero/>
            <Recommended/>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container:{
        paddingLeft:10,
        paddingTop:20
    },
    headingText:{
        color:'#000',
    },
    header:{

    },
    productView:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        gap:5,
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20
    },
})

export default HomeNavigator