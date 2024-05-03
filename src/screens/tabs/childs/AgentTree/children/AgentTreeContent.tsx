import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItemInfo,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ListItemAgentTree} from '../../CheckList/children/content/list-item/ListItemAgentTree';
import {
  getData,
  ListItemType,
} from '../../CheckList/children/content/list-item/GetData';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import TreeView from 'react-native-final-tree-view';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import QRCode from 'react-native-qrcode-svg';
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather'
import LoginSession from '../../../../../auth/required/LoginSession';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Animated, {FadeInUp,BounceIn,FadeInLeft} from 'react-native-reanimated';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375; 

function getIndicator(isExpanded: any, hasChildrenNodes: any) {
  if (!hasChildrenNodes) {
    return (
      <FontAwesome5
          name="user-alt"
          size={ isSmallScreen ? 15 : 18}
          color="white"
        />
    )
  } else if (isExpanded) {
    return (
      
        <FontAwesome6
          name="people-group"
                    size={ isSmallScreen ? 15 : 18}

          color="white"
        />
    );
  } else {
    return (
      <FontAwesome6
          name="people-group"
                    size={ isSmallScreen ? 15 : 18}

          color="white"
        />
    );
  }
}

const AgentTreeContent = () => {
  const network = useSelector(state => state.network.ipv4);
  const formWeb = useSelector(state => state.network.formWeb);
  const token = useSelector(state => state.auth.token);
  const userData = useSelector(state => state.user.user);
  const [data, setData] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const handleAddMemberDown = async () => {
    setLoading(true)
    const response = await axios.post(`${network}/addMemberDownAPI`, {
      token: token,
      id: userChoosing.id,
      name: inputNameNewDownLineFixing,
      phone: inputPhoneNewDownLineFixing,
      avatar: selectedImageFixing,
      address: inputAddressNewDownLineFixing,
      email: inputEmailNewDownLineFixing,
      birthday: convertDateToString(valueDateFixing),
      facebook: inputFacebookNewDownLineFixing,
      linkedin: inputLinkedinNewDownLineFixing,
      web: inputWebsiteNewDownLineFixing,
      instagram: inputInstagramNewDownLineFixing,
      zalo: inputZaloNewDownLineFixing,
      twitter: inputTwitterNewDownLineFixing,
      tiktok: inputTiktokNewDownLineFixing,
      youtube: inputYoutubeNewDownLineFixing,
      id_position: inputTitleNewDownLineFixing,
      password: inputPasswordNewDownLineFixing,
      description: inputDescriptionNewDownLineFixing,
      id_father: userChoosing.id_father,
    });
    if (response.data && response.data.code === 0) {
      const response2 = await axios.post(`${network}/getListMemberDownAPI`, {
        token: token,
      });
      if (response2.data && response2.data.code === 0) {
        setData(response2.data.listData);
        setDataAvailable(true);
        setLoading(false)
        setModalFixing(false)
        setModalDelete(false);
        Toast.show({
      type: 'success',
      text1: 'Sửa thông tin tuyến dưới thành công',
    });
      }
    } else {
      setLoading(false)
      Toast.show({
      type: 'error',
      text1: 'Sửa thông tin tuyến dưới thất bại,hãy thử lại',
    });
    }
  };
  const handleAddMember = async () => {
    const response = await axios.post(`${network}/addMemberDownAPI`, {
      token: token,
      id: userChoosing.id,
      name: inputNameNewDownLine,
      phone: inputPhoneNewDownLine,
      avatar: selectedImage,
      address: inputAddressNewDownLine,
      email: inputEmailNewDownLine,
      birthday: convertDateToString(valueDate),
      facebook: inputFacebookNewDownLine,
      linkedin: inputLinkedinNewDownLine,
      web: inputWebsiteNewDownLine,
      instagram: inputInstagramNewDownLine,
      zalo: inputZaloNewDownLine,
      twitter: inputTwitterNewDownLine,
      tiktok: inputTiktokNewDownLine,
      youtube: inputYoutubeNewDownLine,
      id_position: inputTitleNewDownLine,
      password: inputPasswordNewDownLine,
      description: inputDescriptionNewDownLine,
      id_father: userChoosing.id_father,
    });
    if (response.data && response.data.code === 0) {
      const response2 = await axios.post(`${network}/getListMemberDownAPI`, {
        token: token,
      });
      if (response2.data && response2.data.code === 0) {
        setData(response2.data.listData);
        setDataAvailable(true);
        setLoading(false)
        setModalFixing(false)
        setModalDelete(false);
        Toast.show({
      type: 'success',
      text1: 'Sửa thông tin tuyến dưới thành công',
    });
      }
    } else {
      setLoading(false)
      Toast.show({
      type: 'error',
      text1: 'Sửa thông tin tuyến dưới thất bại,hãy thử lại',
    });
  }
  };
  const convertDateToString = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFixing, setSelectedImageFixing] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };
  const openImagePickerFixing = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponseFixing);
  };
  const handleResponseFixing = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImageFixing(imageUri);
    }
  };
  const [dataPosition, setDataPosition] = useState([]);
  useEffect(() => {
    const getDataPosition = async () => {
      const response = await axios.post(`${network}/getListPositionAPI`, {
        id_system: userData.id_system,
      });
      if (response.data && response.data.length > 0) {
        setDataPosition(response.data);
      }
    };

    getDataPosition();
  }, []);
  const [modalLogin,setModalLogin] = useState(false)
  const [modalAddMemberDown, setModalAddMemberDown] = useState(false);
  const handleCloseModal = () => {
    setModalLogin(false);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${network}/getListMemberDownAPI`, {
        token: token,
      });
      if (response.data && response.data.code === 0) {
        setData(response.data.listData);
        setDataAvailable(true);
      }
      else {
        setModalLogin(true)
      }
    };
    getData();
  }, []);
  const handleLockMember = async () => {};
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  const [loading, setLoading] = useState(false);
  const [inputNameDate, setInputNameDate] = useState(new Date());
  const [inputNameNewDownLine, setinputNameNewDownLine] = useState('');
  const [inputPhoneNewDownLine, setinputPhoneNewDownLine] = useState('');
  const [inputEmailNewDownLine, setinputEmailNewDownLine] = useState('');
  const [inputAddressNewDownLine, setinputAddressNewDownLine] = useState('');
  const [inputPasswordNewDownLine, setinputPasswordNewDownLine] = useState('');
  const [inputFacebookNewDownLine, setinputFacebookNewDownLine] = useState('');
  const [inputTiktokNewDownLine, setinputTiktokNewDownLine] = useState('');
  const [inputWebsiteNewDownLine, setinputWebsiteNewDownLine] = useState('');
  const [inputLinkedinNewDownLine, setinputLinkedinNewDownLine] = useState('');
  const [inputInstagramNewDownLine, setinputInstagramNewDownLine] =
    useState('');
  const [inputYoutubeNewDownLine, setinputYoutubeNewDownLine] = useState('');
  const [inputZaloNewDownLine, setinputZaloNewDownLine] = useState('');
  const [inputTitleNewDownLine, setinputTitleNewDownLine] = useState('');
  const [inputTwitterNewDownLine, setinputTwitterNewDownLine] = useState('');
  const [inputNameDateFixing, setInputNameDateFixing] = useState('');
  const [
    inputDescriptionNewDownLineFixing,
    setinputDescriptionNewDownLineFixing,
  ] = useState('');
  const [inputTwitterNewDownLineFixing, setinputTwitterNewDownLineFixing] =
    useState('');
  const [inputNameNewDownLineFixing, setinputNameNewDownLineFixing] =
    useState('');
  const [inputPhoneNewDownLineFixing, setinputPhoneNewDownLineFixing] =
    useState('');
  const [inputEmailNewDownLineFixing, setinputEmailNewDownLineFixing] =
    useState('');
  const [inputAddressNewDownLineFixing, setinputAddressNewDownLineFixing] =
    useState('');
  const [inputPasswordNewDownLineFixing, setinputPasswordNewDownLineFixing] =
    useState('');
  const [inputFacebookNewDownLineFixing, setinputFacebookNewDownLineFixing] =
    useState('');
  const [inputTiktokNewDownLineFixing, setinputTiktokNewDownLineFixing] =
    useState('');
  const [inputWebsiteNewDownLineFixing, setinputWebsiteNewDownLineFixing] =
    useState('');
  const [inputLinkedinNewDownLineFixing, setinputLinkedinNewDownLineFixing] =
    useState('');
  const [inputInstagramNewDownLineFixing, setinputInstagramNewDownLineFixing] =
    useState('');
  const [inputYoutubeNewDownLineFixing, setinputYoutubeNewDownLineFixing] =
    useState('');
  const [inputZaloNewDownLineFixing, setinputZaloNewDownLineFixing] =
    useState('');
  const [inputTitleNewDownLineFixing, setinputTitleNewDownLineFixing] =
    useState('');
  function parseDateStringToDate(dateString: any) {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Lưu ý: Tháng trong JavaScript là từ 0 đến 11, vì vậy trừ đi 1
    const year = parseInt(parts[2], 10);

    // Kiểm tra tính hợp lệ của các giá trị
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      console.error('Invalid date format:', dateString);
      return null;
    }

    // Kiểm tra giá trị năm
    if (year < 0 || (year > 99 && year < 1900)) {
      console.error('Invalid year:', year);
      return null;
    }

    // Kiểm tra giá trị tháng
    if (month < 0 || month > 11) {
      console.error('Invalid month:', month + 1);
      return null;
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      console.error('Invalid day:', day);
      return null;
    }

    const date = new Date(year, month, day);

    return date;
  }
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    const initialExpandedItems = data.reduce((acc, item) => {
      if (item.title === 'Công việc hôm nay') {
        acc[item.title] = true;
      } else {
        acc[item.title] = false;
      }
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedItems(initialExpandedItems);
  }, []);
  const renderItem = ({item}: ListRenderItemInfo<ListItemType>) => {
    const expanded = expandedItems[item.title];
    return <ListItemAgentTree item={item} initialExpanded={expanded} />;
  };
  const [modalDelete, setModalDelete] = useState(false);
  const [userChoosing, setUserChoosing] = useState([]);
  const handleDontCare = () => {
    setModalDelete(false);
  };
  function convertTimestampToDate(timestamp: any) {
    // Create a new Date object from the Unix timestamp (multiplied by 1000 to convert from seconds to milliseconds)
    const date = new Date(timestamp * 1000);

    // Get individual components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed, and pad with leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Pad with leading zero if needed
    const hours = String(date.getHours()).padStart(2, '0'); // Pad with leading zero if needed
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Pad with leading zero if needed
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Pad with leading zero if needed

    // Return the formatted date string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const handleChoosingUser = async (id: any, item: any) => {
    const response = await axios.post(`${network}/getInfoMemberAPI`, {
      id: id,
    });
    if (response.data && response.data.code === 0) {
      setUserChoosing(response.data.data);
      setModalDelete(true);
    }
  };
  const dataTitle = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  const [modalFixing, setModalFixing] = useState(false);
  const [openModalDate, setOpenModalDate] = useState(false);
  const [valueDateFixing, setValueDateFixing] = useState(new Date());
  return (
    <>
      <LoginSession visible={modalLogin} onCloseModal={handleCloseModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFixing}
        onRequestClose={() => {
          setModalFixing(false);
        }}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalViewScrollView}>
            <Text
              style={{
                fontSize: isSmallScreen ? 15 : 18,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 10,
                textAlign: 'center',
                paddingBottom: 10,
              }}>
              Sửa thông tin
            </Text>

            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Họ tên:</Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputNameNewDownLineFixing(text)}
              value={inputNameNewDownLineFixing}
              placeholder="Họ tên tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Chức danh:
              </Text>{' '}
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataPosition}
              search
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder={!isFocus ? 'Chọn chức danh' : '...'}
              searchPlaceholder="Tìm kiếm ..."
              value={inputTitleNewDownLineFixing}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setinputTitleNewDownLineFixing(item.id);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Điện thoại:
              </Text>
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputPhoneNewDownLineFixing(text)}
              value={inputPhoneNewDownLineFixing}
              placeholder="Số điện thoại tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Email:</Text>{' '}
            </Text>

            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputEmailNewDownLineFixing(text)}
              value={inputEmailNewDownLineFixing}
              placeholder="Email tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Địa chỉ:</Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputAddressNewDownLineFixing(text)}
              value={inputAddressNewDownLineFixing}
              placeholder="Địa chỉ tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Mô tả bản thân:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputDescriptionNewDownLineFixing(text)}
              placeholder="Mô tả bản thân"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Mật khẩu tài khoản:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              secureTextEntry
              onChangeText={text => setinputPasswordNewDownLineFixing(text)}
              placeholder="Mật khẩu tuyến dưới"
              placeholderTextColor="gray"
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}>
              <View style={{width: '48%'}}>
                <Text
                  style={{
                    fontSize: 18,

                    textAlign: 'left',
                    paddingBottom: 10,
                    color: 'black',
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Ngày sinh:
                  </Text>{' '}
                </Text>
                {/* <DatePicker
                  date={inputNameDateFixing}
                  onDateChange={setInputNameDateFixing}
                  mode="date"
                  style={{height: 120, width: 170}}
                /> */}
                {/* <TextInput
                  style={styles.inputNameChanging}
                  value={inputNameDateFixing}
                  onChangeText={setInputNameDateFixing}
                  placeholder="Ngày sinh tuyến dưới"
                  placeholderTextColor="gray"
                /> */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {valueDateFixing.toString() !== new Date().toString() ? (
                    <Text style={{color: 'black', fontSize: 20}}>
                      {convertDateToString(valueDateFixing)}
                    </Text>
                  ) : (
                    <Text style={{color: 'black', fontSize: 20}}>
                      {inputNameDateFixing}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={{
                      marginLeft: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                      backgroundColor: 'rgb(37, 41, 109)',
                      borderRadius: 5,
                    }}
                    onPress={() => setOpenModalDate(true)}>
                    <Text style={{color: 'white', fontSize: 17}}>Đổi</Text>
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  open={openModalDate}
                  date={valueDateFixing}
                  onConfirm={date => {
                    setOpenModalDate(false);
                    setValueDateFixing(date);
                  }}
                  mode="date"
                  onCancel={() => {
                    setOpenModalDate(false);
                  }}
                  style={{color:'black'}}
                />
              </View>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontSize: 18,

                    textAlign: 'left',
                    paddingBottom: 10,
                    color: 'black',
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Hình đại diện:
                  </Text>{' '}
                </Text>
                {selectedImageFixing ? (
                  <TouchableOpacity onPress={() => openImagePickerFixing()}>
                    <Image
                      source={{uri: selectedImageFixing}}
                      style={{width: '100%', height: 60}}
                      resizeMode="contain" alt="" 
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => openImagePickerFixing()}>
                    <Image
                      source={{uri: userChoosing.avatar}}
                      style={{width: '100%', height: 60}}
                      resizeMode="contain" alt=""
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Facebook:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputFacebookNewDownLineFixing(text)}
              value={inputFacebookNewDownLineFixing}
              placeholder="Trang Facebook tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Linkedin:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputLinkedinNewDownLineFixing(text)}
              value={inputLinkedinNewDownLineFixing}
              placeholder="Trang Linkedin tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Twitter:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputTwitterNewDownLineFixing(text)}
              value={inputTwitterNewDownLineFixing}
              placeholder="Trang Twitter tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Website:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputWebsiteNewDownLineFixing(text)}
              value={inputWebsiteNewDownLineFixing}
              placeholder="Trang Website tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Kênh Tiktok:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputTiktokNewDownLineFixing(text)}
              value={inputTiktokNewDownLineFixing}
              placeholder="Trang Tiktok tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Instagram:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputInstagramNewDownLineFixing(text)}
              value={inputInstagramNewDownLineFixing}
              placeholder="Trang Instagram tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Kênh Youtube:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputYoutubeNewDownLineFixing(text)}
              value={inputYoutubeNewDownLineFixing}
              placeholder="Trang Youtube tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Zalo:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputZaloNewDownLineFixing(text)}
              value={inputZaloNewDownLineFixing}
              placeholder="Trang Zalo tuyến dưới"
              placeholderTextColor="gray"
            />
          </ScrollView>
          <View
            style={[
              styles.buttonModalContainer,
              {
                paddingHorizontal: 20,
                paddingVertical: 20,
                position: 'absolute',
                bottom: 0,
                height: 100,
                backgroundColor: 'white',
              },
            ]}>
            <TouchableOpacity
              style={{
                width: '33%',
                paddingVertical: 15,
                backgroundColor: 'rgb(230, 56, 26)',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setModalFixing(false)}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                Hủy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '60%',
                paddingVertical: 15,
                backgroundColor: 'rgb(37, 41, 109)',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                paddingHorizontal: 5,
              }}
              onPress={() => {
                handleAddMemberDown();
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={{alignSelf: 'center'}}
                  />
                ) : (
                  'Sửa tuyến dưới'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAddMemberDown}
        onRequestClose={() => {
          setModalAddMemberDown(false);
        }}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

        <View style={styles.centeredView}>
          
          <ScrollView style={styles.modalViewScrollView}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 10,
                textAlign: 'center',
                paddingBottom: 10,
              }}>
              Tạo mới tuyến dưới
            </Text>

            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Họ tên:</Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputNameNewDownLine(text)}
              placeholder="Họ tên tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Chức danh:
              </Text>{' '}
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataPosition}
              search
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder={!isFocus ? 'Chọn chức danh' : '...'}
              searchPlaceholder="Tìm kiếm ..."
              value={inputTitleNewDownLine}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setinputTitleNewDownLine(item.id);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Điện thoại:
              </Text>
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputPhoneNewDownLine(text)}
              placeholder="Số điện thoại tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Email:</Text>{' '}
            </Text>

            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputEmailNewDownLine(text)}
              placeholder="Email tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Địa chỉ:</Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputAddressNewDownLine(text)}
              placeholder="Địa chỉ tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Mật khẩu tài khoản:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              secureTextEntry
              onChangeText={text => setinputPasswordNewDownLine(text)}
              placeholder="Mật khẩu tuyến dưới"
              placeholderTextColor="gray"
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}>
              <View style={{width: '40%'}}>
                <Text
                  style={{
                    fontSize: 18,

                    textAlign: 'left',
                    paddingBottom: 10,
                    color: 'black',
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Ngày sinh:
                  </Text>{' '}
                </Text>
                <DatePicker
                  date={inputNameDate}
                  onDateChange={setInputNameDate}
                  mode="date"
                  style={{height: 120, width: 170}}
                />
              </View>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontSize: 18,

                    textAlign: 'left',
                    paddingBottom: 10,
                    color: 'black',
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Hình đại diện:
                  </Text>{' '}
                </Text>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    style={{flex: 1}}
                    resizeMode="contain" alt=""
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => openImagePicker()}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 5,
                      backgroundColor: 'rgb(37, 41, 109)',
                      borderRadius: 5,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Chọn ảnh đại diện
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Facebook:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputFacebookNewDownLine(text)}
              placeholder="Trang Facebook tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Linkedin:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputLinkedinNewDownLine(text)}
              placeholder="Trang Linkedin tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Twitter:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputTwitterNewDownLine(text)}
              placeholder="Trang Twitter tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Website:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputWebsiteNewDownLine(text)}
              placeholder="Trang Website tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Kênh Tiktok:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputTiktokNewDownLine(text)}
              placeholder="Trang Tiktok tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Instagram:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputInstagramNewDownLine(text)}
              placeholder="Trang Instagram tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Kênh Youtube:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputYoutubeNewDownLine(text)}
              placeholder="Trang Youtube tuyến dưới"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Trang Zalo:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputZaloNewDownLine(text)}
              placeholder="Trang Zalo tuyến dưới"
              placeholderTextColor="gray"
            />
          </ScrollView>
          <View
            style={[
              styles.buttonModalContainer,
              {
                paddingHorizontal: 20,
                paddingVertical: 20,
                position: 'absolute',
                bottom: 0,
                height: 100,
                backgroundColor: 'white',
              },
            ]}>
            <TouchableOpacity
              style={{
                width: '33%',
                paddingVertical: 15,
                backgroundColor: 'rgb(230, 56, 26)',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setModalAddMemberDown(false)}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                Hủy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '60%',
                paddingVertical: 15,
                backgroundColor: 'rgb(37, 41, 109)',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                paddingHorizontal: 5,
              }}
              onPress={() => {
                handleAddMember()
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={{alignSelf: 'center'}}
                  />
                ) : (
                  'Thêm tuyến dưới'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
                    <Feather name="x" size={25} style={{position: 'absolute', top: 10, right: 10}} color="rgb(86, 86, 90)" onPress={() => setModalDelete(false)}/>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: userChoosing.avatar}}
                style={[styles.modalIcon, {marginRight: 10}]} alt=""
              />
              <QRCode
                value={`${formWeb}/info/?id=${userChoosing.id}`}
                logoSize={30}
                logoBackgroundColor="transparent"
                style={styles.modalIcon}
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 10,
                textAlign: 'center',
              }}>
              Thông tin tài khoản
            </Text>
            <Text
              style={{
                fontSize: isSmallScreen ? 15 : 18,
                paddingTop: 10,
                textAlign: 'left',
                paddingBottom: 5,
                color: 'black',
                paddingLeft: '5%',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>id:</Text>{' '}
              {userChoosing.id}
            </Text>
            <Text
              style={{
                                fontSize: isSmallScreen ? 15 : 18,


                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
                paddingLeft: '5%',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Họ tên:</Text>{' '}
              {userChoosing.name}
            </Text>
            <Text
              style={{
                                fontSize: isSmallScreen ? 15 : 18,


                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
                paddingLeft: '5%',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Chức danh:
              </Text>{' '}
              {userChoosing.id}
            </Text>
            <Text
              style={{
                                fontSize: isSmallScreen ? 15 : 18,


                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
                paddingLeft: '5%',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Điện thoại:
              </Text>{' '}
              {userChoosing.phone}
            </Text>
            <Text
              style={{
                                fontSize: isSmallScreen ? 15 : 18,


                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
                paddingLeft: '5%',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Email:</Text>{' '}
              {userChoosing.email}
            </Text>

            <Text
              style={{
                                fontSize: isSmallScreen ? 15 : 18,


                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
                paddingLeft: '5%',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Ngày tạo:
              </Text>{' '}
              {convertTimestampToDate(userChoosing.created_at)}
            </Text>
            <Text
              style={{
                                fontSize: isSmallScreen ? 15 : 18,


                textAlign: 'left',
                paddingBottom: 10,
                color: 'black',
                paddingLeft: '5%',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Địa chỉ:</Text>{' '}
              {userChoosing.address}
            </Text>
            <Text
              style={{
                                fontSize: isSmallScreen ? 15 : 18,


                textAlign: 'left',
                paddingBottom: 20,
                color: userChoosing.status === 'active' ? 'green' : 'red',
                paddingLeft: '5%',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Xác thực:
              </Text>{' '}
              {userChoosing.status === 'active'
                ? 'Đã xác thực'
                : 'Chưa xác thực'}
            </Text>
            <View style={[styles.buttonModalContainer]}>
              <TouchableOpacity
                style={{
                  width: '33%',
                  paddingVertical: 15,
                  backgroundColor: 'rgb(230, 56, 26)',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
                }}>
                <Text
                  style={{fontSize: isSmallScreen ? 11 : 18, fontWeight: 'bold', color: 'white'}}>
                  Khóa tài khoản
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '33%',
                  paddingVertical: 15,
                  backgroundColor: 'rgb(230, 56, 26)',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}
                onPress={() => {
                  // let filteredUsers = dataPosition.filter((user:any) => {
                  //     return user.id === userChoosing.id_position
                  // });
                  setinputAddressNewDownLineFixing(userChoosing.address);
                  setinputEmailNewDownLineFixing(userChoosing.email);
                  setinputFacebookNewDownLineFixing(userChoosing.facebook);
                  setinputInstagramNewDownLineFixing(userChoosing.instagram);
                  setinputZaloNewDownLineFixing(userChoosing.zalo);
                  setinputNameNewDownLineFixing(userChoosing.name);
                  setinputLinkedinNewDownLineFixing(userChoosing.linkedin);
                  setinputWebsiteNewDownLineFixing(userChoosing.web);
                  setinputPhoneNewDownLineFixing(userChoosing.phone);
                  setinputTitleNewDownLineFixing(userChoosing.id_position);
                  setInputNameDateFixing(userChoosing.birthday);
                  setinputDescriptionNewDownLineFixing(
                    userChoosing.description,
                  );
                  setModalFixing(true);
                }}>
                <Text
                  style={{fontSize: isSmallScreen ? 11 : 18, fontWeight: 'bold', color: 'white'}}>
                  Sửa thông tin
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '33%',
                  paddingVertical: 15,
                  backgroundColor: 'rgb(37, 41, 109)',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                  paddingHorizontal: 5,
                }}
                onPress={() => setModalAddMemberDown(true)}>
                <Text
                  style={{fontSize: isSmallScreen ? 11 : 18, fontWeight: 'bold', color: 'white'}}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={{alignSelf: 'center'}}
                    />
                  ) : (
                    'Thêm tuyến dưới'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
        {/* {dataAvailable && (
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item.title}${index}`}
          renderItem={renderItem}
        />
      )} */}
              <Text style={styles.textTitle}>Quản lý tuyến dưới</Text>

      {data.length > 0 ? <TreeView
          data={data} // defined above
          childrenKey="agentSystem"
          renderNode={({node, level, isExpanded, hasChildrenNodes}) => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center',width: `calc(100% - ${25 * level}px)`,marginLeft:25 * level,paddingVertical: 10,marginTop: 5,borderRadius:10,backgroundColor:'rgb(37, 41, 109)',paddingHorizontal: 10}}>
                <Text
                  style={{
                    marginLeft: 15 * level,
                    
                  }}>
                  {getIndicator(isExpanded, hasChildrenNodes)}
                </Text>
                <TouchableOpacity
                  style={{marginLeft: 10, padding: 5}}
                  onPress={() => handleChoosingUser(node.id, node)}>
                  <Text style={{color: 'black', fontSize:  isSmallScreen ? 13 : 18,color:'white',fontWeight:'600'}}>
                    {node.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        /> : 
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginLeft={10}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center"
                 >
                  <SkeletonPlaceholder.Item
                    width={500}
                    height={50}
                    borderRadius={10}
                  />
                  
                </SkeletonPlaceholder.Item>
                
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center"
                 >
                  <SkeletonPlaceholder.Item
                    width={300}
                    height={50}
                    borderRadius={10}
                  />
                  
                </SkeletonPlaceholder.Item><SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center"
                 >
                  <SkeletonPlaceholder.Item
                    width={300}
                    height={50}
                    borderRadius={10}
                  />
                  
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          }
      </ScrollView>
    </>
  );
};

export default AgentTreeContent;

const styles = StyleSheet.create({
  modalIcon: {
    height: 100,
    width: 100,
    borderColor: 'gray',
    borderWidth: 0.5,
    resizeMode: 'contain',
  },
  container: {
    flex: 7,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginBottom: heightDimension *0.05
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: widthDimension * 0.95,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textTitle: {
    color: 'black',
    fontWeight: '700',
    fontSize:                 isSmallScreen ? 15 :21,
    marginVertical: 10,
  },
  modalViewScrollView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: widthDimension,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: '#000',
    marginBottom: '28%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  buttonModalContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputNameChanging: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 17,
  },

  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
