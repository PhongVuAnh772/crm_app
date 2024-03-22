import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import plus from '../assets/plus.png';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from './childs/Home/Home';
import CheckListIndex from './childs/CheckList/CheckListIndex';
import Expand from './childs/Expand/ExpandStacks';
import YourAccount from './childs/YourAccount/YourAccount';
import AgentTree from './childs/AgentTree/AgentTree';
import HomeStacks from './stacks/tabs/HomeStacks';
import PersonalStacks from './childs/personal/stack/PersonalStack';
import ExpandStacks from './childs/Expand/ExpandStacks';
import FastImage from 'react-native-fast-image';
import animatedPerson from '../assets/running-man-unscreen.gif';
import CheckListStacks from './childs/CheckList/stacks/CheckListStacks';
const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function App() {
  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: 'rgb(235, 102, 100)',
          tabBarInactiveTintColor: '#000000',
          indicatorStyle: {
            width: 0,
            height: 0,
            elevation: 0,
          },
          style: {
            elevation: 0, // for Android
            shadowOffset: {
              width: 0,
              height: 0, // for iOS
            },
          },

          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'white',
            borderTopColor: 'transparent',
            height: 55,
          },
          tabBarLabelStyle: {
            fontSize: 13, // Kích thước của chữ
            paddingBottom: 5,
          },
        })}>
        {
          // Tab Screens....
          // Tab ICons....
        }
        <Tab.Screen
          name={'HomeTab'}
          component={HomeStacks}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  // centring Tab Button...
                  position: 'absolute',
                  alignItems: 'center',
                }}>
                <FontAwesome5
                  name="home"
                  size={23}
                  color={
                    focused ? 'rgb(50, 111, 226)' : 'black'
                  }></FontAwesome5>
                {focused && (
                  <Text
                    style={{
                      color: focused ? 'rgb(50, 111, 226)' : 'black',
                      fontSize: 10,
                      marginTop: 5,
                    }}>
                    Trang chủ
                  </Text>
                )}
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>

        <Tab.Screen
          name={'YourAccount'}
          component={PersonalStacks}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  // centring Tab Button...
                  position: 'absolute',
                  alignItems: 'center',
                }}>
                <FontAwesome5
                  name="user-alt"
                  size={23}
                  color={
                    focused ? 'rgb(50, 111, 226)' : 'black'
                  }></FontAwesome5>
                {focused && (
                  <Text
                    style={{
                      color: focused ? 'rgb(50, 111, 226)' : 'black',
                      fontSize: 10,
                      marginTop: 5,
                    }}>
                    Cá nhân
                  </Text>
                )}
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.2,
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>

        {
          // Extra Tab Screen For Action Button..
        }

        <Tab.Screen
          name={'CheckList'}
          component={CheckListStacks}
          options={{
            tabBarIcon: ({focused}) => (
              // <TouchableOpacity>
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'rgb(50, 111, 226)',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: Platform.OS == 'android' ? 50 : 30,
                }}>
                <FastImage
                  style={{width: 25, height: 25}}
                  source={animatedPerson}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              // </TouchableOpacity>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 9,
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>

        <Tab.Screen
          name={'AgentTree'}
          component={AgentTree}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  // centring Tab Button...
                  position: 'absolute',
                  alignItems: 'center',
                }}>
                <FontAwesome6
                  name="folder-tree"
                  size={23}
                  color={
                    focused ? 'rgb(50, 111, 226)' : 'black'
                  }></FontAwesome6>

                {focused && (
                  <Text
                    style={{
                      color: focused ? 'rgb(50, 111, 226)' : 'black',
                      fontSize: 10,
                      marginTop: 5,
                    }}>
                    Tuyến dưới
                  </Text>
                )}
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3.7,
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>

        <Tab.Screen
          name={'Expand'}
          component={ExpandStacks}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  // centring Tab Button...
                  position: 'absolute',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name="menu"
                  size={25}
                  color={
                    focused ? 'rgb(50, 111, 226)' : 'black'
                  }></MaterialIcons>
                {focused && (
                  <Text
                    style={{
                      color: focused ? 'rgb(50, 111, 226)' : 'black',
                      fontSize: 10,
                      marginTop: 5,
                    }}>
                    Xem thêm
                  </Text>
                )}
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4.9,
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>
      </Tab.Navigator>

      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 3,
          backgroundColor: 'rgb(50, 111, 226)',
          position: 'absolute',
          bottom: 55,
          left: 20,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
    </>
  );
}

function getWidth() {
  let width = Dimensions.get('screen').width;
  width = width - 80;

  return width / 5;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
