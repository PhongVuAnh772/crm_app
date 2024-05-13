import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OrderManagement from './children/OrderManagement';
import CustomerSpecified from './children/CustomerSpecified';
import WarehouseManagement from './children/WarehouseManagement';
const StorageManagement = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'QrCodeMain';

    if (routeName === 'QrCodeContainer') {
      return false;
    }

    return true;
  };

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'rgb(255, 102, 100)',
        tabBarInactiveTintColor: '#000000',

        tabBarStyle: {
          height: 40,
          width: '95%',
          position: 'absolute',
          top: 0,
          right: 16,
          left: 5,
          borderRadius: 10,
          backgroundColor: 'rgb(37, 41, 109)',
        },
        tabBarLabelStyle: {
          fontSize: 13, // Kích thước của chữ
          paddingBottom: 5,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconComponent;

          if (route.name === 'OrderManagement') {
            iconName = focused ? 'home' : 'home';
            color = focused ? 'white' : 'rgb(123, 133, 146)';
            iconComponent = (
              <View
                style={{
                  backgroundColor: focused ? 'white' : 'rgb(37, 41, 109)',
                  width: '95%',
                  height: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: focused ? 'rgb(37, 41, 109)' : 'white',
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                  Khách hàng
                </Text>
              </View>
            );
          } else if (route.name === 'CustomerSpecified') {
            iconName = focused ? 'compass' : 'compass';
            color = focused ? 'white' : 'rgb(123, 133, 146)';
            iconComponent = (
              <View
                style={{
                  backgroundColor: focused ? 'white' : 'rgb(37, 41, 109)',
                  height: '90%',
                  width:'95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: focused ? 'rgb(37, 41, 109)' : 'white',
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                  Đơn hàng
                </Text>
              </View>
            );
          } else if (route.name === 'WarehouseManagement') {
            iconName = focused ? 'compass' : 'compass';
            color = focused ? 'white' : 'rgb(123, 133, 146)';
            iconComponent = (
              <View
                style={{
                  backgroundColor: focused ? 'white' : 'rgb(37, 41, 109)',
                  height: '90%',
                  width:'95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: focused ? 'rgb(37, 41, 109)' : 'white',
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                  Kho hàng
                </Text>
              </View>
            );
          }

          return iconComponent;
        },
        swipeEnabled: true,
      })}>
        <Tab.Screen
        name="WarehouseManagement"
        component={WarehouseManagement}
        options={{tabBarShowLabel: false}}
      />
      <Tab.Screen
        name="OrderManagement"
        component={OrderManagement}
        options={{tabBarShowLabel: false}}
      />
      {/* <Tab.Screen
        name="CustomerSpecified"
        component={CustomerSpecified}
        options={{tabBarShowLabel: false}}
      /> */}
      
    </Tab.Navigator>
  );
};

export default StorageManagement;

const styles = StyleSheet.create({});
