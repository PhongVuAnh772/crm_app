import React from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeIndex from '../../childs/Home/Home';
import SpecifiedProduct from '../../childs/Home/child/specified-product/SpecifiedProduct';
import CartScreen from '../../childs/Home/child/cart/CartScreen';
import CustomerManagement from '../childrens/CustomerManagement/CustomerManagement';
import ManagementWrapper from '../childrens/CustomerManagement/ManagementWrapper';
import DrawerHomeStack from './drawer/DrawerHomeStack';
const HomeStack = createStackNavigator();

const HomeStacks = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <HomeStack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeIndex">
        <HomeStack.Screen name="HomeIndex" component={DrawerHomeStack} />
        <HomeStack.Screen name="CustomerManagement" component={ManagementWrapper} options={{
                  presentation: 'modal',
                  animationTypeForReplace: 'pop',
                  animation: 'slide_from_right',
                }}/>
                <HomeStack.Screen
                name="SpecifiedProduct"
                component={SpecifiedProduct}
               
              />
      </HomeStack.Navigator>
    </>
  );
};

export default HomeStacks;
