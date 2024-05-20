import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ScrollView,
  Linking
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import verifiedIcon from '../../assets/verified.png';
import coinIcon from '../../assets/coins.png';
import CountdownTimer from '../hooks/CountDownTimer';
import HomeContentSecond from '../../../Home/main/content/HomeContentSecond';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {UPDATE_USER_DATA} from '../../../../../../../slices/users/userSlice';
import {UPDATE_LOGOUT_REQUIRED} from '../../../../../../../slices/auth/authSlice';
import askingIcon from '../../../../../assets/question.png';
import {CLEAR_USER_DATA} from '../../../../../../../slices/users/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { companyInfo } from '../../../../../../../constants/company/companyInfo';
import { colorConstants } from '../../../../../../../constants/colors/colors';

const {width} = Dimensions.get('window');
const isSmallScreen = width < 375;

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const PersonalContent = () => {
  const dispatch = useDispatch();
  const network = useSelector(state => state.network.ipv4);
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const handleDontCare = () => {
    setModalDelete(false);
  };
  const handleLogout = async () => {
    setLoading(true);
    const response = await axios.post(`${network}/logoutMemberAPI`, {
      token: token,
    });
    if (response.data && response.data.code === 0) {
      dispatch(UPDATE_USER_DATA([]));
      dispatch(UPDATE_LOGOUT_REQUIRED());
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeTabNavigators'}],
      });
      await AsyncStorage.removeItem('user_data');
    } else {
      dispatch(UPDATE_USER_DATA([]));
      dispatch(UPDATE_LOGOUT_REQUIRED());
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeTabNavigators'}],
      });
      await AsyncStorage.removeItem('user_data');
    }
  };
  const handleAccept = async () => {
    const response = await axios.post(`${network}/lockMemberAPI`, {
      token: token,
    });
    if (response.data && response.data.code === 0) {
      dispatch(CLEAR_USER_DATA());
      dispatch(UPDATE_LOGOUT_REQUIRED());
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeTabNavigators'}],
      });
    }
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgb(37, 41, 109)" />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDelete}
        onRequestClose={() => {
          setModalDelete(false);
        }}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={askingIcon} style={styles.modalIcon} alt=""/>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 20,
                textAlign: 'center',
              }}>
              Bạn có muốn xóa tài khoản ?
            </Text>
            <Text
              style={{
                fontSize: 16,
                paddingTop: 20,
                textAlign: 'center',
                paddingBottom: 20,
              }}>
              Nếu đồng ý bạn hãy chờ chúng tôi xét duyệt
            </Text>
            <View style={styles.buttonModalContainer}>
              <TouchableOpacity
                style={{
                  width: '40%',
                  paddingVertical: 15,
                  backgroundColor: 'gray',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => handleDontCare()}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                  Không đồng ý
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '55%',
                  paddingVertical: 15,
                  backgroundColor: 'rgb(37, 41, 109)',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => handleAccept()}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={{alignSelf: 'center'}}
                    />
                  ) : (
                    'Đồng ý'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.titleMainContainer}>
        <View style={styles.circle} />
        <View style={styles.circleSecond} />

        <Text style={styles.titleMainText}>Mở rộng</Text>
      </View>
      <View style={styles.container}>
        {/* <View style={styles.infoContainer}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/236x/30/31/1e/30311e920a4939fed09036528bf8c955.jpg',
          }}
          style={styles.imageUser}
        />
        <View style={styles.infoSimpleContainer}>
          <Text style={styles.nameAgeText}>Phong, 21</Text>
          <Text style={styles.statusInfo}>Hoàn thiện hồ sơ</Text>
        </View>
        <View style={styles.infoSimpleIcon}>
          <Entypo name="chevron-thin-right" size={20} color="rgb(78, 78, 80)" />
        </View>
      </View> */}
        {/* <View style={styles.allStatusContainer}>
        <CircularProgress
          value={85}
          inActiveStrokeColor={'gray'}
          inActiveStrokeOpacity={0.2}
          progressValueColor={'#fff'}
          valueSuffix={'%'}
          radius={30}
          activeStrokeColor={'rgb(254, 128, 69)'}
        />
        <View style={styles.allStatusTextContainer}>
          <Text style={styles.allStatusTextTitle}>Điểm hồ sơ của bạn</Text>
          <Text style={styles.allStatusTextDescription}>
            Hoàn thành hồ sơ để tạo độ uy tín
          </Text>
        </View>
      </View> */}
        {/* <View style={styles.allStatusContainer}>
        <View style={styles.addButtonContainer}>
          <MaterialIcons name="add" size={40} color="black" />
        </View>
        <View style={styles.allStatusTextContainer}>
          <Text style={styles.allStatusTextTitle}>Nâng cấp lên Plus</Text>
          <Text style={styles.allStatusTextDescription}>
            Tối đa hóa cơ hội của bạn
          </Text>
        </View>
      </View> */}
        {/* <View style={{paddingVertical: 10}}><HomeContentSecond /></View> */}
        <View style={[styles.infoContainer, {paddingVertical: 5}]}>
          <Image source={verifiedIcon} style={styles.verifiedIconAssets} alt=""/>
          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Xác minh ngay</Text>
            <Text style={styles.allStatusTextDescriptionNow}>
              Cho người khác thấy hồ sơ của bạn là thật
            </Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </View>
        <View style={[styles.infoContainer, {paddingVertical: 5}]}>
          <AntDesign name="user" size={20} color="black" />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Tài khoản</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </View>
        <View style={[styles.infoContainer, {paddingVertical: 5}]}>
          <Feather name="bell" size={20} color="black" />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Thông báo</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </View>
        <View style={[styles.infoContainer, {paddingVertical: 5}]}>
          <Feather name="lock" size={20} color="black" />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Quyền riêng tư</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </View>
        <View style={[styles.infoContainer, {paddingVertical: 5}]}>
          <AntDesign name="heart" size={20} color="black" />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Trợ giúp</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </View>
        <View style={[styles.infoContainer, {paddingVertical: 5}]}>
          <AntDesign name="infocirlceo" size={20} color="black" />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Thông tin</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </View>
        <View style={[styles.infoContainer, {paddingVertical: 5}]}>
          <FontAwesome6 name="coins" size={20} color="black" />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Xu</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleLogout()}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={() => setModalDelete(true)}>
          <Text style={styles.deleteAccountButtonText}>Xóa tài khoản</Text>
        </TouchableOpacity>
        <View style={styles.iconAffiliateContainer}>
          <TouchableOpacity
            style={styles.iconAffiliateIconContainer}
            onPress={() =>
              Linking.openURL(
                companyInfo.linkFacebook,
              )
            }>
            <View style={styles.iconAffiliateIcon}>
              <FontAwesome6 name="facebook-f" size={23} color="white" />
            </View>
            <Text style={styles.iconAffiliateText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconAffiliateIconContainer} onPress={() =>
              Linking.openURL(
                                companyInfo.linkInstagram === "" ? 'https://www.instagram.com/' : companyInfo.linkInstagram
,
              )
          }>
            <View style={styles.iconAffiliateIcon}>
              <Feather name="instagram" size={23} color="white" />
            </View>
            <Text style={styles.iconAffiliateText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconAffiliateIconContainer} onPress={() =>
              Linking.openURL(
                companyInfo.linkYouTube === "" ? 'https://www.youtube.com' : companyInfo.linkYouTube,
              )
          }>
            <View style={styles.iconAffiliateIcon}>
              <Feather name="youtube" size={23} color="white" />
            </View>
            <Text style={styles.iconAffiliateText}>Youtube</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconAffiliateIconContainer}  onPress={() =>
              Linking.openURL(
                                companyInfo.linkTiktok === "" ? 'https://www.tiktok.com' : companyInfo.linkTiktok,

              )
            }>
            <View style={styles.iconAffiliateIcon}>
              <Ionicons name="logo-tiktok" size={23} color="white" />
            </View>
            <Text style={styles.iconAffiliateText}>Tiktok</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textAffiliateTrendingFirst}>
          {companyInfo.name}
        </Text>
        <Text style={styles.textAffiliateTrending}>(Phiên bản 0.0.1)</Text>
      </View>
    </>
  );
};

