import notifee, {EventType,AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {PERMISSIONS, request} from 'react-native-permissions';
import { navigate } from './navigation';

export const getFcmToken = async () => {
  let token = null;
  await checkApplicationNotificationPermission();
  await registerAppWithFCM();
  try {
    token = await messaging().getToken();
    console.log('getFcmToken-->', token);
  } catch (error) {
    console.log('getFcmToken Device Token error ', error);
  }
  return token;
};

export async function registerAppWithFCM() {
  console.log(
    'registerAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(status => {
        console.log('registerDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('registerDeviceForRemoteMessages error ', error);
      });
  }
}

//method was called on un register the user from firebase for stoping receiving notifications
export async function unRegisterAppWithFCM() {
  console.log(
    'unRegisterAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );

  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .unregisterDeviceForRemoteMessages()
      .then(status => {
        console.log('unregisterDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('unregisterDeviceForRemoteMessages error ', error);
      });
  }
  await messaging().deleteToken();
  console.log(
    'unRegisterAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );
}

export const checkApplicationNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .then(result => {
      console.log('POST_NOTIFICATIONS status:', result);
    })
    .catch(error => {
      console.log('POST_NOTIFICATIONS error ', error);
    });
};



//method was called to listener events from firebase for notification triger
export function registerListenerWithFCM() {

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('onMessage Received : ', JSON.stringify(remoteMessage));
    if (
      remoteMessage?.notification?.title &&
      remoteMessage?.notification?.body
    ) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
      );
    }
  });
  notifee.onForegroundEvent(({type, detail}) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        navigate('Login')
        break;
    }
  });
  
  messaging().onNotificationOpenedApp(async remoteMessage => {
           navigate('Login')

    
  });
 
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  return unsubscribe;
}

//method was called to display notification
async function onDisplayNotification(title, body, data) {
  console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH
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


 
  //  Alias: AndroidDebugKey
  // MD5: 2D:6A:D3:44:E0:0A:BF:21:94:59:4C:6C:31:D5:A8:B1
  // SHA1: 4A:D1:13:CA:C5:C8:86:E6:CF:22:40:32:82:CC:CE:C8:35:C9:BE:8D
  // SHA-256: 36:8D:99:52:72:C3:57:60:5D:FE:94:BA:2E:A1:F1:2F:B4:DA:8B:C5:C0:06:FB:DA:4B:2C:FE:D5:EA:FE:FA:8B
  // const getFcmToken = async () => {
  //   let token = null;
  //   await checkApplicationNotificationPermission();
  //   await registerAppWithFCM();
  //   try {
  //     token = await messaging().getToken();
  //     console.log('getFcmToken-->', token);
  //   } catch (error) {
  //     console.log('getFcmToken Device Token error ', error);
  //   }
  //   return token;
  // };

  // async function registerAppWithFCM() {
  //   console.log(
  //     'registerAppWithFCM status',
  //     messaging().isDeviceRegisteredForRemoteMessages,
  //   );
  //   if (!messaging().isDeviceRegisteredForRemoteMessages) {
  //     await messaging()
  //       .registerDeviceForRemoteMessages()
  //       .then(status => {
  //         console.log('registerDeviceForRemoteMessages status', status);
  //       })
  //       .catch(error => {
  //         console.log('registerDeviceForRemoteMessages error ', error);
  //       });
  //   }
  // }

  // //method was called on un register the user from firebase for stoping receiving notifications
  // async function unRegisterAppWithFCM() {
  //   console.log(
  //     'unRegisterAppWithFCM status',
  //     messaging().isDeviceRegisteredForRemoteMessages,
  //   );

  //   if (messaging().isDeviceRegisteredForRemoteMessages) {
  //     await messaging()
  //       .unregisterDeviceForRemoteMessages()
  //       .then(status => {
  //         console.log('unregisterDeviceForRemoteMessages status', status);
  //       })
  //       .catch(error => {
  //         console.log('unregisterDeviceForRemoteMessages error ', error);
  //       });
  //   }
  //   await messaging().deleteToken();
  //   console.log(
  //     'unRegisterAppWithFCM status',
  //     messaging().isDeviceRegisteredForRemoteMessages,
  //   );
  // }

  // const checkApplicationNotificationPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  //   request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
  //     .then(result => {
  //       console.log('POST_NOTIFICATIONS status:', result);
  //     })
  //     .catch(error => {
  //       console.log('POST_NOTIFICATIONS error ', error);
  //     });
  // };

  // //method was called to listener events from firebase for notification triger
  // function registerListenerWithFCM() {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('onMessage Received : ', JSON.stringify(remoteMessage));
  //     if (
  //       remoteMessage?.notification?.title &&
  //       remoteMessage?.notification?.body
  //     ) {
  //       onDisplayNotification(
  //         remoteMessage.notification?.title,
  //         remoteMessage.notification?.body,
  //         remoteMessage?.data,
  //       );
  //     }
  //   });
  //   notifee.onForegroundEvent(({type, detail}) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         console.log('User dismissed notification', detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         if (navigationRef.isReady()) {
  //           navigationRef.navigate('Login');
  //         }
  //         break;
  //     }
  //   });

  //   messaging().onNotificationOpenedApp(async remoteMessage => {
  //     if (navigationRef.isReady()) {
  //           navigationRef.navigate('Login');
  //         }
  //   });
  //   // Check whether an initial notification is available

  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });

  //   return unsubscribe;
  // }

  // //method was called to display notification
  // async function onDisplayNotification(title, body, data) {
  //   console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();
  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //     importance: AndroidImportance.HIGH,
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: title,
  //     body: body,
  //     data: data,
  //     android: {
  //       channelId,
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // }
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const getNotification = await AsyncStorage.getItem('get_notification');
  //     const getNotificationNewProduct = await AsyncStorage.getItem(
  //       'get_notification_new_product',
  //     );
  //     const getNotificationNewCustomer = await AsyncStorage.getItem(
  //       'get_notification_new_customer',
  //     );
  //     const getNotificationCustomerEvent = await AsyncStorage.getItem(
  //       'get_notification_customer_event',
  //     );
  //     const getNotificationCheckingEvent = await AsyncStorage.getItem(
  //       'get_notification_checking_event',
  //     );
  //     const getNotificationWarehouse = await AsyncStorage.getItem(
  //       'get_notification_warehouse',
  //     );

  //     if (getNotification === 'yes') {
  //       const unsubscribe = registerListenerWithFCM();
  //       return unsubscribe;
  //     } else if (getNotification === 'no') {
  //       return;
  //     } else if (getNotification === null) {
  //       await AsyncStorage.setItem('get_notification', 'yes');
  //       const unsubscribe = registerListenerWithFCM();
  //       return unsubscribe;
  //     }

  //     if (getNotificationNewProduct === null) {
  //       await AsyncStorage.setItem('get_notification_new_product', 'yes');
  //     } else {
  //     }
  //     if (getNotificationNewCustomer === null) {
  //       await AsyncStorage.setItem('get_notification_new_customer', 'yes');
  //     } else {
  //     }
  //     if (getNotificationCustomerEvent === null) {
  //       await AsyncStorage.setItem('get_notification_customer_event', 'yes');
  //     } else {
  //     }
  //     if (getNotificationCheckingEvent === null) {
  //       await AsyncStorage.setItem('get_notification_checking_event', 'yes');
  //     } else {
  //     }
  //     if (getNotificationWarehouse === null) {
  //       await AsyncStorage.setItem('get_notification_warehouse', 'yes');
  //     } else {
  //     }
  //   };

  //   fetchData();
  // }, []);