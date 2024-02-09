import React, { StrictMode } from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Home from './screens/Home'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import Browse from './screens/Browse';
import Favourites from './screens/Favourites';
import TabHeader from './components/TabHeader';
import ProductProvider from './context/Product';
import AuthProvider from './context/Auth';
import { Provider } from 'react-redux';
import store from './store/store';
import FavProvider from './context/Fav';

const Tab = createBottomTabNavigator();

const AppNavigator=()=>{
  return(
    <NavigationContainer>
      <Tab.Navigator tabBar={(props)=><TabHeader {...props} key={`tab_id_${props.navigation.getId}`}/>}>
        <Tab.Group screenOptions={{headerShown:false}}>
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Browse" component={Browse}/>
          <Tab.Screen name="Cart" component={Cart}/>
          <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Group>
        <Tab.Group>
          <Tab.Screen name="Favourites" component={Favourites}/>
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const AppContainer=({children}){
  return(
    
  )
}

export default function App(){
  return(
    <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <Provider store={store}>
          <FavProvider>
            <AppNavigator />
        </FavProvider>
        </Provider>
      </ProductProvider>
    </AuthProvider>
    </StrictMode>
  )
}