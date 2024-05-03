import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import { colorConstants } from './constants/colors/colors';
const Stack = createNativeStackNavigator();

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

function App(): React.JSX.Element {
  const r = useSharedValue(0);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const toastConfig = {
    /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
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
    /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
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
    /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
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
  const [completeNavigating,setCompleteNavigating] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [handlePressCompleted, setHandlePressCompleted] = useState(false);

  useEffect(() => {
            setIsLoading(false);

    setTimeout(() => {
      handlePress();
      setHandlePressCompleted(true);
    }, 3000);
  }, []);
  const [statusBarColor, setStatusBarColor] = useState(colorConstants.primaryColor);
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
    // Kiểm tra xem handlePress đã hoàn thành hay chưa
    if (handlePressCompleted) {
      // Nếu đã hoàn thành, đặt isLoading thành false
      setCompleteNavigating(false);
    }
  }, [handlePressCompleted]);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {completeNavigating ? (
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
                    style={styles.logoLoadingAssets} alt=""
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
          ) : (
            <>
              <Stack.Screen
                name="HomeTabNavigators"
                component={TabNavigators}
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
              <Stack.Screen name="CampaignStacks"
                component={CampaignStacks}/>
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
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
});
