import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../../childs/Home/Home';
import CustomDrawer from './CustomDrawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
const Drawer = createDrawerNavigator();

const DrawerHomeStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeIndexDrawer"
       drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
        //   fontFamily: 'Roboto-Medium',
          fontSize: 14,
          fontWeight: 600
        },
      }}
      >
      <Drawer.Screen
        name="Home"
        
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="home" size={20} color={color} />
          ),
          drawerLabel: 'Trang chủ'
        }}
      />
      <Drawer.Screen
        name="ZikiiTesting"
        
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="menu-book" size={20} color={color} />
          ),
          drawerLabel: 'Hệ thống thi Phoenix',
        //   drawerLabelStyle: {
        //     fontSize: 13
        //   }
        }}
      />
      <Drawer.Screen
        name="ManagementQuantity"
        
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="engineering" size={20} color={color} />
          ),
          drawerLabel: 'Quản lý chung'
        }}
      />
      <Drawer.Screen
        name="InformationManage"
        
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="person" size={20} color={color} />
          ),
          drawerLabel: 'Thông tin cá nhân'
        }}
      />
      <Drawer.Screen
        name="CartSystem"
        
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="shopping-cart" size={20} color={color} />
          ),
          drawerLabel: 'Giỏ hàng'
        }}
      />
      
    </Drawer.Navigator>
  );
};

export default DrawerHomeStack;

const styles = StyleSheet.create({});
