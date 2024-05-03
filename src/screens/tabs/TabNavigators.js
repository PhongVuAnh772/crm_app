import React, {useRef, useEffect, useState} from 'react';
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
  Modal,
  TextInput,
  ActivityIndicator,
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
import AgentTreeStacks from './childs/AgentTree/stacks/AgentTreeStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import askingIcon from '../assets/question.png';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import animatedSuccess from '../assets/success.gif';
import {
  CLEAR_USER_INTRODUCING_AGENT,
  UPDATE_USER_INTRODUCING_AGENT,
} from '../../../slices/users/userSlice';
import { colorConstants } from '../../../constants/colors/colors';
const Tab = createBottomTabNavigator();

const widthDimensions = Dimensions.get('screen').width;
export default function App() {
  const dispatch = useDispatch();
  const [successAction, setSuccessAction] = useState(false);
  const [inputModal, setInputModal] = useState('');
  const checkFirstTime = async () => {
    try {
      const value = await AsyncStorage.getItem('userDontCare');
      const introducingAgent = await AsyncStorage.getItem('introducingAgent');
      
      if (value === null) {
        setModalVisible(true);
        await AsyncStorage.setItem('userDontCare', '0');
      } else if (introducingAgent === null && value === '0') {
        setModalVisible(true);
        
      } else {
        await AsyncStorage.getItem('introducingAgent')
          .then(introducingAgentString => {
            if (introducingAgentString) {
              setModalVisible(false);
              const introducingAgentObject = JSON.parse(introducingAgentString);
              dispatch(UPDATE_USER_INTRODUCING_AGENT(introducingAgentObject));
            } else {
              console.log('Không có dữ liệu đại lý giới thiệu');
            }
          })
          .catch(error => {
            console.error('Lỗi lấy dữ liệu đại lý giới thiệu:', error);
          });
      }
    } catch (error) {
      console.log('Error checking first time:', error);
    }
  };
  useEffect(() => {
    checkFirstTime();
  }, []);
  const [errorData, setErrorData] = useState(false);
  const network = useSelector(state => state.network.ipv4);
  const handleDontCare = async () => {
    await AsyncStorage.setItem('userDontCare', '1');
    setModalVisible(false);
  };
  const handleAccept = async () => {
    setLoading(true);
    const response = await axios.post(`${network}/searchMemberAPI`, null, {
      params: {
        phone: inputModal,
      },
    });
    if (response.data && response.data[0]?.value !== '') {
      setLoading(false);
      setSuccessAction(true);
      // setModalVisible(false);
      await AsyncStorage.setItem(
        'introducingAgent',
        JSON.stringify(response.data),
      );
    } else {
      setErrorData(true);
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={askingIcon} style={styles.modalIcon} alt=""/>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 20,
                textAlign: 'center',
              }}>
              Hãy nhập số điện thoại đại lý đã giới thiệu bạn
            </Text>
            <Text style={{fontSize: 16, paddingTop: 20, textAlign: 'center',color:'gray'}}>
              Nhập số điện thoại đại lý đã giới thiệu bạn để được phục vụ nhanh
              chóng hơn
            </Text>
            <TextInput
              style={[
                styles.inputModal,
                {borderColor: errorData ? 'red' : 'black'},
              ]}
              placeholderTextColor="gray"
              placeholder="Nhập số điện thoại đại lý"
              onChangeText={text => {
                setInputModal(text);
                setErrorData(false);
              }}
              keyboardType="numeric"
            />
            {errorData && (
              <Text style={styles.errorText}>
                Không tìm thấy đại lý, hãy thử lại
              </Text>
            )}

            <View style={styles.buttonModalContainer}>
              <TouchableOpacity
                style={{
                  width: '40%',
                  paddingVertical: 15,
                  backgroundColor: 'gray',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => handleDontCare()}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                  Đừng hỏi lại
                </Text>
              </TouchableOpacity>

              {inputModal.length < 10 ? (
                <View
                  style={{
                    width: '55%',
                    paddingVertical: 15,
                    backgroundColor: 'gray',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                    Đồng ý
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    width: '55%',
                    paddingVertical: 15,
                    backgroundColor: 'rgb(255, 158, 185)',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handleAccept()}>
                  {loading ? (
                    <FastImage
                      style={{width: 20, height: 20}}
                      source={animatedPerson}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  ) : successAction ? (
                    <FastImage
                      style={{width: 20, height: 20}}
                      source={animatedSuccess}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Đồng ý
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
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
            backgroundColor: 'rgba(255, 255, 255,0.95)',
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
                  color={focused ? colorConstants.primaryColor : 'black'}></FontAwesome5>
                {focused && (
                  <Text
                    style={{
                      color: focused ? colorConstants.primaryColor : 'black',
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
                  color={focused ? colorConstants.primaryColor : 'black'}></FontAwesome5>
                {focused && (
                  <Text
                    style={{
                      color: focused ? colorConstants.primaryColor : 'black',
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
                  backgroundColor: colorConstants.primaryColor,
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
          name={'AgentTreeStacks'}
          component={AgentTreeStacks}
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
                  color={focused ? colorConstants.primaryColor : 'black'}></FontAwesome6>

                {focused && (
                  <Text
                    style={{
                      color: focused ? colorConstants.primaryColor : 'black',
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
                    focused ? colorConstants.primaryColor : 'black'
                  }></MaterialIcons>
                {focused && (
                  <Text
                    style={{
                      color: focused ? colorConstants.primaryColor : 'black',
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
          backgroundColor: colorConstants.primaryColor,
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
  buttonModalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalIcon: {
    height: 100,
    width: 100,
  },
  inputModal: {
    height: 40,
    marginVertical: 20,
    borderWidth: 0.5,
    width: '100%',
    color: 'black',
    paddingHorizontal: 10,
    borderColor: 'black',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    paddingBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: widthDimensions * 0.9,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
