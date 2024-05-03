import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,TouchableWithoutFeedback 
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import zikiiLogo from '../../assets/zikii.png';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logoDescription from '../../assets/description.png';
import zikiOfficialLogo from '../../assets/logozikii-blue.png';
import phoenixLogo from '../../../../../../../constants/logo/phoenix-logo.jpg'
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import avatarNull from '../../../../../assets/avatar-null.png';
import axios from 'axios'
const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;
const { width } = Dimensions.get('window');
const isSmallScreen = width < 375; 
import { DrawerActions } from 'react-navigation/';
import { colorConstants } from '../../../../../../../constants/colors/colors';
const HomeHeader = () => {
  const navigation = useNavigation();
  const bellIconRef = useRef(null);
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');
  const loginChecking = useSelector(state => state.auth.login);
  const userData = useSelector(state => state.user.user);
    const network = useSelector(state => state.network.ipv4);
  const [loading,setLoading] = useState(false)
  const [dataHeaderSearch,setDataHeaderSearch] = useState([])
  const [errorData, setErrorData] = useState(false)
  const [enableSearching,setEnableSearching] = useState(false)
  const fetchData = async () => {
  try {
    setLoading(true)
    // Gọi axios tại đây để lấy dữ liệu từ API
    const response = await axios.get(`${network}/searchMemberAPI`, null, {
      params: {
        phone: number,
      },
    });

    
    if (response.data && response.data[0]?.value !== '') {
      setLoading(false);
      setDataHeaderSearch(response.data);
    } else {
      setErrorData(true);
      setLoading(false);
    }
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
  useEffect(() => {
  if (number.length === 10) {
    setEnableSearching(true)
    fetchData();
  }
  
}, [number]);
  const onPressFeedback = () => {
    setEnableSearching(false)
  }
  return (
    <TouchableWithoutFeedback onPress={onPressFeedback}>
      <View  style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.logoContainer}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              // borderColor: {colorConstants.primaryColor},
              width: 40, 
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              // borderWidth: 1,
              borderRadius: 25,
              backgroundColor: 'rgb(246, 248, 240)',
              marginRight: 15,
            }}>
            <Feather name="menu" size={17} color={colorConstants.secondaryColor} />
          </TouchableOpacity>

          <Image source={phoenixLogo} style={styles.imageLogo} alt=""/>
        </View>

        <View style={styles.actionHeaderContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CartScreen')}
            style={{
              // borderColor: {colorConstants.primaryColor},
              width:  40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              // borderWidth: 1,
              borderRadius: 25,
              backgroundColor: 'rgb(246, 248, 240)',
            }}>
            <FontAwesome
              name="shopping-cart"
              size={17}
              color={colorConstants.secondaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CartScreen')}
            style={{
              // borderColor: {colorConstants.primaryColor},
              width: 40,
              height: 40,
              marginHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              // borderWidth: 1,
              borderRadius: 25,
              backgroundColor: 'rgb(246, 248, 240)',
            }}>
            <FontAwesome
              name="bell"
              size={17}
              color={colorConstants.secondaryColor}
              style={{}}
              ref={bellIconRef}
            />
            <View
              style={[
                styles.numberNotificationContainer,
                {right: 7, top: 5}, // Điều chỉnh vị trí tương đối với icon bell
              ]}>
              <Text style={styles.numberNotification}>5</Text>
            </View>
          </TouchableOpacity>

          {loginChecking ? (
            // <Avatar
            //   rounded
            //   source={{
            //     uri: userData.avatar,
            //   }}
            //   size={40}
            //   avatarStyle={{
            //     resizeMode: 'contain',
            //     borderColor: {colorConstants.primaryColor},
            //     borderWidth: 0.5,
            //   }}
            // />
            <TouchableOpacity
              // onPress={() => navigation.navigate('Login')}
              style={{
                // borderColor: {colorConstants.primaryColor},
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                // borderWidth: 1,
                borderRadius: 25,
                backgroundColor: 'rgb(246, 248, 240)',
              }}>
              <Image source={{uri: userData.avatar}} style={{width: 20, height: 20}}  alt=""/>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                // borderColor: {colorConstants.primaryColor},
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                // borderWidth: 1,
                borderRadius: 25,
                backgroundColor: 'rgb(246, 248, 240)',
              }}>
              <Image source={avatarNull} style={{width: 20, height: 20}} alt=""/>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.searchSpecifiedContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputSearching}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Tra cứu đại lý bằng số điện thoại"
            keyboardType="numeric"
            placeholderTextColor="gray"
          />

          <View style={styles.searchIconContainer}>
            <Octicons name="search" size={18} color="gray" />
          </View>
          
          {enableSearching && <View style={styles.searchResultsContainer}>
            <View style={styles.searchResult}>
              {dataHeaderSearch.length > 0 && <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
                  width: '100%',
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <Image 
                alt=""
                  source={{uri: userData.avatar}}
                  style={[
                    styles.imageContainer,
                    {
                      borderRadius: 25,
                      resizeMode: 'contain',
                      backgroundColor: 'white',
                    },
                  ]}
                />
                <View style={{justifyContent: 'space-between'}}>
                  
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingLeft: 10,
                                            paddingBottom: 10,

                    }}>
                    {userData.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      color: 'black',
                      paddingLeft: 10,
                    }}>
                    <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingLeft: 10,
                      
                    }}>
                    {userData.phone}
                  </Text>, {userData.address}
                  </Text>
                </View>
              </View>}
              
            </View>
          </View>}
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: heightDimension * 0.015,
  },
  container: {
    paddingBottom: heightDimension * 0.015,
    borderBottomColor: 'rgb(244, 244, 244)',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    zIndex: 1000
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
    height: 12,
    borderRadius: 10,
    position: 'absolute',
    width: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberNotification: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonSearch: {
    width: '28%',
    height: 40,
    backgroundColor: colorConstants.secondaryColor,
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
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSearching: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  titleSearchingLogo: {
    fontSize: 20,
    color: colorConstants.secondaryColor,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  searchSpecifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: heightDimension * 0.015,
    position: 'relative',
  },
  searchResultsContainer: {
    width: '100%',
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 100,
  },
  searchResult: {
    width: '100%',
        backgroundColor:'white',
    borderRadius: 10,
    marginTop: 5,
    elevation: 5,
    shadowColor: '#52006A',
  },
  inputSearching: {
    height:  isSmallScreen ? 40 : 45,
    borderWidth: 0.6,
    padding: 10,
    marginTop: 5,
    width: '100%',
    borderRadius: 20,
    borderColor: colorConstants.secondaryColor,
    fontSize:  isSmallScreen ? 13 : 18,
    paddingLeft: 40,
    color: 'gray',
  },
  imageLogo: {
    width: isSmallScreen ? 50 : 70,
    height: 55,
    resizeMode: 'contain',
  },
  imageLogoDescription: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  searchContainer: {
    position: 'relative',
    width: '96%',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 15,
    top: 18,
  },
  // separator: {
  //   width: 10, // Chiều rộng của ngăn cách
  //   height: 1, // Chiều cao của ngăn cách
  //   backgroundColor: 'gray', // Màu sắc của ngăn cách
  //   marginHorizontal: 5, // Khoảng cách giữa ngăn cách và các phần tử khác
  //       marginBottom: 10

  // },
});
