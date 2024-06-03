/**
 * @format
 */
import {StyleSheet, View, Dimensions, Image, StatusBar} from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {linking} from './src/helpers/deep_linking';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Linking, ActivityIndicator} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Circle, Svg} from 'react-native-svg';
import {colorConstants} from './constants/colors/colors';
import logoLoading from './constants/logo/phoenix-logo-other.png';
import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NAVIGATING_FROM_NOTIFICATION} from './slices/notification/notificationSlice';
import useNotificationStore from './zustand/notifications/notificationSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
async function onDisplayNotification(title, body, data) {
  console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}
const saveDataNotification = async message => {
  try {
    // Retrieve stored notifications
    const valueNotification = await AsyncStorage.getItem(
      'my-data-notification',
    );

    // Retrieve stored user data
    const storedUserLogin = await AsyncStorage.getItem('user_data');

    let notifications = [];

    if (valueNotification !== null) {
      notifications = JSON.parse(valueNotification);
    }

    if (storedUserLogin !== null) {
      const user = JSON.parse(storedUserLogin);

      // Add user id to the message
      const messageWithUserId = {message, userId: user.id};

      // Add the new message with user id to the beginning of the notifications array
      notifications.unshift(messageWithUserId);

      // Save the updated notifications array back to storage
      await AsyncStorage.setItem(
        'my-data-notification',
        JSON.stringify(notifications),
      );
    } else {
      // Add user id to the message
      const messageWithUserId = {message, userId: 0};

      // Add the new message with user id to the beginning of the notifications array
      notifications.unshift(messageWithUserId);

      // Save the updated notifications array back to storage
      await AsyncStorage.setItem(
        'my-data-notification',
        JSON.stringify(notifications),
      );
      console.error('User data not found' + storedUserLogin);
    }
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  saveDataNotification(remoteMessage);

  onDisplayNotification(
    remoteMessage.notification?.title,
    remoteMessage.notification?.body,
    remoteMessage?.data,
  );
  return Promise.resolve();
});

messaging().onMessage(async remoteMessage => {
  console.log('onMessage Received : ', JSON.stringify(remoteMessage));
  if (remoteMessage?.notification?.title && remoteMessage?.notification?.body) {
    onDisplayNotification(
      remoteMessage.notification?.title,
      remoteMessage.notification?.body,
      remoteMessage?.data,
    );
  }
});

messaging().onNotificationOpenedApp(async remoteMessage => {
  saveDataNotification(remoteMessage);

  onDisplayNotification(
    remoteMessage.notification?.title,
    remoteMessage.notification?.body,
    remoteMessage?.data,
  );
  return Promise.resolve();
});

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

messaging().setBackgroundMessageHandler(async remoteMessage => {
  showLocalNotification(
    {title: remoteMessage.data.title, body: remoteMessage.data.body},
    remoteMessage.messageId,
  );
  return Promise.resolve();
});

const ReduxApp = () => {
  const setFalse = useNotificationStore(state => state.setFalse);

  const NAVIGATION_IDS = ['notification', 'post', 'settings'];

  function buildDeepLinkFromNotificationData(data) {
    const navigationId = data?.navigationId;
    if (!NAVIGATION_IDS.includes(navigationId)) {
      // setFalse();

      console.warn(navigationId);
      return null;
    }
    if (navigationId === 'notification') {
      return 'phoenixcampcrm://notification';
    }
    if (navigationId === 'settings') {
      // setFalse();

      return 'phoenixcampcrm://settings';
    }
    const postId = data?.postId;
    if (typeof postId === 'string') {
      return `phoenixcampcrm://post/${postId}`;
    }
    console.warn('Missing postId');
    return null;
  }

  const linking = {
    prefixes: ['phoenixcampcrm://'],
    config: {
      initialRouteName: 'HomeTabNavigators',
      screens: {
        Home: 'HomeTabNavigators',
        Details: 'details/:id',
        NotificationScreen: 'notification',
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (typeof url === 'string') {
        // dispatch(NAVIGATING_FROM_NOTIFICATION())
        return url;
      }
      //getInitialNotification: When the application is opened from a quit state.
      const message = await messaging().getInitialNotification();
      const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
      if (typeof deeplinkURL === 'string') {
        setFalse();
        return deeplinkURL;
      }
    },
    subscribe(listener) {
      const onReceiveURL = ({url}) => {
        listener(url);
      };

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

      //onNotificationOpenedApp: When the application is running, but in the background.
      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(remoteMessage);
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (typeof url === 'string') {
          listener(url);
        }
      });

      return () => {
        linkingSubscription.remove();
        unsubscribe();
      };
    },
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaProvider>
          <ThemeProvider>
            <PaperProvider>
              <BottomSheetModalProvider>
                <ApplicationProvider {...eva} theme={eva.dark}>
                  <NavigationContainer
                    linking={linking}
                    fallback={
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: colorConstants.primaryColor,
                        }}>
                        <StatusBar
                          barStyle="light-content"
                          backgroundColor={colorConstants.primaryColor}
                        />
                        <Image
                          source={logoLoading}
                          style={styles.logoLoadingAssets}
                          alt=""
                        />
                        {/* <Svg style={styles.svg}>
                <AnimatedCircle
                  cx="50%"
                  cy="50%"
                  fill="white"
                  animatedProps={animatedProps}
                />
              </Svg> */}
                        {/* {isLoading && <ActivityIndicator size="large" color="white" />} */}
                        <Text style={styles.loadingText}>PHOENIX CRM</Text>
                      </View>
                    }>
                    <App />
                  </NavigationContainer>
                </ApplicationProvider>
              </BottomSheetModalProvider>
            </PaperProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

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

AppRegistry.registerComponent(appName, () => ReduxApp);
