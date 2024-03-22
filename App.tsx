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
} from 'react-native';
import TabNavigators from './src/screens/tabs/TabNavigators';
import logoLoading from './assets/logozikii_trang.png';
import LoginScreen from './src/auth/LoginScreen';
import CartScreen from './src/screens/tabs/childs/Home/child/cart/CartScreen';
import SpecifiedProduct from './src/screens/tabs/childs/Home/child/specified-product/SpecifiedProduct';
import ForgetPasswordIndex from './src/auth/forget-password/screens/child/ForgetPasswordIndex';

const Stack = createNativeStackNavigator();

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgb(5, 106, 255)" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {isLoading ? (
            <Stack.Screen name="Loading">
              {() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(5, 106, 255)',
                  }}>
                  <Image
                    source={logoLoading}
                    style={styles.logoLoadingAssets}
                  />
                  <Text style={styles.loadingText}>ZIKII CRM</Text>
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
                name="SpecifiedProduct"
                component={SpecifiedProduct}
                // options={{
                //         presentation: 'modal',
                //         animationTypeForReplace: 'pop',
                //         animation: 'slide_from_right',
                //       }}
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
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
  loadingText: {
    position: 'absolute',
    bottom: '3%',
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
});
