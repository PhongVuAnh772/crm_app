import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  StatusBar,
  Vibration,
  TouchableWithoutFeedback,
  ScrollView,
  Button,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import verifiedIcon from '../../assets/verified.png';
import coinIcon from '../../assets/coins.png';
import CountdownTimer from '../hooks/CountDownTimer';
import HomeContentSecond from '../../../Home/main/content/HomeContentSecond';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import avatarNull from '../../../../../assets/avatar-null.png'
const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;
const { width } = Dimensions.get('window');
const isSmallScreen = width < 375; 
const PersonalContent = () => {
  const sheetRef = useRef(null);
  const navigation = useNavigation();
  const userData = useSelector(state => state.user.user);
  const token = useSelector(state => state.auth.token);
  const network = useSelector(state => state.network.ipv4);
 
  const [modalChangingName, setModalChangingName] = useState(null);
  const [modalChangingDescription, setModalChangingDescription] =
    useState(false);

  const [modalChangingDate, setModalChangingDate] = useState(false);
  const [modalChangingAddress, setModalChangingAddress] = useState(false);
  const [modalChangingFacebook, setModalChangingFacebook] = useState(false);
  const [modalChangingYoutube, setModalChangingYoutube] = useState(false);
  const [modalChangingTiktok, setModalChangingTiktok] = useState(false);

  const [inputNameChanging, setInputNameChanging] = useState('');
  const [inputNameDescription, setInputNameDescription] = useState(false);
  const [inputNameDate, setInputNameDate] = useState(new Date());
  const [inputNameAddress, setInputNameAddress] = useState(false);
  const [inputNameFacebook, setInputNameFacebook] = useState(false);
  const [inputNameYoutube, setInputNameYoutube] = useState(false);
  const [inputNameTiktok, setInputNameTiktok] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const handleChangingName = async () => {
    if (inputNameChanging === '') {
      setErrMessage(true);
    } else {
      setLoading(true);

      const response = await axios.post(`${network}/saveInfoMemberAPI`, {
        token: token,
        name: inputNameChanging,
        email: userData.email,
        address: userData.address,
        birthday: userData.birthday,
        facebook: userData.facebook,
        twitter: userData.twitter,
        tiktok: userData.tiktok,
        youtube: userData.youtube,
        zalo: userData.zalo,
        description: userData.description,
      });
      if (response.data && response.data.code === 0) {
        setLoading(false);
      } else {
        setLoading(false);
        setErrMessage(true);
      }
    }
  };
  const handleChangingDescription = async () => {
    const response = await axios.post(`${network}/saveInfoMemberAPI`, {
      token: token,
      name: userData.name,
      email: userData.email,
      address: userData.address,
      birthday: userData.birthday,
      facebook: userData.facebook,
      twitter: userData.twitter,
      tiktok: userData.tiktok,
      youtube: userData.youtube,
      zalo: userData.zalo,
      description: inputNameDescription,
    });
    if (response.data && response.data.code === 0) {
      setLoading(false);
    } else {
      setLoading(false);
      setErrMessage(true);
    }
  };

  function convertISODateToddmmyyyy(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lưu ý tháng trong Date Object bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const handleChangingDate = async () => {
    if (inputNameDate === '') {
      setErrMessage(true);
    } else {
      setLoading(true);
      const response = await axios.post(`${network}/saveInfoMemberAPI`, {
        token: token,
        name: userData.name,
        email: userData.email,
        address: userData.address,
        birthday: convertISODateToddmmyyyy(inputNameDate),
        facebook: userData.facebook,
        twitter: userData.twitter,
        tiktok: userData.tiktok,
        youtube: userData.youtube,
        zalo: userData.zalo,
        description: userData.description,
      });
      if (response.data && response.data.code === 0) {
        setLoading(false);
      } else {
        setLoading(false);
        setErrMessage(true);
      }
    }
  };
  const handleChangingAddress = async () => {
    if (inputNameAddress === '') {
      setErrMessage(true);
    } else {
            setLoading(true)

      const response = await axios.post(`${network}/saveInfoMemberAPI`, {
      token: token,
      name: userData.name,
      email: userData.email,
      address: inputNameAddress,
      birthday: userData.birthday,
      facebook: userData.facebook,
      twitter: userData.twitter,
      tiktok: userData.tiktok,
      youtube: userData.youtube,
      zalo: userData.zalo,
      description: userData.description,
    });
    if (response.data && response.data.code === 0) {
      setLoading(false);
    } else {
      setLoading(false);
      setErrMessage(true);
    }
    }
    
  };
  const handleChangingFacebook = async () => {
    if (inputNameFacebook === '') {
      setErrMessage(true);
    } else {
      setLoading(true)
      const response = await axios.post(`${network}/saveInfoMemberAPI`, {
      token: token,
      name: userData.name,
      email: userData.email,
      address: userData.address,
      birthday: userData.birthday,
      facebook: inputNameFacebook,
      twitter: userData.twitter,
      tiktok: userData.tiktok,
      youtube: userData.youtube,
      zalo: userData.zalo,
      description: userData.description,
    });
    if (response.data && response.data.code === 0) {
      setLoading(false);
    } else {
      setLoading(false);
      setErrMessage(true);
    }
    }
    
  };
  const handleChangingYoutube = async () => {
    if (inputNameYoutube === '') {
      setErrMessage(true);
    } else {
      setLoading(true)
      const response = await axios.post(`${network}/saveInfoMemberAPI`, {
      token: token,
      name: userData.name,
      email: userData.email,
      address: userData.address,
      birthday: userData.birthday,
      facebook: userData.facebook,
      twitter: userData.twitter,
      tiktok: userData.tiktok,
      youtube: inputNameYoutube,
      zalo: userData.zalo,
      description: userData.description,
    });
    if (response.data && response.data.code === 0) {
      setLoading(false);
    } else {
      setLoading(false);
      setErrMessage(true);
    }
    }
    
  };
  const handleChangingTiktok = async () => {
    if (inputNameTiktok === '') {
      setErrMessage(true);
    } else {
      setLoading(true);
      const response = await axios.post(`${network}/saveInfoMemberAPI`, {
      token: token,
      name: userData.name,
      email: userData.email,
      address: userData.address,
      birthday: userData.birthday,
      facebook: userData.facebook,
      twitter: userData.twitter,
      tiktok: inputNameTiktok,
      youtube: userData.youtube,
      zalo: userData.zalo,
      description: userData.description,
    });
    if (response.data && response.data.code === 0) {
      setLoading(false);
    } else {
      setLoading(false);
      setErrMessage(true);
    }
    }
    
  };

  function functionBirthDate(ngaySinhStr) {
    if (ngaySinhStr) {
      var parts = ngaySinhStr.split('/');
    var ngaySinh = new Date(parts[2], parts[1] - 1, parts[0]);
    var ngayHienTai = new Date();
    var tuoi = ngayHienTai.getFullYear() - ngaySinh.getFullYear();

    // Kiểm tra nếu chưa qua ngày sinh trong năm hiện tại
    if (
      ngayHienTai.getMonth() < ngaySinh.getMonth() ||
      (ngayHienTai.getMonth() === ngaySinh.getMonth() &&
        ngayHienTai.getDate() < ngaySinh.getDate())
    ) {
      tuoi--;
    }
    }
    else {
      return;
    }

    return tuoi;
  }
      const loginChecking = useSelector(state => state.auth.login);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          {userData?.avatar === null ? <Image
  source={{uri : userData.avatar}}
 style={styles.imageUser}
 alt=""

/> : <Image
  source={avatarNull}
              style={styles.imageUser}
alt=""
/>}
          <View style={styles.infoSimpleContainer}>
            <Text style={styles.nameAgeText}>
              {userData ? `${userData.name} ${functionBirthDate(userData.birthday) === undefined ? '' : `, ${functionBirthDate(userData.birthday)}`}` : 'Không có dữ liệu'}
            </Text>
            <Text style={styles.statusInfo}>Sửa hồ sơ</Text>
          </View>
          {/* <View style={styles.infoSimpleIcon}>
          <Entypo name="chevron-thin-right" size={20} color="rgb(78, 78, 80)" />
        </View> */}
        </View>
        <View style={styles.allStatusContainer}>
          {/* <CircularProgress
            value={85}
            // inActiveStrokeColor={'gray'}
            // inActiveStrokeOpacity={0.2}
            progressValueColor={'#fff'}
            valueSuffix={'%'}
            radius={30}
            // activeStrokeColor={'rgb(254, 128, 69)'}
          /> */}
          <View style={styles.allStatusTextContainer}>
            <Text style={styles.allStatusTextTitle}>Điểm hồ sơ của bạn</Text>
            <Text style={styles.allStatusTextDescription}>
              Hoàn thành hồ sơ để tạo độ uy tín
            </Text>
          </View>
                      <Text style={[styles.allStatusTextTitle,{paddingRight: 20,    fontSize: 30}]}>
              85
            </Text>
          
        </View>

        <View style={{paddingVertical: 10}}>
          <HomeContentSecond />
        </View>
        <View
          style={{
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Feather name="user" size={20} color="black" />
          <Text style={styles.titleFirst}>Cá nhân</Text>
        </View>

        <View
          style={[
            styles.infoContainerBottom,
            {borderTopLeftRadius: 10, borderTopRightRadius: 10},
          ]}>
          <FontAwesome
            name="picture-o"
            size={isSmallScreen ? 15 : 20}
            color="black"
            style={{width: 25}}
          />

          <TouchableOpacity style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Đổi ảnh đại diện</Text>
          </TouchableOpacity>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={isSmallScreen ? 15 : 18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.infoContainerBottom]}
          onPress={() => {
            Vibration.vibrate(50);
            setModalChangingName(true);
          }}>
          <AntDesign name="tags" size={isSmallScreen ? 20 : 25} color="black" style={{width: 25}} />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Sửa tên</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={isSmallScreen ? 15 : 18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.infoContainerBottom]}
          onPress={() => {
            Vibration.vibrate(50);
            setModalChangingDescription(true);
          }}>
          <MaterialIcons
            name="description"
            size={isSmallScreen ? 20 : 25}
            color="black"
            style={{width: 25}}
          />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Sửa mô tả</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={isSmallScreen ? 15 : 18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.infoContainerBottom]}
          onPress={() => {
            Vibration.vibrate(50);
            setModalChangingDate(true);
          }}>
          <Ionicons
            name="balloon"
            size={20}
            color="black"
            style={{width: 25}}
          />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Sửa ngày sinh</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={isSmallScreen ? 15 : 18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.infoContainerBottom]}
          onPress={() => {
            Vibration.vibrate(50);
            setModalChangingAddress(true);
          }}>
          <Entypo name="address" size={20} color="black" style={{width: 25}} />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Sửa địa chỉ cá nhân</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={isSmallScreen ? 15 : 18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.infoContainerBottom]}
          onPress={() => {
            Vibration.vibrate(50);
            setModalChangingFacebook(true);
          }}>
          <FontAwesome
            name="facebook-square"
            size={isSmallScreen ? 20 : 25}
            color="black"
            style={{width: 25}}
          />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Chèn link Facebook</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={isSmallScreen ? 15 : 18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.infoContainerBottom]}
          onPress={() => setModalChangingYoutube(true)}>
          <Entypo name="youtube" size={isSmallScreen ? 20 : 25} color="black" style={{width: 25}} />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Chèn link Youtube</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={isSmallScreen ? 15 : 18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.infoContainerBottom]}
          onPress={() => setModalChangingTiktok(true)}>
          <MaterialIcons
            name="tiktok"
            size={isSmallScreen ? 20 : 25}
            color="black"
            style={{width: 25}}
          />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Chèn link Tiktok</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={isSmallScreen ? 15 : 18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.infoContainerBottom,
            {borderBottomLeftRadius: 10, borderBottomRightRadius: 10},
          ]}>
          <FontAwesome6 name="coins" size={20} color="black" />

          <View style={styles.infoSimpleContainer}>
            <Text style={styles.actionText}>Xu</Text>
          </View>
          <View style={styles.infoSimpleIcon}>
            <Entypo
              name="chevron-thin-right"
              size={isSmallScreen ? 15 : 18}
              color="rgb(78, 78, 80)"
            />
          </View>
        </TouchableOpacity>
      </View>

      {
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalChangingName}
          onRequestClose={() => {
            setModalChangingName(false);
          }}>
          <View style={styles.centeredView}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="rgba(0,0,0,0.2)"
            />
            <View style={styles.centeredViewModal}>
              <TouchableOpacity
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '15%',
                  left: '8%',
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalChangingName(false);
                  setLoading(false);
                  setErrMessage(false);
                }}>
                <FontAwesome6 name="xmark" size={17} color="rgb(25, 26, 46)" />
              </TouchableOpacity>
              <Text style={styles.centeredViewModalTitle}>Sửa tên của bạn</Text>
              <TextInput
                style={styles.inputModal}
                onChangeText={text => {
                  setInputNameChanging(text);
                }}
                // value={number}
                placeholder="Nhập tên của bạn"
              />
              {errMessage && (
                <Text style={{color: 'red', paddingTop: 10}}>
                  Trường thông tin thiếu hoặc có lỗi trong quá trình xử lí
                </Text>
              )}
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => handleChangingName()}>
                <Text style={styles.buttonModalText}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalChangingYoutube}
        onRequestClose={() => {
          setModalChangingYoutube(false);
        }}>
        <View style={styles.centeredView}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.2)"
          />
          <View style={styles.centeredViewModal}>
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'white',
                position: 'absolute',
                top: '15%',
                left: '8%',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setModalChangingYoutube(false);
                setLoading(false);
                setErrMessage(false);
              }}>
              <FontAwesome6 name="xmark" size={17} color="rgb(25, 26, 46)" />
            </TouchableOpacity>
            <Text style={styles.centeredViewModalTitle}>
              Sửa link Youtube của bạn
            </Text>
            <TextInput
              style={styles.inputModal}
              onChangeText={text => {
                setInputNameYoutube(text);
              }} // value={number}
              placeholder="Nhập link Youtube của bạn"
            />
            {errMessage && (
              <Text style={{color: 'red', paddingTop: 10}}>
                Trường thông tin thiếu hoặc có lỗi trong quá trình xử lí, hãy thử lại
              </Text>
            )}

            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => handleChangingYoutube()}>
              <Text style={styles.buttonModalText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalChangingAddress}
        onRequestClose={() => {
          setModalChangingAddress(false);
        }}>
        <View style={styles.centeredView}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.2)"
          />
          <View style={styles.centeredViewModal}>
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'white',
                position: 'absolute',
                top: '15%',
                left: '8%',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setModalChangingAddress(false);
                setLoading(false);
                setErrMessage(false);
              }}>
              <FontAwesome6 name="xmark" size={17} color="rgb(25, 26, 46)" />
            </TouchableOpacity>
            <Text style={styles.centeredViewModalTitle}>
              Sửa địa chỉ của bạn
            </Text>
            <TextInput
              style={styles.inputModal}
              onChangeText={text => {
                setInputNameAddress(text);
              }}
              // value={number}
              placeholder="Nhập địa chỉ của bạn"
            />
            {errMessage && (
              <Text style={{color: 'red', paddingTop: 10}}>
                Trường thông tin thiếu hoặc có lỗi trong quá trình xử lí, hãy thử lại
              </Text>
            )}

            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => handleChangingAddress()}>
              <Text style={styles.buttonModalText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalChangingDate}
        onRequestClose={() => {
          setModalChangingDate(false);
        }}>
        <View style={styles.centeredView}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.2)"
          />
          <View
            style={[
              styles.centeredViewModal,
              {backgroundColor: 'rgb(37, 41, 109)', height: heightDimension * 0.4},
            ]}>
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'black',
                position: 'absolute',
                top: '12%',
                left: '8%',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setErrMessage(false);
                setLoading(false);
                setModalChangingDate(false);
              }}>
              <FontAwesome6 name="xmark" size={17} color="white" />
            </TouchableOpacity>
            <Text
              style={[
                styles.centeredViewModalTitle,
                {color: 'white', paddingBottom: 10},
              ]}>
              Sửa ngày sinh của bạn
            </Text>
            <DatePicker
            theme="light"
            dividerColor="rgb(37, 41, 109)"
              date={inputNameDate}
              onDateChange={setInputNameDate}
              mode="date"
            />
            {errMessage && (
              <Text style={{color: 'red', paddingTop: 10}}>
                Trường thông tin thiếu hoặc có lỗi trong quá trình xử lí, hãy thử lại
              </Text>
            )}

            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => handleChangingDate()}>
              <Text style={styles.buttonModalText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalChangingDescription}
        onRequestClose={() => {
          setModalChangingDescription(false);
        }}>
        <View style={styles.centeredView}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.2)"
          />
          <View style={styles.centeredViewModal}>
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'white',
                position: 'absolute',
                top: '15%',
                left: '8%',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setModalChangingDescription(false);
                setLoading(false);
                setErrMessage(false);
              }}>
              <FontAwesome6 name="xmark" size={17} color="rgb(25, 26, 46)" />
            </TouchableOpacity>
            <Text style={styles.centeredViewModalTitle}>
              Sửa tiểu sử của bạn
            </Text>
            <TextInput
              style={styles.inputModal}
              onChangeText={text => {
                setInputNameDescription(text);
              }}
              // value={number}
              placeholder="Nhập tiểu sử của bạn"
            />
            {errMessage && (
              <Text style={{color: 'red', paddingTop: 10}}>
                Trường thông tin thiếu hoặc có lỗi trong quá trình xử lí, hãy thử lại
              </Text>
            )}

            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => handleChangingDescription()}>
              <Text style={styles.buttonModalText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalChangingFacebook}
        onRequestClose={() => {
          setModalChangingFacebook(false);
        }}>
        <View style={styles.centeredView}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.2)"
          />
          <View style={styles.centeredViewModal}>
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'white',
                position: 'absolute',
                top: '15%',
                left: '8%',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setLoading(false);
                setErrMessage(false);
                setModalChangingFacebook(false);
              }}>
              <FontAwesome6 name="xmark" size={17} color="rgb(25, 26, 46)" />
            </TouchableOpacity>
            <Text style={styles.centeredViewModalTitle}>
              Sửa link Facebook của bạn
            </Text>
            <TextInput
              style={styles.inputModal}
              onChangeText={text => {
                setInputNameFacebook(text);
              }}
              // value={number}
              placeholder="Nhập link Facebook của bạn"
            />
            {errMessage && (
              <Text style={{color: 'red', paddingTop: 10}}>
                Trường thông tin thiếu hoặc có lỗi trong quá trình xử lí, hãy thử lại
              </Text>
            )}

            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => handleChangingFacebook()}>
              <Text style={styles.buttonModalText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalChangingTiktok}
        onRequestClose={() => {
          setModalChangingTiktok(false);
        }}>
        <View style={styles.centeredView}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.2)"
          />
          <View style={styles.centeredViewModal}>
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'white',
                position: 'absolute',
                top: '15%',
                left: '8%',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setModalChangingTiktok(false);
                setLoading(false);
                setErrMessage(false);
              }}>
              <FontAwesome6 name="xmark" size={17} color="rgb(25, 26, 46)" />
            </TouchableOpacity>
            <Text style={styles.centeredViewModalTitle}>
              Sửa link Tiktok của bạn
            </Text>
            <TextInput
              style={styles.inputModal}
              onChangeText={text => {
                setInputNameTiktok(text);
              }}
              // value={number}
              placeholder="Nhập link Tiktok của bạn"
            />
            {errMessage && (
              <Text style={{color: 'red', paddingTop: 10}}>
                Trường thông tin thiếu hoặc có lỗi trong quá trình xử lí, hãy thử lại
              </Text>
            )}

            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => handleChangingTiktok()}>
              <Text style={styles.buttonModalText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PersonalContent;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
  },
  contentContainer: {
    zIndex: 2000,
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 35,
    flex: 1,
  },
  titleFirst: {
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  infoContainer: {
    width: '100%',
    paddingVertical: 10,
    marginVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  infoContainerBottom: {
    width: '100%',
    paddingVertical: 10,
    marginVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  actionTextDescription: {
    color: 'rgb(78, 78, 80)',
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
  buttonModal: {
    paddingVertical: 15,
    width: '100%',
    backgroundColor: 'rgb(43, 112, 233)',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonModalText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
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
    backgroundColor: 'rgb(37, 41, 109)',
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
    width: isSmallScreen ? 60 : 90,
    height: isSmallScreen ? 60 : 90,
    
    borderRadius: 50,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'gray',
  },
  verifiedIconAssets: {
    width: 20,
    height: 20,
  },
  infoSimpleContainer: {
    paddingHorizontal: 20,
    flex: 10,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  nameAgeText: {
    color: 'black',
    fontSize: isSmallScreen ? 20 : 30,
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
    fontSize: isSmallScreen ? 15 : 20,
    paddingTop: 10,
    fontWeight: '500',
  },
  actionText: {
    fontSize: isSmallScreen ? 15 : 20,
    fontWeight: '400',
    color: 'black',
  },

  allStatusTextTitle: {
    color: 'white',
    fontSize: isSmallScreen ? 18 : 22,
    fontWeight: '500',
  },
  allStatusTextDescription: {
    color: 'white',
    fontSize: isSmallScreen ? 13 : 15,
    fontWeight: '300',
    paddingTop: 5,
  },
  allStatusTextDescriptionNow: {
    color: 'black',
    fontSize: 15,
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
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredViewModal: {
    width: '100%',
    height: heightDimension * 0.35,
    backgroundColor: 'rgb(25, 26, 46)',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '10%',
    paddingHorizontal: widthDimension * 0.07,
  },
  centeredViewModalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputModal: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    marginTop: '15%',
    borderRadius: 10,
  },
});
