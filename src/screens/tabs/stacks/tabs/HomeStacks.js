import React from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import HomeIndex from '../../childs/Home/Home';
import SpecifiedProduct from '../../childs/Home/child/specified-product/SpecifiedProduct';
import CartScreen from '../../childs/Home/child/cart/CartScreen';

const HomeStack = createStackNavigator();

const HomeStacks = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeIndex" component={HomeIndex} />
        
      </HomeStack.Navigator>
    </>
  );
};

export default HomeStacks;
