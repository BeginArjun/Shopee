import { View, Image,Text, StyleSheet, Pressable, TouchableOpacity, Linking } from "react-native"
import { CartBtn, FavouriteBtn } from "./Button"
import { color, sizes } from "../styles"
import {  useNavigation } from "@react-navigation/native"
import ProductCounter from "./ProductCounter"
import { useAuth } from "../context/Auth"
import getCurrentUser from "../middleware/currentUser"
type ProductCardProps = {
    id:string
    product:string 
    price:number
    image:string 
    subtitle:string
    qty?:number
}

export const HorizontalFavCard=({favItem}:{favItem:Product})=>{
    return(
        <View style={[styles.cartCard,{borderBottomWidth:2,borderBottomColor:color.contentStateDisabled.color}]}>
            <View style={styles.cartCardInfo}>
                <View style={styles.cartImageView}>
                    <Image source={{uri:favItem.display_images}} width={140} height={148} style={styles.cartImage}/>
                </View>
                <View style={styles.cartCardInfoView}>
                    <Text style={[color.contentPrimary,sizes.heading3,{fontWeight:'800'}]}>${parseFloat(`${favItem.price}`).toFixed(2)}</Text>
                    <Text
                    style={[color.contentPrimary,sizes.heading3,{fontWeight:'500'}]}
                    >{favItem.product}</Text>
                    <Text style={[color.contentSecondary,sizes.caption1,{fontWeight:'400'}]}>{favItem.caption}</Text>
                </View>
            </View>
            <View>
                <CartBtn product={favItem}/>
            </View>

        </View>
    )
}


export const HorizontalCartCard=({id,display_images,product,qty,caption,price}:ProductCardProps)=>{
    return(
        <View style={[styles.cartCard]}>
            <View style={styles.cartCardInfo}>
                <View style={styles.cartImageView}>
                    <Image source={{uri:display_images}} width={140} height={148} style={styles.cartImage}/>
                </View>
                <View style={styles.cartCardInfoView}>
                    <Text style={[color.contentPrimary,sizes.heading3,{fontWeight:'800'}]}>${parseFloat(`${price}`).toFixed(2)}</Text>
                    <Text
                    style={[color.contentPrimary,sizes.heading3,{fontWeight:'500'}]}
                    >{product}</Text>
                    <Text style={[color.contentSecondary,sizes.caption1,{fontWeight:'400'}]}>{caption}</Text>
                </View>
            </View>
            <View>
                <ProductCounter quantity={qty} id={id}/>
            </View>

        </View>
    )
}

export const OrderCard=({order}:{order:Order})=>{
    const totalAmountColor=order.status==='Completed'?{color:'green'}:{color:'red'}
    const navigation=useNavigation()
    const {user}=useAuth()

    const viewDetails=async()=>{
        const currUser=await getCurrentUser(user)
        navigation.navigate('Cart',{
            screen:'Order Confirmation',
            params:{order,user:currUser}
        })
    }

    const trackOrder=async()=>{
        try{
            Linking.openURL('https://www.delhivery.com/tracking')
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <View style={{borderBottomWidth:2,borderColor:color.contentStateDisabled.color,gap:5,justifyContent:'space-between',alignItems:'center'}}>
            <View>
                <Text style={[color.contentSecondary,sizes.heading3,{fontWeight:'700'}]}>OID : <Text style={[color.contentPrimary]}>{order.id}</Text> </Text>
            </View>
            <View>
                <Text style={[color.contentSecondary]}>{order.status} : <Text style={[{fontWeight:'600'},totalAmountColor]}>${order.totalAmount}</Text></Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                <Text style={[color.contentSecondary]}>Payment Method : {order.paymentMode}</Text>
                <Text style={[color.contentSecondary]}>{new Date(order.createdAt).toLocaleDateString()}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',gap:8}}>
                <TouchableOpacity 
                onPress={()=>viewDetails()}
                style={[color.backgroundAccent,{width:'50%',alignItems:'center',paddingVertical:16,borderRadius:16}]}>
                    <Text style={[color.contentOnColorInverse,{fontWeight:'600',fontFamily:'Inter'}]}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>trackOrder()}
                style={[{borderWidth:2,borderColor:color.backgroundSecondary.backgroundColor,width:'50%',alignItems:'center',paddingVertical:16,borderRadius:16}]}>
                    <Text style={[color.contentPrimary,{fontWeight:'600'}]}>Track Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function PrimaryProductCard({id,product,price,display_images,caption}:Product){
    const navigation=useNavigation()
    return(
        <Pressable style={styles.container} onPress={()=>navigation.navigate('Product',{productId:id})}>
            <View  style={[color.backgroundPrimary,styles.imageView]}>
                <Image source={{uri:display_images}} width={140} height={148} style={styles.image}/>
                <View style={{position:'absolute',top:5,right:5}}>
                <FavouriteBtn product={{id,product,display_images,caption}}/>
                </View>
            </View>
            <View>
                <Text style={[sizes.heading3,{color:'#000',fontWeight:'800'}]}>
                    ${parseFloat(`${price}`).toFixed(2)}
                </Text>
                <Text style={[sizes.heading3,color.contentPrimary,{fontWeight:'500'}]}>{product}</Text>
                <Text style={[color.contentSecondary,sizes.caption1]}>{caption}</Text>
            </View>
        </Pressable>
    )
}

const styles=StyleSheet.create({
    container:{
        width:116,
        display:'flex',
        justifyContent:'space-between',
        alignItems:'flex-start',
        position:'relative',
        gap:5
    },
    imageView:{
        borderRadius:24
    },
    image:{
        objectFit:'contain',
        borderRadius:24
    },
    cartImageView:{
        width:80,
        height:88
    },
    cartImage:{
        width:72,
        height:76
    },
    cartCard:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    cartCardInfo:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:18,
    },
    cartCardInfoView:{
        maxWidth:150
    }
})