import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import check from '../assets/icons/check.png'
import { color, sizes } from "../styles";


const CheckoutHeader=({orderId,orderDate,email}:{orderId:string,orderDate:Date,email:string})=>{
    return(
        <View style={styles.headerView}>
            <View style={styles.headerContainer}>
                <Image source={check} style={{width:60,height:60,objectFit:'contain'}}/>
                <View style={{}}>
                    <Text style={[color.contentPrimary,sizes.heading3,{fontWeight:'700'}]}>Thank You</Text>
                    <Text style={[color.contentPrimary,sizes.body1]}>Your order</Text>
                     <Text style={{color:'#1DA1F2'}}> #{orderId} </Text> 
                     <Text style={[color.contentPrimary,sizes.body1]}>has been placed</Text>
                </View>
            </View>
            <View>
                <Text style={[color.contentPrimary,sizes.body3]}>We sent an email to {email} with your order confirmation and bill.</Text>
                <Text style={[color.contentPrimary,sizes.body3]}>Time Placed : {new Date(orderDate).toLocaleString()}</Text>
            </View>
        </View>
    )
}

const OrderItemsComponent=({items}:{items:OrderItems})=>{
    return(
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image source={{ uri: items.product.display_images }} style={{ width: 60, height: 60, objectFit: 'contain' }} />
                <View>
                    <Text style={[color.contentPrimary, sizes.heading3, { fontWeight: '800' }]}>{items.product.product}</Text>
                    <Text style={[color.contentPrimary, sizes.body2,{fontWeight:'700'}]}>${items.product.price}</Text>
                </View>
                <Text style={[color.contentPrimary, sizes.body2,{fontWeight:'700'}]}>x{items.quantity}</Text>
            </View>
        </View>
    )
}

const OrderReview=({total}:{total:number})=>{
    return(
        <View style={{borderTopWidth:2,borderTopColor:color.contentStateDisabled.color,paddingTop:10}}>
            <Text style={[color.contentPrimary,sizes.heading3,{fontWeight:'600'}]}>Order Summary</Text>
            <View style={{gap:5}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={[color.contentPrimary,sizes.body2]}>Subtotal</Text>
                    <Text style={[color.contentPrimary,sizes.body2]}>${total}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text  style={[color.contentPrimary,sizes.body2]}>Shipping</Text>
                    <Text  style={[color.contentPrimary,sizes.body2]}>$0.00</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={[color.contentPrimary,sizes.heading3,{fontWeight:'600'}]}>Total</Text>
                    <Text style={[color.contentPrimary,sizes.heading3,{fontWeight:'600'}]}>${total}</Text>
                </View>
            </View>
        </View>
    )
}

const OrderShipping=({name,email,phoneNo,address}:User)=>{
    return(
        <View>
            <Text style={[color.contentPrimary,sizes.heading3,{fontWeight:'600'}]}>Shipping</Text>
            <View style={[{backgroundColor:'#F5F5F5',alignItems:'center'}]}>
                <Text style={[color.contentPrimary]}>{name}</Text>
                <Text style={[color.contentPrimary]}>{email}</Text>
                <Text style={[color.contentPrimary]}>{phoneNo}</Text>
                <Text style={[color.contentPrimary]}>{address}</Text>
            </View>
        </View>
    )
}

export default function Checkout({route, navigation}:any){
    console.log(route.params)
    const {order,user}:{order:Order,user:User}=route.params
    return(
        <View style={styles.container}>
            <CheckoutHeader orderId={order.id} orderDate={order.createdAt} email={user.email}/>
            <OrderShipping {...user}/>
            <Text style={[color.contentPrimary,sizes.heading3,{fontWeight:'600'}]}>Order Items</Text>
            <FlatList
            data={order.orderItems}
            renderItem={({item})=><OrderItemsComponent items={item}/>}
            keyExtractor={(item)=>item.id}
            />
            <OrderReview total={order.totalAmount}/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        padding:10,
        display:'flex',
        flexDirection:'column',
        gap:10,
        height:'100%',
        justifyContent:'space-between',
        backgroundColor:'#fff'
    },
    headerView:{
        gap:10,
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'column'
    },
    headerContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})