import React, {useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import TabNavigators from './src/screens/tabs/TabNavigators';
import logoLoading from './constants/logo/phoenix-logo-other.png';
import LoginScreen from './src/auth/LoginScreen';
import CartScreen from './src/screens/tabs/childs/Home/child/cart/CartScreen';
import SpecifiedProduct from './src/screens/tabs/childs/Home/child/specified-product/SpecifiedProduct';
import ForgetPasswordIndex from './src/auth/forget-password/screens/child/ForgetPasswordIndex';
import ForgetPasswordChanging from './src/auth/forget-password/screens/child/children/ForgetPasswordChanging';
import SuccessForgetPassword from './src/auth/forget-password/screens/child/children/SuccessForgetPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UPDATE_TOKEN_REQUIRED} from './slices/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import InformationFixing from './src/screens/childrens/InformationFixing';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {UPDATE_USER_DATA} from './slices/users/userSlice';
import SpecifiedCategory from './src/screens/childrens/SpecifiedCategory/SpecifiedCategory';
import CampaignStacks from './src/screens/childrens/campaign/parents/stacks/CampaignStack';
import ListEnjoyingCustomer from './src/screens/childrens/campaign/childrens/customer/ListEnjoyingCustomer';
import SettingNotificationScreen from './src/screens/notifications/children/SettingNotificationScreen';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import {Circle, Svg} from 'react-native-svg';
import SpecifiedCampaign from './src/screens/childrens/campaign/childrens/others/MyCampaign/others/SpecifiedCampaign';
import CreatingCampaign from './src/screens/childrens/campaign/childrens/others/MyCampaign/others/creating/CreatingCampaign';
import HistoryRequests from './src/screens/tabs/stacks/childrens/CustomerManagement/children/warehouse/children/HistoryRequests';
import ListingRequests from './src/screens/tabs/stacks/childrens/CustomerManagement/children/warehouse/children/ListingRequests';
import ListingGoods from './src/screens/tabs/stacks/childrens/CustomerManagement/children/warehouse/children/ListingGoods';
import ImportingGoods from './src/screens/tabs/stacks/childrens/CustomerManagement/children/warehouse/children/ImportingGoods';
import NotificationScreen from './src/screens/notifications/NotificationScreen';
import {colorConstants} from './constants/colors/colors';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {
  getFcmToken,
  registerListenerWithFCM,
  registerAppWithFCM,
  checkApplicationNotificationPermission,
} from './src/helpers';
import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import {createNavigationContainerRef} from '@react-navigation/native';
import useNotificationStore from './zustand/notifications/notificationSlice';


const Stack = createNativeStackNavigator();

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

function App(): React.JSX.Element {
  const navigationRef = createNavigationContainerRef();

  // useEffect(() => {
  //   const getTokenDevice = async () => {
  //     const storedTokenDevice = await AsyncStorage.getItem('token_device');
  //     await checkApplicationNotificationPermission();
  //     await registerAppWithFCM();
  //     if (storedTokenDevice === null) {
  //       PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //       );
  //       const authStatus = await messaging().requestPermission();
  //       const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //       if (enabled) {
  //         console.log('Authorization status:', authStatus);
  //         const tokenDevice = await messaging().getToken();
  //         if (tokenDevice) {
  //           const response = await axios.post(`${network}/saveTokenDeviceAPI`, {
  //             token_device: tokenDevice,
  //           });
  //           if (response.data && response.data.code === 0) {
  //             await AsyncStorage.setItem('token_device', tokenDevice);
  //             console.log(
  //               'Token device đã được lưu, token device :' + tokenDevice,
  //             );
  //           }
  //         }
  //       }
  //     } else {
  //       console.log(
  //         'Token device đã được lưu, token device :' + storedTokenDevice,
  //       );
  //     }
  //   };
  //   getTokenDevice();
  // }, []);
  const token = useSelector(state => state.auth.token);
const network = useSelector(state => state.network.ipv4);
  const navigation = useNavigation();
  useEffect(() => {
    const getLastLogin = async () => {
      console.log('Đã cập nhật đăng nhập lần cuối');

      if (token === null) {
        return;
      } else {
        const response = await axios.post(`${network}/updateLastLoginAPI`, {
          token: token,
        });
        if (response.data && response.data.code === 0) {
          return;
        }
      }
    };
    getLastLogin();
  }, []);
  const r = useSharedValue(0);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: 'rgb(5, 106, 255)',
          backgroundColor: 'rgb(5, 106, 255)',
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          color: 'white',
          fontWeight: 'bold',
        }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),

    tomatoToast: ({text1, props}) => (
      <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserLogin = await AsyncStorage.getItem('user_data');

        if (storedToken !== null && storedUserLogin !== null) {
          dispatch(UPDATE_TOKEN_REQUIRED(storedToken));
          dispatch(UPDATE_USER_DATA(JSON.parse(storedUserLogin)));
        }
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
      }
    };

    getToken();
  }, []);
  const [completeNavigating, setCompleteNavigating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [handlePressCompleted, setHandlePressCompleted] = useState(false);
  const bears = useNotificationStore((state) => state.isTrue)

  useEffect(() => {
    console.log("zubtand:" + bears)
    const handleDeepLink = async () => {
    try {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl && initialUrl.startsWith('phoenixcampcrm://')) {
        console.log(initialUrl)
        return;
      }
    } catch (error) {
      console.error('Error getting initial URL:', error);
    }

    setIsLoading(false);

    setTimeout(() => {
      handlePress();
      setHandlePressCompleted(true);
    }, 3000);
  };

  handleDeepLink();
  }, []);
  const [statusBarColor, setStatusBarColor] = useState(
    colorConstants.primaryColor,
  );
  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value),
  }));

  const handlePress = () => {
    setStatusBarColor('white');
    const radius =
      Math.sqrt(Math.pow(widthDimension, 2) + Math.pow(heightDimension, 2)) / 2;
    r.value = radius;
  };

  useEffect(() => {
    if (handlePressCompleted && bears) {
      // setCompleteNavigating(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeTabNavigators'}],
      });                                                                                                                                                                                                                                                                                                                                                                                                                  
    }
  }, [handlePressCompleted]);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />

      <Stack.Navigator
      // initialRouteName='Loading'
        screenOptions={{
          headerShown: false,
        }}>
        {/* {completeNavigating ? (
            
          ) : (
            <> */}
        <Stack.Screen name="Loading">
          {() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colorConstants.primaryColor,
              }}>
              <Image
                source={logoLoading}
                style={styles.logoLoadingAssets}
                alt=""
              />
              <Svg style={styles.svg}>
                <AnimatedCircle
                  cx="50%"
                  cy="50%"
                  fill="white"
                  animatedProps={animatedProps}
                />
              </Svg>
              {isLoading && <ActivityIndicator size="large" color="white" />}
              <Text style={styles.loadingText}>PHOENIX CRM</Text>
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="HomeTabNavigators" component={TabNavigators} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="InformationFixing"
          component={InformationFixing}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="ForgetPasswordIndex"
          component={ForgetPasswordIndex}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SpecifiedCategory"
          component={SpecifiedCategory}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ForgetPasswordChanging"
          component={ForgetPasswordChanging}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SuccessForgetPassword"
          component={SuccessForgetPassword}
        />
        <Stack.Screen name="CampaignStacks" component={CampaignStacks} />
        <Stack.Screen
          name="SpecifiedCampaign"
          component={SpecifiedCampaign}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CreatingCampaign"
          component={CreatingCampaign}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ImportingGoods"
          component={ImportingGoods}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ListingGoods"
          component={ListingGoods}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ListingRequests"
          component={ListingRequests}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="HistoryRequests"
          component={HistoryRequests}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ListEnjoyingCustomer"
          component={ListEnjoyingCustomer}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SettingNotificationScreen"
          component={SettingNotificationScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'pop',
            animation: 'slide_from_right',
          }}
        />
        {/* 
              
              <Stack.Screen
                name="ListCampaignIndex"
                component={ListCampaignIndex}
                options={{
                  presentation: 'modal',
                  animationTypeForReplace: 'pop',
                  animation: 'slide_from_right',
                }}
              /> */}
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  logoLoadingAssets: {
    height: heightDimension * 0.3,
    width: widthDimension * 0.6,
    resizeMode: 'contain',
    marginBottom: heightDimension * 0.2,
  },
  svg: {
    position: 'absolute',
    bottom: '50%',
    top: '0%',
    height: '100%',
    width: '100%',
  },
  loadingText: {
    position: 'absolute',
    bottom: '3%',
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(245, 243, 242)',

  },
});
