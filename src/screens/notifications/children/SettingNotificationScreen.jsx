import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Image,
  Switch,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import noneNotificationSticker from '../../assets/mailbox.png';
const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;
import {useNavigation} from '@react-navigation/native';
import {colorConstants} from '../../../../constants/colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isSmallScreen} from '../../../dimensions/dimensions';
const SettingNotificationScreen = () => {
  const [notification, setNotification] = useState([]);
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [enabledCategory, setEnabledCategory] = useState(false);
  const [enabledCustomer, setEnabledCustomer] = useState(false);
  const [enabledRegiserEvent, setEnabledRegiserEvent] = useState(false);
  const [enabledCheckingEvent, setEnabledCheckingEvent] = useState(false);
  const [enabledNewCategory, setEnabledNewCategory] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }
  const toggleSwitchCategory = () =>
    setEnabledCategory(previousState => !previousState);
  const toggleSwitchCustomer = () =>
    setEnabledCustomer(previousState => !previousState);
  const toggleSwitchRegiserEvent = () =>
    setEnabledRegiserEvent(previousState => !previousState);
  const toggleSwitchCheckingEvent = () => setEnabledCheckingEvent(previousState => !previousState);
  const toggleSwitchNewCategory = () => setEnabledNewCategory(previousState => !previousState);

  useEffect(() => {
    const getDataGetNotification = async () => {
      const getNotification = await AsyncStorage.getItem('get_notification');
      if (getNotification === 'null' || getNotification === 'yes') {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    };
    getDataGetNotification();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(243, 243, 247)" />

      <View style={styles.headerNotification}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.goBack()}>
          <Feather name="corner-up-left" color="black" size={22} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: '10%',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
            Cài đặt thông báo
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            fontSize: 18,
            paddingBottom: 10,
          }}>
          Cài đặt chung
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: isSmallScreen ? 15 : 17,
            }}>
            Nhận thông báo
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#81b0ff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            fontSize: 18,
            paddingTop: 20,
            paddingBottom: 5,
          }}>
          Thông báo chi tiết
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingTop: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: isSmallScreen ? 15 : 17,
            }}>
            Đơn hàng mới
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled && enabledCategory ? '#81b0ff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchCategory}
            value={isEnabled && enabledCategory}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingTop: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: isSmallScreen ? 15 : 17,
            }}>
            Khách hàng mới
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled && enabledCustomer ? '#81b0ff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchCustomer}
            value={isEnabled && enabledCustomer}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingTop: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: isSmallScreen ? 15 : 17,
            }}>
            Khách đăng ký sự kiện
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              isEnabled && enabledRegiserEvent ? '#81b0ff' : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchRegiserEvent}
            value={isEnabled && enabledRegiserEvent}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingTop: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: isSmallScreen ? 15 : 17,
            }}>
            Khách checkin sự kiện
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={
              isEnabled && enabledCheckingEvent ? '#81b0ff' : '#f4f3f4'
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchCheckingEvent}
            value={isEnabled && enabledCheckingEvent}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingTop: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: isSmallScreen ? 15 : 17,
            }}>
            Hàng mới nhập kho
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled && enabledNewCategory ? '#81b0ff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchNewCategory}
            value={isEnabled && enabledNewCategory}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingNotificationScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerNotification: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(243, 243, 247)',
    paddingVertical: heightDimension * 0.02,
  },
  contentContainer: {
    paddingTop: heightDimension * 0.03,
    paddingHorizontal: heightDimension * 0.025,
    width: widthDimension,
  },
  noneNotificationText: {
    color: 'black',
    fontSize: 15,
    paddingTop: 3,
    fontWeight: '600',
    textAlign: 'center',
  },
  noticationContent: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  noticationContentContainer: {
    paddingTop: heightDimension * 0.05,
    paddingHorizontal: heightDimension * 0.01,
    width: widthDimension,
  },
  imageNotification: {
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: colorConstants.primaryColor,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  textTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDate: {
    fontSize: 12,
    color: 'black',
    fontStyle: 'italic',
    paddingVertical: 2,
  },
  textDescription: {
    fontSize: 13,
    color: 'black',
  },
});
