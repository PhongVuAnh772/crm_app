import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import zikiiLogo from '../../assets/zikii.png';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logoDescription from '../../assets/description.png';
import zikiOfficialLogo from '../../assets/ziki-logo-official.png';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllJobs from '../content/top-tabs/all-jobs/AllJobs';
import CustomerJobs from '../content/top-tabs/customer-jobs/CustomerJobs';
import OtherJobs from '../content/top-tabs/other-jobs/OtherJobs';
const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const CheckListHeader = () => {
  const bellIconRef = useRef(null);
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={zikiOfficialLogo} style={styles.imageLogo} alt=""/>
        <View style={styles.separator} />
        <Text style={styles.titleSearchingLogo}>Chạm tay bay nám</Text>
      </View>
      
    </View>
  );
};

export default CheckListHeader;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  container: {
    // paddingVertical: heightDimension * 0.0,
    // borderBottomColor: 'rgb(244, 244, 244)',
    // borderBottomWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  logoAssets: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  wrapper: {
    paddingHorizontal: heightDimension * 0.015,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  actionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 40,
    paddingBottom: 10,
  },
  textLogo: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  numberNotificationContainer: {
    backgroundColor: 'red',
    height: 18,
    borderRadius: 10,
    position: 'absolute',
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberNotification: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonSearch: {
    width: '28%',
    height: 40,
    backgroundColor: 'rgb(50, 111, 226)',
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  titleButtonSearching: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  actionWrapper: {
    borderWidth: 2,
    borderColor: 'rgb(244, 244, 244)',
    paddingVertical: heightDimension * 0.01,
    borderRadius: 10,

    paddingHorizontal: heightDimension * 0.015,
  },
  titleSearching: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  titleSearchingLogo: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  searchSpecifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputSearching: {
    height: 40,
    borderWidth: 0.4,
    padding: 10,
    marginTop: 5,
    width: '100%',
    borderRadius: 5,
    borderColor: 'gray',
    fontSize: 18,
    paddingLeft: 40,
  },
  imageLogo: {
    width: 80,
    height: 55,
    resizeMode: 'contain',
    marginHorizontal: heightDimension * 0.015,
  },
  imageLogoDescription: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  searchContainer: {
    position: 'relative',
    width: '95%',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 10,
    top: 15,
  },
  // separator: {
  //   width: 10, // Chiều rộng của ngăn cách
  //   height: 1, // Chiều cao của ngăn cách
  //   backgroundColor: 'gray', // Màu sắc của ngăn cách
  //   marginHorizontal: 5, // Khoảng cách giữa ngăn cách và các phần tử khác
  //       marginBottom: 10

  // },
});
