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
import {useNavigation} from '@react-navigation/native';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const HomeHeader = () => {
  const navigation = useNavigation()
  const bellIconRef = useRef(null);
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={zikiOfficialLogo} style={styles.imageLogo} />
        <View style={styles.separator} />
        <Text style={styles.titleSearchingLogo}>Chạm tay bay nám</Text>
      </View>
      <View style={styles.wrapper}>
        {/* <View style={styles.searchingContainer}> */}
        {/* <Text style={styles.titleSearching}>Tra cứu Đại Lý ZIKII</Text> */}
        <View style={styles.searchSpecifiedContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.inputSearching}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Tra cứu đại lý bằng số điện thoại"
              keyboardType="numeric"
            />
            <View style={styles.searchIconContainer}>
              <FontAwesome name="search" size={18} color="black" />
            </View>
          </View>
          {/* <TouchableOpacity style={styles.buttonSearch}>
              <FontAwesome name="search" size={18} color="white" />
              <Text style={styles.titleButtonSearching}>Tìm kiếm</Text>
            </TouchableOpacity> */}
        </View>
        {/* </View> */}
        <View style={styles.actionHeaderContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <Feather name="shopping-cart" size={22} color="black" />
          </TouchableOpacity>
          <Octicons
            name="bell"
            size={22}
            color="black"
            style={{paddingLeft: 15}}
            ref={bellIconRef}
          />
          <View
            style={[
              styles.numberNotificationContainer,
              {right: -8, top: 5}, // Điều chỉnh vị trí tương đối với icon bell
            ]}>
            <Text style={styles.numberNotification}>5</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  container: {
    paddingVertical: heightDimension * 0.02,
    borderBottomColor: 'rgb(244, 244, 244)',
    borderBottomWidth: 1,
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