export default PersonalContent;

const styles = StyleSheet.create({
  textAffiliateTrendingFirst: {
    textAlign: 'center',
    fontSize: 13,
    color: 'black',
  },
  textAffiliateTrending: {
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 13,
    color: 'black',
  },
  iconAffiliateText: {
    fontWeight: 'bold',
    paddingTop: 15,
    fontSize: 13,
    color: 'black',
  },
  iconAffiliateIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(37, 41, 109)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAffiliateIconContainer: {
    alignItems: 'center',
  },
  iconAffiliateContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: heightDimension * 0.05,
    paddingHorizontal: widthDimension * 0.05,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100, // Giá trị bằng 1/2 kích thước của hình tròn
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
    left: '40%',
    bottom: -50,
  },
  circleSecond: {
    width: 200,
    height: 200,
    borderRadius: 100, // Giá trị bằng 1/2 kích thước của hình tròn
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
    right: '0%',
    top: 0,
  },
  logoutButton: {
    width: '60%',
    paddingVertical: 8,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstants.primaryColor,
    borderRadius: 20,
    alignSelf: 'center',
  },
  deleteAccountButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: 'black',
  },
  deleteAccountButton: {
    width: '100%',
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
  },

  titleMainContainer: {
    width: '100%',
    height: heightDimension * 0.13,
    backgroundColor: 'rgb(37, 41, 109)',
    justifyContent: 'flex-end',
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  titleMainText: {
    color: 'white',
    fontWeight: 'bold',
                    fontSize: isSmallScreen ? 23 : 30,

  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 50,
  },
  infoContainer: {
    width: '100%',
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTextDescription: {
    color: 'rgb(78, 78, 80)',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  coinContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(255, 187, 16)',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 5,
  },
  coinText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    paddingLeft: 15,
  },
  coinIconAssets: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  allStatusContainer: {
    width: '100%',
    paddingVertical: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: 'rgb(35, 34, 40)',
    alignItems: 'center',
    borderRadius: 15,
  },
  allStatusContainerTwice: {
    width: '100%',
    paddingVertical: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: 'rgb(35, 34, 40)',
    borderRadius: 15,
  },
  imageUser: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  verifiedIconAssets: {
    width: 20,
    height: 20,
  },
  infoSimpleContainer: {
    paddingHorizontal: 20,
    flex: 10,
    justifyContent: 'center',
  },
  nameAgeText: {
    color: 'black',
    fontSize: 30,
    // paddingTop: 10,
    fontWeight: '600',
  },
  infoSimpleIcon: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInfo: {
    color: 'rgb(254, 128, 69)',
    fontSize: 20,
    paddingTop: 10,
    fontWeight: '500',
  },
  modalIcon: {
    height: 100,
    width: 100,
  },
  actionText: {
    fontSize: isSmallScreen ? 15 : 20,
    fontWeight: '400',
    color: 'black',
  },

  allStatusTextTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  allStatusTextDescription: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
    paddingTop: 5,
  },
  allStatusTextDescriptionNow: {
    color: 'black',
    fontSize: isSmallScreen ? 12 : 15,
    fontWeight: '300',
    paddingTop: 5,
  },
  allStatusTextContainer: {
    paddingLeft: 15,
    flex: 1,
  },
  allStatusTextContainerTwice: {
    paddingLeft: 5,
    flex: 1,
  },
  addButtonContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgb(254, 128, 69)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: widthDimension * 0.9,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
