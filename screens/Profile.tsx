import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color, sizes } from '../styles';
import profile from '../assets/icons/userProfile.png'
import chevronRight from '../assets/icons/chevronRight.png'
import { useAuth } from '../context/Auth';
import { useEffect ,useState} from 'react';
import getCurrentUser from '../middleware/currentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Order from './Order';

type Settings={
    name:string,
    action?:()=>void,
    textColor?:string,
    navigateTo?:string
    params?:Object
}

const ProfileSettings:Settings[]=[
    {
        name:'My Orders',
        navigateTo:'My Orders',
    },
]

const ProfileHeader=({name,email}:{name:string,email:string})=>{
    return(
        <View style={styles.profileHeaderView}>
            <View style={[styles.profileImgView]}>
                <Image source={profile} style={{objectFit:'contain',width:150,height:150}}/>
            </View>
            <Text style={[color.contentPrimary,sizes.heading2,{fontWeight:'700'}]}>{name}</Text>
            <Text style={[color.contentPrimary,sizes.caption2,{color:'#1DA1F2'}]}>{email}</Text>
        </View>
    )
}

const ListItems=({name,action,textColor,navigateTo,params}:Settings)=>{
    const textC=textColor?textColor:color.contentPrimary.color
    const {navigate}:any=useNavigation()
    const handleClick=()=>{
        if(action){
            action()
        }
        if(navigateTo && params){
            navigate(navigateTo,params)
        }
        else if(navigateTo){    
            navigate(navigateTo)
        }

    }

    return(
    <TouchableOpacity style={styles.profileOptions}
    onPress={()=>handleClick()}
    >
            <Text style={[sizes.heading2,{fontWeight:'600',color:textC}]}>{name}</Text>
            <Image source={chevronRight} width={8} height={14}/>
        </TouchableOpacity>)
}

const ProfileOptions=()=>{
    const {setUser}:any=useAuth()
    const navigation:any=useNavigation()
    return(
        <View>
        <FlatList
        data={ProfileSettings}
        keyExtractor={(item)=>item.name}
        renderItem={({item})=><ListItems {...item}/>}
        />
        <ListItems name='Logout' action={async()=>{
            await AsyncStorage.removeItem('jwt')
            setUser(null)
            navigation.navigate('Home')
        }} textColor={'red'}/>
        </View>
    )
}

function Profile() {
    const {user}:any=useAuth()
    const [data,setData]=useState<User | any>({})
    useEffect(()=>{
        const getCurr=async()=>{
            const curr:User=await getCurrentUser(user)
            setData(curr)
        }
        getCurr()
    },[user])
    return (
        <View style={[color.backgroundPrimary,styles.container]}>
            <ProfileHeader name={data.name} email={data.email}/>
            <ProfileOptions/>
        </View>
    )
}

const Stack=createStackNavigator()

export const ProfileNavigator=()=>{
    return(
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name='My Profile' component={Profile}/>
                {/* <Stack.Screen name='Personal Information' component={Profile}/> */}
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name='My Orders' component={Order}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
    },
    profileHeaderView:{
        justifyContent:'center',
        alignItems:'center',
        gap:10
    },
    profileImgView:{
        width:150,
        height:150,
        justifyContent:'center',
        alignItems:'center',
    },
    profileOptions:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})

export default ProfileNavigator