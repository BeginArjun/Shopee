import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import chevronRight from '../assets/icons/chevronRight.png'
import { color, sizes } from '../styles';
import { TabActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchResults from './Search';

const Stack=createStackNavigator()

const BrowseHeader=()=>{
    return(
        <View style={[color.backgroundSecondary]}>
            <SearchBar/>
        </View>
    )
}

const searchOptions:SearchOptions[]=[
    {
        id:1,
        name:"Audio",
        search:"audio"
    },
    {
        id:2,
        name:"Electronics",
        search:"sound"
    },
    {
        id:3,
        name:"Gaming",
        search:"audio"
    },
    {
        id:4,
        name:"Smart Appliances",
        search:"smart"
    },
    {
        id:5,
        name:"Camera + Camcorder",
        search:"camera"
    }
]

type SearchOptions={
    id:number,
    name:string,
    search:string
}

const ListItems=({name,search}:SearchOptions)=>{
    const {navigate}=useNavigation()
    return(
        <TouchableOpacity
        style={styles.searchOptions}
        onPress={()=>navigate('Search',{search:search})}
        >
            <Text style={[color.contentPrimary,sizes.heading2,{fontWeight:'600'}]}>{name}</Text>
            <Image source={chevronRight} width={8} height={14}/>
        </TouchableOpacity>
    )
}

const BrowseView=()=>{
    return(
        <View style={{paddingHorizontal:15}}>
            <FlatList
                data={searchOptions}
                renderItem={({ item }) =><ListItems {...item}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default function Browse() {
    return (
        <Stack.Navigator screenOptions={{header:BrowseHeader}}>
            <Stack.Screen name='BrowseScreen' component={BrowseView}/>
            <Stack.Screen name='Search' component={SearchResults}/>
        </Stack.Navigator>
    )
}

const styles=StyleSheet.create({
    searchOptions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:16
    },
    header:{
        flex:1/2,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        padding:10
    }
})