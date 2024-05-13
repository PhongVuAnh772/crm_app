import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import noneNotificationSticker from '../assets/mailbox.png';
const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;
import {useNavigation} from '@react-navigation/native';
import {colorConstants} from '../../../constants/colors/colors';

const NotificationScreen = () => {
  const [notification, setNotification] = useState([]);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(243, 243, 247)" />

      <View style={styles.headerNotification}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.goBack()}>
          <Feather name="corner-up-left" color="black" size={22} />
        </TouchableOpacity>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
          Thông báo
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('SettingNotificationScreen')}>
          <Feather name="settings" color="black" size={22} />
        </TouchableOpacity>
      </View>
      
      {notification.length > 0 ? notification.map((item,index) => (
          <View style={styles.noticationContentContainer}>
        <View style={styles.noticationContent}>
          {/* <Image /> */}
          <View style={styles.imageNotification}></View>
          <View style={styles.textContainer}>
            <View style={styles.textTitleContainer}>
              <Text numberOfLines={10} ellipsizeMode='tail' style={styles.textTitle} >Trần Ngọc Mạnh vừa thêm khách hàng</Text>

            </View>
                          <Text style={styles.textDate}>Ngày tạo thông báo: 14/4/2024</Text>

            <Text style={styles.textDescription}>Trần Ngọc Mạnh đã thêm một khách hàng mới vào hệ thống của công ty, mở ra tiềm năng hợp tác mới hoặc mở rộng quan hệ với khách hàng hiện tại.</Text>
          </View>
        </View>
      </View>
        )) : <View style={styles.contentContainer}>
        <Image
          source={noneNotificationSticker}
          style={{width: 150, height: 150}}
        />
        <Text style={styles.noneNotificationText}>
          Thông báo của bạn sẽ xuất hiện ở đây khi bạn nhận được
        </Text>
      </View>}
      
    </View>
  );
};

export default NotificationScreen;

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
    alignItems: 'center',
    paddingTop: heightDimension * 0.2,
    paddingHorizontal: heightDimension * 0.05,
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
    color:'black'
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1
  },
  textTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDate: {
    fontSize: 12,
    color:'black',
        fontStyle: 'italic',
    paddingVertical: 2
  
  },
  textDescription: {
    fontSize: 13,
    color:'black',
    
  }
});
