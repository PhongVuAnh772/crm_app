import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useRef} from 'react';
import AllJobs from './top-tabs/all-jobs/AllJobs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomerJobs from './top-tabs/customer-jobs/CustomerJobs';
import OtherJobs from './top-tabs/other-jobs/OtherJobs';
const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const CheckListContent = () => {
  const bellIconRef = useRef(null);

  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.actionHeaderContainer}>
    <>

      <Tab.Navigator
        initialRouteName="AllJobs"
        screenOptions={{
          lazy: true,
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            textTransform: 'capitalize',
            paddingHorizontal: 5,
          }, // Thêm padding cho text
          swipeEnabled: true,
          tabBarAndroidRipple: {borderless: false},
          tabBarItemStyle: {width: 'auto', borderRadius: 10, height: 45},
          tabBarScrollEnabled: true,
          tabBarStyle: {width: '75%', shadowColor: '#FFFFFF',position:'relative'},
          tabBarShadowStyle: {},
          lazyPreloadDistance: 1,
          tabBarActiveTintColor:'rgb(50, 111, 226)',
          tabBarInactiveTintColor:'gray'
        }}>
        <Tab.Screen
          name="AllJobs"
          component={AllJobs}
          options={{tabBarLabel: 'Tất cả'}}
        />
        <Tab.Screen
          name="CustomerJobs"
          component={CustomerJobs}
          options={{tabBarLabel: 'Khách hàng'}}
        />
        <Tab.Screen
          name="OtherJobs"
          component={OtherJobs}
          options={{tabBarLabel: 'Khác'}}
        />
        <Tab.Screen
          name="Other3Jobs"
          component={OtherJobs}
          options={{tabBarLabel: '23'}}
        />
        <Tab.Screen
          name="Oth3erJobs"
          component={OtherJobs}
          options={{tabBarLabel: 'Khá1231c'}}
        />
      </Tab.Navigator>
      <Feather name="shopping-cart" size={22} color="black" style={{position:'absolute',bottom: 0,right: 60, top: 10,}} />
      <Entypo
        name="menu"
        size={25}
        color="black"
        style={{position:'absolute',right: 15, top: 10,}}
        ref={bellIconRef}
      />
     
    </>
    </View>
  );
};

export default CheckListContent;

const styles = StyleSheet.create({
  actionHeaderContainer: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    paddingBottom: 10,
    flex: 1,
    width: '100%',
   
  },
  numberNotificationContainer: {
    backgroundColor: 'red',
    height: 18,
    borderRadius: 10,
    position: 'absolute',
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 5,
  },
  numberNotification: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
