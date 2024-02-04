import { View, Image,Text, StyleSheet, Pressable } from "react-native"
import { FavouriteBtn } from "./Button"
import { color, sizes } from "../styles"
import { useNavigation } from "@react-navigation/native"
import ProductCounter from "./ProductCounter"
type ProductCardProps = {
    id:string
    product:string 
    price:number
    image:string 
    subtitle:string
    qty?:number
}



export const HorizontalCartCard=({id,product,price,display_images,caption,qty}:ProductCardProps)=>{
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
                <ProductCounter/>
            </View>

        </View>
    )
}



export default function PrimaryProductCard({id,product,price,image,subtitle}:ProductCardProps){
    const navigation=useNavigation()
    return(
        <Pressable style={styles.container} onPress={()=>navigation.navigate('Product',{productId:id})}>
            <View  style={[color.backgroundPrimary,styles.imageView]}>
                <Image source={{uri:image}} width={140} height={148} style={styles.image}/>
                <View style={{position:'absolute',top:5,right:5}}>
                <FavouriteBtn/>
                </View>
            </View>
            <View>
                <Text style={[sizes.heading3,{color:'#000',fontWeight:'800'}]}>
                    ${parseFloat(`${price}`).toFixed(2)}
                </Text>
                <Text style={[sizes.heading3,color.contentPrimary,{fontWeight:'500'}]}>{product}</Text>
                <Text style={[color.contentSecondary,sizes.caption1]}>{subtitle}</Text>
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