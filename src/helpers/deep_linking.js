import { Linking, ActivityIndicator } from 'react-native';


const NAVIGATION_IDS = ['login'];

function buildDeepLinkFromNotificationData(data) {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId)
    return null;
  }
  if (navigationId === 'login') {
    return 'phoenixcampcrm://app/login';
  }
  if (navigationId === 'settings') {
    return 'phoenixcampcrm://app/settings';
  }
  const postId = data?.postId;
  if (typeof postId === 'string') {
    return `phoenixcampcrm://app/post/${postId}`
  }
  console.warn('Missing postId')
  return null
}

const linking = {
  prefixes: ["phoenixcampcrm://app"],
  config: {
    initialRouteName: 'Home',
    screens: {
      Login: 'login',
      Post: 'post/:id',
      Settings: 'settings'
    }
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener) {
    const onReceiveURL = ({url}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data)
      if (typeof url === 'string') {
        listener(url)
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
}


export default linking;
