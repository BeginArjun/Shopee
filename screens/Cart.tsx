import { View } from 'react-native';
import CartProvider from '../context/Cart';
import CartView from '../components/CartView';
import { createStackNavigator } from '@react-navigation/stack';
import Checkout from './Checkout';


const Stack=createStackNavigator()


export function Cart() {
    return (
        <CartProvider>
            <View style={{padding:10}}>
                <CartView/>
            </View>
        </CartProvider>
    )
}

export default function CartNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='My Cart' component={Cart}/>
            <Stack.Screen name='Order Confirmation' component={Checkout}/>
        </Stack.Navigator>
    )
}