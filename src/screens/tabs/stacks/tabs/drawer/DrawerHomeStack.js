import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../../childs/Home/Home';
import CustomDrawer from './CustomDrawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AgentTreeStacks from '../../../childs/AgentTree/stacks/AgentTreeStack';
import ManagementWrapper from '../../childrens/CustomerManagement/ManagementWrapper';
import CustomerManagementWrapper from '../../childrens/CustomerManagement/CustomerManagementWrapper';
import CampaignStacks from '../../../../childrens/campaign/parents/stacks/CampaignStack';
import PersonalStacks from '../../../childs/personal/stack/PersonalStack';
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
        name="AgentTreeStacks"
        
        component={AgentTreeStacks}
        options={{
          drawerIcon: ({color}) => (
            <Entypo name="flow-tree" size={20} color={color} />
          ),
          drawerLabel: 'Tuyến dưới',
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
            <MaterialIcons name="menu-book" size={20} color={color} />
          ),
          drawerLabel: 'Đào tạo'
        }}
      />
      <Drawer.Screen
        name="CartSystem"
        
        component={ManagementWrapper}
        options={{
          drawerIcon: ({color}) => (
                        <MaterialIcons name="person" size={20} color={color} />

          ),
          drawerLabel: 'Quản lý'
        }}
      />
      <Drawer.Screen
        name="CampaignContainer"
        
        component={CampaignStacks}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="campaign" size={20} color={color} />
          ),
          drawerLabel: 'Chiến dịch'
        }}
      />
      <Drawer.Screen
        name="ReportContainer"
        
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesome name="line-chart" size={20} color={color} />
          ),
          drawerLabel: 'Báo cáo'
        }}
      />
      <Drawer.Screen
        name="AccountContainer"
        
        component={PersonalStacks}
        options={{
          drawerIcon: ({color}) => (
            <Fontisto name="player-settings" size={20} color={color} />
          ),
          drawerLabel: 'Tài khoản'
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerHomeStack;

const styles = StyleSheet.create({});
