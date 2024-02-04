import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color, sizes } from '../styles';
import profile from '../assets/icons/userProfile.png'
import chevronRight from '../assets/icons/chevronRight.png'
import { useAuth } from '../context/Auth';
import { useEffect ,useState} from 'react';
import getCurrentUser from '../middleware/currentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type Settings={
    name:string,
    action?:()=>void,
    textColor?:string
}

const ProfileSettings:Settings[]=[
    {
        name:'Personal Information',
    },
    {
        name:'My Orders'
    },
    {
        name:'Sign Out',
        action:async()=>{
            const navigation=useNavigation()
            await AsyncStorage.removeItem('jwt')
            const {setUser}:any=useAuth()
            setUser(null)
            navigation.navigate('Home')
        },
        textColor:'red'
    }
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

const ListItems=({name,action,textColor}:Settings)=>{
    const textC=textColor?textColor:color.contentPrimary.color
    return(
    <TouchableOpacity style={styles.profileOptions}
    onPress={()=>action?action():console.log('Pressed')}
    >
            <Text style={[sizes.heading2,{fontWeight:'600',color:textC}]}>{name}</Text>
            <Image source={chevronRight} width={8} height={14}/>
        </TouchableOpacity>)
}

const ProfileOptions=()=>{
    return(
        <FlatList
        data={ProfileSettings}
        keyExtractor={(item)=>item.name}
        renderItem={({item})=><ListItems {...item}/>}
        />
    )
}

function Profile() {
    const {user}:any=useAuth()
    const [data,setData]=useState({})
    useEffect(()=>{
        const getCurr=async()=>{
            const curr=await getCurrentUser(user)
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
                <Stack.Screen name='ProfileScreen' component={Profile} options={{headerShown:false}}/>
                {/* <Stack.Screen name='Personal Information' component={Profile}/> */}
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