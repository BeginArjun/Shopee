import { StyleSheet, View, Image,Text, TouchableOpacity } from "react-native";

import home from '../assets/icons/Home.png'
import search from '../assets/icons/search.png'
import heart from '../assets/icons/heart.png'
import cart from '../assets/icons/cart.png'
import profile from '../assets/icons/profile.png'
import { useSelector } from "react-redux";

const FavLength=()=>{
    const fav=useSelector((state)=>state.favourite)
    return(
        <View
        style={{
            position:'absolute',
            top:-5,
            right:1,
            width:20,
            height:20,
            borderRadius:21,
            backgroundColor:'#212429',
            alignItems:'center',
            justifyContent:'center',
        }}
        >
            <Text>{fav.length}</Text>
        </View>
    )
}

const CartLength=()=>{
    const cart=useSelector((state)=>state.cart)
    return(
        <View
        style={{
            position:'absolute',
            top:-5,
            right:1,
            width:20,
            height:20,
            borderRadius:21,
            backgroundColor:'#212429',
            alignItems:'center',
            justifyContent:'center',
        }}
        >
            <Text>{cart.length}</Text>
        </View>
    )
}

const TabHeader=({state,descriptors,navigation})=>{
    return(
        <View style={styles.row}>
            {
                state.routes.map((route,index)=>{
                    const {options}=descriptors[route.key];
                    const label=options.tabBarLabel!==undefined
                    ? options.tabBarLabel:options.title!==undefined
                    ?options.title:route.name;

                    const icons=[
                        {
                            name:'Home',
                            icon:home,
                        },
                        {
                            name:'Browse',
                            icon:search,
                        },
                        {
                            name:'Favourites',
                            icon:heart,
                        },
                        {
                            name:'Cart',
                            icon:cart,
                        },
                        {
                            name:'Profile',
                            icon:profile,
                        },
                    ];

                    options.tabBarIcon=({focused,size})=>{
                        const icon=icons.find((item)=>item.name===route.name)
                        return(
                            <Image
                                source={icon.icon}
                                resizeMode='contain'
                                style={{
                                    width:18,
                                    height:18,
                                    tintColor:focused?'#000':'#999',
                                }}
                            />
                        )
                    }

                    const isFocused=state.index===index;

                    const onPress=()=>{
                        const event=navigation.emit({
                            type:'tabPress',
                            target:route.key,
                            canPreventDefault:true,
                        })

                        if(!isFocused&&!event.defaultPrevented){
                            navigation.navigate(route.name)
                        }
                    }

                    const onLongPress=()=>{
                        navigation.emit({
                            type:'tabLongPress',
                            target:route.key,
                        })
                    }

                    return(
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{flex:1, alignItems:'center', justifyContent:'center'}}
                            id={options.tabBarTestID}
                        >
                            {options.tabBarIcon({focused: isFocused, size: 25})}
                            {route.name==='Cart'?<CartLength/>:<></>}
                            {route.name==='Favourites'?<FavLength/>:<></>}
                            <Text style={{ color: isFocused ? '#212429' : '#999999' }}>
                                {label}
                            </Text>

                        </TouchableOpacity>
                    )
                })
                
            }
        </View>
    )
}

const styles=StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingVertical:20,
        backgroundColor:'#fff'
    },
})

export default TabHeader;