import {  FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { HorizontalFavCard } from '../components/ProductCard';

const FavView=()=>{
    const fav=useSelector(state=>state.favourite)
    return(
        <View style={{padding:10}}>
            <FlatList
            data={fav}
            renderItem={({item})=><HorizontalFavCard favItem={item}/>}
            />
        </View>
    )
}

export default function Favourites() {
    return (
       <>
            <FavView/>
       </>
    )
}