import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Button,
  Linking,
} from 'react-native';
import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UPDATE_LOGOUT_REQUIRED} from '../../../../../../../slices/auth/authSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {CheckBox, Layout, Text as KittenText} from '@ui-kitten/components';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import LoginSession from '../../../../../../auth/required/LoginSession';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Clipboard from '@react-native-clipboard/clipboard';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {FadeInUp,BounceIn,FadeInLeft} from 'react-native-reanimated';


const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;
const { width } = Dimensions.get('window');
const isSmallScreen = width < 375; 
const dataActionCaring = [
  {label: 'Gọi điện', id: 'call'},
  {label: 'Nhắn tin', id: 'message'},
  {label: 'Đi gặp', id: 'go_meet'},
  {label: 'Họp online', id: 'online_meeting'},
  {label: 'Khác', id: 'other'},
];

const OrderManagement = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const bottomSheetCustomerGroupRef = useRef(null);
  const bottomSheetHistoryRef = useRef(null);
  const [textAddGroup, setTextAddGroup] = useState('');
  const bottomSheetHistoryPress = useCallback(customer => {
    setDataHistoryMore(customer);
    setModalHistoryChoosing(false);
    bottomSheetHistoryRef.current?.present();
  }, []);
  const copyToClipboard = () => {
    Clipboard.setString(`KHÁCH HÀNG	: ${dataHistoryMore}\nworld`);
  };
  const [loadingAddGroup, setLoadingAddGroup] = useState(false);
  const handleAddGroupCustomer = async () => {
    setLoadingAddGroup(true);
    const response = await axios.post(`${network}/addGroupCustomerAPI`, {
      token: token,
      name: textAddGroup,
    });
    if (response.data && response.data.code === 0) {
      // setDataHistory(response.data.listData);
      // setModalHistoryChoosing(true);
      const newDataGroup = {
        description: '',
        id: response.data.id_group,
        image: '',
        keyword: '',
        name: textAddGroup,
        number_customer: 2,
        parent: 17,
        slug: 'qua-tang',
        status: null,
        type: 'group_customer',
        weighty: 0,
      };
      setLoadingAddGroup(false);
      setDataCustomerGroup([newDataGroup,...dataCustomerGroup]);
    } else {
      setLoadingAddGroup(false);
    }
  };
  const fetchCopiedText = async () => {
    const dataCopied = `${dataHistoryMore}`;
    const text = await Clipboard.getString();
  };
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentCustomerGroupPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
    bottomSheetCustomerGroupRef.current?.present();
  }, []);
  const handleSheetHistoryClosing = useCallback(() => {
    setModalHistoryChoosing(true);
  }, []);
  const handleSheetChanges = useCallback(index => {
  }, []);
  const snapPoints = useMemo(() => ['25%', '30%'], []);
  const snapPointsCustomerGroup = useMemo(() => ['40%', '50%'], []);

  const openApp = async appUrl => {
    if (appUrl !== '') {
      bottomSheetModalRef.current?.close();

      Linking.openURL(appUrl);
    } else {
      bottomSheetModalRef.current?.close();
      Toast.show({
        type: 'error',
        text1: 'Người dùng này chưa có trang cá nhân',
      });
    }
  };
  const [dataHistory, setDataHistory] = useState([]);
  const handleHistoryChoosing = async customer => {
    setCustomerChoosing(customer);
    const response = await axios.post(
      `${network}/getListCustomerHistoriesAPI`,
      {
        token: token,
        limit: 20,
        page: 1,
        id_customer: customer.id,
      },
    );
    if (response.data && response.data.code === 0) {
      setDataHistory(response.data.listData);
      setModalHistoryChoosing(true);
    } else {
    }
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
  const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
  const [loading, setLoading] = useState(false);
  const loginChecking = useSelector(state => state.auth.login);
  const token = useSelector(state => state.auth.token);
  const network = useSelector(state => state.network.ipv4);
  const [dataCustomer, setDataCustomer] = useState([]);
  const [customerChoosing, setCustomerChoosing] = useState([]);
  const [errorData, setErrorData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleShowMenu = (event, item) => {
    const layout = event.nativeEvent.layout;

    setSelectedItem(item);

    // setMenuPosition({ x: layout.x, y: layout.y });

    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setSelectedItem(null);
    setMenuVisible(false);
  };
  const dataPosition = [
    {name: 'Nam', value: '1'},
    {name: 'Nữ', value: '2'},
  ];
  const [modalHistoryChoosing, setModalHistoryChoosing] = useState(false);
  const [dataCustomerGroup, setDataCustomerGroup] = useState([]);
  function formatDate(date, targetFormat = 'hh:mm dd/MM/yyyy') {
    const options = {
      hour12: targetFormat.includes('h'),
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    const formattedDate = date
      .toLocaleString('en-US', options)
      .replace(/\//g, '-');

    const [time, dateString] = formattedDate.split(', ');
    const formattedTime = time.replace(/\s/g, '');
    const formattedDateString = dateString.replace(/\//g, '/');

    return targetFormat
      .replace('hh:mm', formattedTime)
      .replace('dd/MM/yyyy', formattedDateString);
  }
  const handleAddCaring = async customer => {
    const response = await axios.post(`${network}/getInfoCustomerAPI`, {
      token: token,
      id_customer: customer.id,
    });
    if (response.data && response.data.code === 0) {
      setCustomerChoosing(response.data.infoCustomer);
      setModalVisible(true);
    }
  };
  const [errorCheckItem, setErrorCheckItem] = useState(false);
  const handleAddMemberGroup = async () => {
    if (checkedItems.length > 0) {
      setLoading(true);
      const response = await axios.post(`${network}/saveInfoCustomerAPI`, {
        token: token,
        id: dataCustomerMore.id,
        full_name: dataCustomerMore.full_name,
        phone: dataCustomerMore.full_name,
        address: dataCustomerMore.address,
        email: dataCustomerMore.email,
        facebook: dataCustomerMore.facebook,
        birthday_date: dataCustomerMore.birthday_date,
        birthday_month: dataCustomerMore.birthday_month,
        birthday_year: dataCustomerMore.birthday_year,
        id_group: checkedItems.join(','),
        clear_group: true,
      });
      if (response.data && response.data.code === 0) {
        const response2 = await axios.post(`${network}/getListCustomerAPI`, {
          token: token,
          limit: 30,
          page: 1,
        });
        if (response2.data && response2.data.code === 0) {
          setDataCustomer(response2.data.listData);
          setLoading(false);
          setModalFixingChanging(false);
          bottomSheetCustomerGroupRef.current?.close();

          Toast.show({
            type: 'success',
            text1: 'Sửa thông tin khách hàng thành công',
          });
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } else {
      setLoading(true);
      const response = await axios.post(`${network}/saveInfoCustomerAPI`, {
        token: token,
        id: dataCustomerMore.id,
        full_name: dataCustomerMore.full_name,
        phone: dataCustomerMore.full_name,
        address: dataCustomerMore.address,
        email: dataCustomerMore.email,
        facebook: dataCustomerMore.facebook,
        birthday_date: dataCustomerMore.birthday_date,
        birthday_month: dataCustomerMore.birthday_month,
        birthday_year: dataCustomerMore.birthday_year,
        id_group: '',
      });
      if (response.data && response.data.code === 0) {
        const response2 = await axios.post(`${network}/getListCustomerAPI`, {
          token: token,
          limit: 30,
          page: 1,
        });
        if (response2.data && response2.data.code === 0) {
          setDataCustomer(response2.data.listData);
          setLoading(false);
          setModalFixingChanging(false);
          bottomSheetCustomerGroupRef.current?.close();

          Toast.show({
            type: 'success',
            text1: 'Sửa thông tin khách hàng thành công',
          });
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  };
  const handleAddMemberDown = async () => {
    setLoading(true);
    const response = await axios.post(`${network}/saveInfoCustomerAPI`, {
      token: token,
      id: dataCustomerMore.id,
      full_name: inputNameNewDownLineFixing,
      phone: inputPhoneNewDownLineFixing,
      avatar: selectedImageFixing,
      address: inputAddressNewDownLineFixing,
      email: inputEmailNewDownLineFixing,
      facebook: inputFacebookNewDownLineFixing,
      birthday_date: convertDateToStringDay(valueDateFixing),
      birthday_month: convertDateToStringMonth(valueDateFixing),
      birthday_year: convertDateToStringYear(valueDateFixing),
    });
    if (response.data && response.data.code === 0) {
      const response2 = await axios.post(`${network}/getListCustomerAPI`, {
        token: token,
        limit: 30,
        page: 1,
      });
      if (response2.data && response2.data.code === 0) {
        setDataCustomer(response2.data.listData);
        setLoading(false);
        setModalFixingChanging(false);

        Toast.show({
          type: 'success',
          text1: 'Sửa thông tin khách hàng thành công',
        });
      } else {
        setLoading(false);

      }
    } else {
      setLoading(false);

    }
  };
  const handleAddCaringModal = async () => {
    setLoading(true);
    const response = await axios.post(`${network}/saveCustomerHistoryAPI`, {
      token: token,
      id_customer: customerChoosing.id,
      note: contentCaring,
      action: choosingDropdown,
      // time: formatDate(date, 'hh:mm dd/MM/yyyy'),
    });
    if (response.data && response.data.code === 0) {
      setCustomerChoosing(response.data.infoCustomer);
      setModalVisible(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const [dataHistoryMore, setDataHistoryMore] = useState([]);
  const dispatch = useDispatch();
  const [dataCustomerMore, setDataCustomerMore] = useState([]);
  const handleMore = customer => {
    setDataCustomerMore(customer);
    handlePresentModalPress();
  };
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${network}/getListCustomerAPI`, {
        token: token,
        limit: 30,
        page: 1,
      });
      if (response.data && response.data.code === 0) {
        setDataCustomer(response.data.listData);
      } else {
        await AsyncStorage.removeItem('user_data');
        await AsyncStorage.removeItem('token');
        dispatch(UPDATE_LOGOUT_REQUIRED());
        setShowLoginModal(true);
      }
    };
    getData();
  }, []);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );
  const [choosingDropdown, setChoosingDropdown] = useState('');
  const [date, setDate] = useState(new Date());

  const [contentCaring, setContentCaring] = useState('');
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
  const [inputNameDateFixing, setInputNameDateFixing] = useState('');
  const [selectedImageFixing, setSelectedImageFixing] = useState(null);
  const [addButtonStatus, setAddButtonStatus] = useState(false);
  const [modalFixingChanging, setModalFixingChanging] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const convertDateToStringDay = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return day;
  };
  const convertDateToString = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };
  const convertDateToStringMonth = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return month;
  };
  const convertDateToStringYear = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year;
  };
  function parseDateStringToDate(dateString) {
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
  // useEffect(() => {
  //   const initialExpandedItems = data.reduce((acc, item) => {
  //     if (item.title === 'Công việc hôm nay') {
  //       acc[item.title] = true;
  //       console.log(item.title);
  //     } else {
  //       acc[item.title] = false;
  //     }
  //     return acc;
  //   }, {});
  //   setExpandedItems(initialExpandedItems);
  // }, []);
  const renderItem = ({item}) => {
    const expanded = expandedItems[item.title];
    return <ListItemAgentTree item={item} initialExpanded={expanded} />;
  };
  const [modalDelete, setModalDelete] = useState(false);
  const [userChoosing, setUserChoosing] = useState([]);
  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  const handleDontCare = () => {
    setModalDelete(false);
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
  function convertTimestampToDate(timestamp) {
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
  const handleChoosingUser = async (id, item) => {
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
  const [checkedItems, setCheckedItems] = useState([]);

  const [modalFixing, setModalFixing] = useState(false);
  const [openModalDate, setOpenModalDate] = useState(false);
  const [valueDateFixing, setValueDateFixing] = useState(new Date());
  const handleCheckboxChange = itemId => {
    setErrorCheckItem(false);
    setCheckedItems(prevCheckedItems =>
      prevCheckedItems.includes(itemId)
        ? prevCheckedItems.filter(id => id !== itemId)
        : [...prevCheckedItems, itemId],
    );
  };
  const renderItemCustomerGroup = useCallback(
    item => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: '2%',
          alignItems: 'flex-end',
          paddingVertical: 5,
        }}
        key={item.id}>
        <CheckBox
          style={styles.checkbox}
          checked={checkedItems.includes(item.id)}
          onChange={() => handleCheckboxChange(item.id)}
          status="success">
          <KittenText style={{color: 'white', fontSize: 20, fontWeight: 500}}>
            {item.name}
          </KittenText>
        </CheckBox>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <MaterialCommunityIcons
            size={15}
            color="white"
            name="grease-pencil"
            style={{marginRight: 10}}
          />
          <MaterialCommunityIcons size={15} color="white" name="delete" />
        </TouchableOpacity>
      </View>
    ),
    [checkedItems],
  );
  const handleGetListCustomerGroup = async () => {
    const response = await axios.post(`${network}/listGroupCustomerAPI`, {
      token: token,
    });
    if (response.data && response.data.code === 0) {
      setDataCustomerGroup(response.data.listData);
      // setCheckedItems
      const groupIds = dataCustomerMore.name_groups.map(groupName => {
        const group = response.data.listData.find(
          item => item.name === groupName,
        );
        return group ? group.id : null;
      });
      setCheckedItems(groupIds);
      handlePresentCustomerGroupPress();
    } else {
      bottomSheetModalRef.current?.close();
      setShowLoginModal(true);
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
        {/* <BottomSheetModalProvider> */}
        <View style={styles.container}>
          <View style={styles.searchSpecifiedContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.inputSearching}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="Tìm kiếm khách hàng ..."
                keyboardType="numeric"
                placeholderTextColor="gray"
              />

              <View style={styles.searchIconContainer}>
                <Octicons name="search" size={20} color="gray" />
              </View>
              <View style={styles.filterIconContainer}>
                <MaterialCommunityIcons
                  name="filter-menu"
                  size={26}
                  color="white"
                />
              </View>
              {/* {enableSearching && <View style={styles.searchResultsContainer}>
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
          </View>} */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                paddingTop: 20,
                color: 'black',
                fontWeight: '700',
                fontSize: isSmallScreen ? 17 :21,
              }}>
              Danh sách khách hàng
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 20,

                // paddingBottom: 10,
                flexDirection: 'row',
                backgroundColor: 'rgb(37, 41, 109)',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <AntDesign
                size={18}
                color="white"
                name="adduser"
                style={{paddingRight: 7}}
              />
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: isSmallScreen ? 17 :18,
                }}>
                Tạo mới
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 1, marginBottom: heightDimension * 0.05}}>
            {dataCustomer.length > 0 ? (
              dataCustomer.map((customer, index) => (
                <Animated.View
                                           entering={FadeInLeft.duration(500 + (index * 200))}

                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    elevation: 20,
                    shadowColor: '#52006A',
                    paddingTop: 15,
                  }}
                  key={index}>
                  <View style={{flexDirection: 'row'}}>
                    <Image alt=""
                      source={
    customer.avatar && customer.avatar.startsWith('http')
      ? { uri: customer.avatar }
      : require('../../../../../assets/avatar-null.png')
  }
                      style={{
                        // alignItems: 'center',
                        // justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        backgroundColor: 'white',
                        shadowColor: 'black',
                        shadowOffset: {width: -22, height: 4},
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                      }}
                    />
                    <View style={{paddingLeft: 20}}>
                      <Text style={{color: 'black'}}>
                        <Text style={{fontWeight: 'bold', fontSize: isSmallScreen ? 15 : 20}}>
                          {customer.full_name}
                        </Text>
                      </Text>
                      <Text style={{color: 'black', paddingTop: 5}}>
                        SĐT:{' '}
                        <Text style={{fontWeight: 'bold'}}>
                          {customer.phone}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => handleHistoryChoosing(customer)}>
                      <MaterialIcons
                        size={25}
                        color="black"
                        name="history"
                        style={{paddingRight: 20}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAddCaring(customer)}>
                      <MaterialIcons
                        size={25}
                        color="black"
                        name="add"
                        style={{paddingRight: 20}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Entypo
                        size={20}
                        color="black"
                        name="dots-three-horizontal"
                        style={{paddingRight: 10, position: 'relative'}}
                        onPress={() => handleMore(customer)}
                      />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))
            ) : (
              <View style={{flex: 1, marginBottom: heightDimension * 0.05}}>
                <SkeletonPlaceholder borderRadius={4}>
                  <SkeletonPlaceholder.Item flexDirection="column">
                    <SkeletonPlaceholder.Item flexDirection="row">
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            )}
          </ScrollView>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            backgroundStyle={{backgroundColor: 'rgb(20, 14, 56)'}}
            handleIndicatorStyle={{backgroundColor: 'white'}}>
            <BottomSheetScrollView>
              <TouchableOpacity
                onPress={() => openApp(dataCustomerMore.facebook)}>
                <StatusBar
                  backgroundColor="rgba(0,0,0,0.5)"
                  barStyle="light-content"
                />
                <View
                  style={{
                    width: '100%',
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 45,
                      width: 45,
                      backgroundColor: 'white',
                      borderRadius: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesome
                      name="facebook-square"
                      size={20}
                      color="rgb(20, 14, 56)"
                    />
                  </View>
                  <Text style={{fontSize: 18, color: 'white', paddingLeft: 15}}>
                    Xem trang cá nhân Facebook
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setinputAddressNewDownLineFixing(dataCustomerMore.address);
                  setinputEmailNewDownLineFixing(dataCustomerMore.email);
                  setinputFacebookNewDownLineFixing(dataCustomerMore.facebook);
                  setinputInstagramNewDownLineFixing(
                    dataCustomerMore.instagram,
                  );
                  setinputZaloNewDownLineFixing(dataCustomerMore.zalo);
                  setinputNameNewDownLineFixing(dataCustomerMore.full_name);
                  setinputLinkedinNewDownLineFixing(dataCustomerMore.linkedin);
                  setinputWebsiteNewDownLineFixing(dataCustomerMore.web);
                  setinputPhoneNewDownLineFixing(dataCustomerMore.phone);
                  setinputTitleNewDownLineFixing(
                    dataCustomerMore.sex === false ? '1' : '2',
                  );
                  setInputNameDateFixing(dataCustomerMore.birthday);
                  setinputDescriptionNewDownLineFixing(
                    dataCustomerMore.description,
                  );
                  bottomSheetModalRef.current?.close();

                  setModalFixingChanging(true);
                }}>
                <View
                  style={{
                    width: '100%',
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 45,
                      width: 45,
                      backgroundColor: 'white',
                      borderRadius: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesome
                      name="edit"
                      size={20}
                      color="rgb(20, 14, 56)"
                    />
                  </View>
                  <Text style={{fontSize: 18, color: 'white', paddingLeft: 15}}>
                    Sửa thông tin
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGetListCustomerGroup()}>
                <StatusBar
                  backgroundColor="rgba(0,0,0,0.5)"
                  barStyle="light-content"
                />
                <View
                  style={{
                    width: '100%',
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 45,
                      width: 45,
                      backgroundColor: 'white',
                      borderRadius: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesome
                      name="group"
                      size={20}
                      color="rgb(20, 14, 56)"
                    />
                  </View>
                  <Text style={{fontSize: 18, color: 'white', paddingLeft: 15}}>
                    Thêm vào nhóm khách hàng
                  </Text>
                </View>
              </TouchableOpacity>
            </BottomSheetScrollView>
          </BottomSheetModal>
          <BottomSheetModal
            ref={bottomSheetCustomerGroupRef}
            index={1}
            snapPoints={snapPointsCustomerGroup}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            backgroundStyle={{backgroundColor: 'rgb(20, 14, 56)'}}
            handleIndicatorStyle={{backgroundColor: 'white'}}>
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainerModalCustomerGroup}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: '2%',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Nhóm khách hàng
                </Text>
                {addButtonStatus ? (
                  <TouchableOpacity
                    onPress={() => setAddButtonStatus(false)}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign
                      size={18}
                      color="white"
                      name="closecircle"
                      style={{paddingRight: 7}}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: '500',
                      }}>
                      Hủy
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setAddButtonStatus(true)}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign
                      size={18}
                      color="white"
                      name="addusergroup"
                      style={{paddingRight: 7}}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: '500',
                      }}>
                      Tạo mới
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {addButtonStatus && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: '2%',
                    alignItems: 'center',
                    paddingTop: 5,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <CheckBox
                      style={styles.checkbox}
                      disabled
                      // checked={checkedItems.includes(item.id)}
                      // onChange={() => handleCheckboxChange(item.id)}
                      status="success"></CheckBox>
                    <TextInput
                      style={styles.inputCheckbox}
                      onChangeText={text => setTextAddGroup(text)}
                      value={textAddGroup}
                      placeholder="Nhập tên nhóm"
                      placeholderTextColor="white"
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      marginTop: 10,
                      backgroundColor: textAddGroup === '' ? 'gray' : 'white',
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                    disabled={textAddGroup === '' ? true : false}
                    onPress={() => handleAddGroupCustomer()}>
                    <Text
                      style={{
                        color:
                          textAddGroup === '' ? 'black' : 'rgb(37, 41, 109)',
                        fontSize: 15,
                        fontWeight: '500',
                      }}>
                      Tạo mới
                    </Text>
                    {loadingAddGroup ? (
                      <ActivityIndicator
                        size="small"
                        color="rgb(37, 41, 109)"
                        style={{paddingLeft: 10}}
                      />
                    ) : (
                      <Entypo
                        size={15}
                        color="rgb(37, 41, 109)"
                        name="chevron-right"
                        style={{paddingLeft: 10}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              )}

              <View style={{flexDirection: 'column', paddingVertical: 10}}>
                {dataCustomerGroup.length > 0 &&
                  dataCustomerGroup.map(renderItemCustomerGroup)}
              </View>
            </BottomSheetScrollView>
            <View
              style={[
                {
                  width: '100%',
                  paddingHorizontal: 20,
                  position: 'absolute',
                  bottom: 0,
                  height: 100,
                  paddingBottom: 10,
                },
              ]}>
              {errorCheckItem && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'red',
                    marginBottom: 10,
                  }}>
                  Bạn chưa chọn nhóm nào
                </Text>
              )}
              <TouchableOpacity
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  backgroundColor: 'rgb(37, 41, 109)',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                }}
                onPress={() => {
                  handleAddMemberGroup();
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={{alignSelf: 'center'}}
                    />
                  ) : (
                    'Sửa nhóm'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
          <BottomSheetModal
            ref={bottomSheetHistoryRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            backgroundStyle={{backgroundColor: 'rgb(20, 14, 56)'}}
            handleIndicatorStyle={{backgroundColor: 'white'}}
            onDismiss={handleSheetHistoryClosing}>
            <TouchableOpacity
              onPress={() => openApp(dataCustomerMore.facebook)}>
              <StatusBar
                backgroundColor="rgba(0,0,0,0.5)"
                barStyle="light-content"
              />
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    backgroundColor: 'white',
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons
                    name="transcribe"
                    size={20}
                    color="rgb(20, 14, 56)"
                  />
                </View>
                <Text style={{fontSize: 18, color: 'white', paddingLeft: 15}}>
                  Xem thêm
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => copyToClipboard()}>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    backgroundColor: 'white',
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FontAwesome name="copy" size={20} color="rgb(20, 14, 56)" />
                </View>
                <Text style={{fontSize: 18, color: 'white', paddingLeft: 15}}>
                  Sao chép thông tin
                </Text>
              </View>
            </TouchableOpacity>
          </BottomSheetModal>
        </View>
        {/* </BottomSheetModalProvider> */}
      </TouchableWithoutFeedback>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalHistoryChoosing}
        onRequestClose={() => {
          setModalHistoryChoosing(false);
        }}>
        <View style={[styles.centeredView]}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'rgb(35, 45, 111)',
              textAlign: 'center',
            }}>
            Lịch sử chăm sóc khách hàng : {customerChoosing.full_name}
          </Text>
          <Image alt=""
            source={{uri: customerChoosing.avatar}}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              borderRadius: 50,
              alignSelf: 'center',
              marginTop: 20,
              borderColor: 'rgb(35, 45, 111)',
              borderWidth: 2,
            }}
          />
          <TouchableOpacity
            style={{
              width: '40%',
              paddingVertical: 10,
              backgroundColor: 'rgb(35, 45, 111)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 20,
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}
            onPress={() => setModalVisible(false)}>
            <AntDesign
              size={18}
              color="white"
              name="edit"
              style={{paddingRight: 7}}
            />
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              Sửa thông tin
            </Text>
          </TouchableOpacity>
          {/* <Text
            style={{
              paddingTop: 20,
              color: 'black',
              fontWeight: '700',
              fontSize: 21,
              paddingBottom: 10,
            }}>
            Danh sách khách hàng
          </Text> */}
          <View style={styles.searchSpecifiedContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.inputSearching}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="Tìm kiếm dữ liệu ..."
                keyboardType="numeric"
                placeholderTextColor="gray"
              />

              <View style={styles.searchIconContainer}>
                <Octicons name="search" size={20} color="gray" />
              </View>
              <View style={styles.filterIconContainer}>
                <MaterialCommunityIcons
                  name="filter-menu"
                  size={26}
                  color="white"
                />
              </View>
            </View>
          </View>
          <ScrollView style={{flex: 1, marginBottom: heightDimension * 0.05}}>
            {dataHistory.length > 0 ? (
              dataHistory.map((customer, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    elevation: 20,
                    shadowColor: '#52006A',
                    paddingTop: 15,
                  }}
                  key={index}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '90%'}}>
                      <Text style={{color: 'black'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>
                          {customer.note_now}
                        </Text>
                      </Text>
                      <Text style={{color: 'black', paddingTop: 5}}>
                        Trạng thái:
                        <Text
                          style={{
                            color:
                              customer.status === 'done' ? 'green' : 'black',
                            paddingTop: 5,
                          }}>
                          {customer.status === 'done'
                            ? ' Hoàn thành'
                            : ' Chưa hoàn thành'}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => bottomSheetHistoryPress(customer)}>
                      <Entypo
                        size={20}
                        color="black"
                        name="dots-three-horizontal"
                        style={{paddingRight: 10, position: 'relative'}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={{flex: 1, marginBottom: heightDimension * 0.05}}>
                <SkeletonPlaceholder borderRadius={4}>
                  <SkeletonPlaceholder.Item flexDirection="column">
                    <SkeletonPlaceholder.Item flexDirection="row">
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      marginTop={10}>
                      <SkeletonPlaceholder.Item
                        width={50}
                        height={50}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item marginLeft={10}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                          marginTop={10}
                          width={80}
                          height={20}
                        />
                      </SkeletonPlaceholder.Item>
                      <SkeletonPlaceholder.Item
                        marginLeft={80}
                        flexDirection="row"
                        alignItems="center">
                        <SkeletonPlaceholder.Item
                          width={30}
                          marginLeft={10}
                          height={30}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={30}
                          marginLeft={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            )}
          </ScrollView>

          {errorData && (
            <Text style={styles.errorText}>
              Không tìm thấy đại lý, hãy thử lại
            </Text>
          )}
        </View>
        <View
          style={[
            styles.buttonModalContainer,
            {
              paddingHorizontal: 20,
              position: 'absolute',
              bottom: 0,
              height: 55,
              backgroundColor: 'white',
              paddingBottom: 10,
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
              height: 50,
            }}
            onPress={() => setModalHistoryChoosing(false)}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              Đã xong
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
              height: 50,
            }}
            onPress={() => {
              handleAddCaringModal();
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{alignSelf: 'center'}}
                />
              ) : (
                'Xuất file Excel'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={[styles.centeredView]}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'rgb(35, 45, 111)',
              textAlign: 'center',
            }}>
            Chăm sóc khách hàng : {customerChoosing.full_name}
          </Text>
          <Image alt=""
            source={{uri: customerChoosing.avatar}}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              borderRadius: 50,
              alignSelf: 'center',
              marginTop: 20,
              borderColor: 'rgb(35, 45, 111)',
              borderWidth: 2,
            }}
          />
          <TouchableOpacity
            style={{
              width: '35%',
              paddingVertical: 10,
              backgroundColor: 'rgb(35, 45, 111)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 20,
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}
            onPress={() => setModalVisible(false)}>
            <AntDesign
              size={18}
              color="white"
              name="edit"
              style={{paddingRight: 7}}
            />
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              Sửa thông tin
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 17,
              paddingBottom: 5,
              color: 'black',
              fontWeight: 600,
              paddingTop: 15,
            }}>
            Nội dung chăm sóc :
          </Text>
          <TextInput
            style={styles.inputSearchingCaring}
            onChangeText={text => setContentCaring(text)}
            value={contentCaring}
            placeholder="Nội dung chăm sóc ..."
            keyboardType="numeric"
            placeholderTextColor="gray"
          />
          <Text
            style={{
              fontSize: 17,
              paddingBottom: 10,
              color: 'black',
              fontWeight: 600,
              paddingTop: 5,
            }}>
            Chọn hành động :
          </Text>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {borderColor: 'blue'},
              {width: '100%', color: 'black'},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataActionCaring}
            search
            maxHeight={300}
            labelField="label"
            valueField="id"
            placeholder={!isFocus ? 'Chọn hành động' : '...'}
            searchPlaceholder="Tìm kiếm ..."
            value={choosingDropdown}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setChoosingDropdown(item.id);
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
          {/* <Text
              style={{
                fontSize: 17,
                paddingBottom: 10,
                color: 'black',
                fontWeight: 600,
                paddingTop: 25,
              }}>
              Chọn trạng thái :
            </Text>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {borderColor: 'blue'},
                {width: '100%'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataActionCaring}
              search
              maxHeight={300}
              labelField="label"
              valueField="id"
              placeholder={!isFocus ? 'Chọn hành động' : '...'}
              searchPlaceholder="Tìm kiếm ..."
              value={choosingDropdown}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setChoosingDropdown(item.id);
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
            /> */}
          <Text
            style={{
              fontSize: 17,
              paddingBottom: 10,
              color: 'black',
              fontWeight: 600,
              paddingTop: 25,
            }}>
            Chọn thời gian chăm sóc :
          </Text>
          <DatePicker
            date={date}
            onDateChange={setDate}
            style={{height: 150}}
          />

          {errorData && (
            <Text style={styles.errorText}>
              Không tìm thấy đại lý, hãy thử lại
            </Text>
          )}
        </View>
        <View
          style={[
            styles.buttonModalContainer,
            {
              paddingHorizontal: 20,
              position: 'absolute',
              bottom: 0,
              height: 70,
              paddingBottom: 10,
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
              height: 50,
            }}
            onPress={() => setModalVisible(false)}>
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
              height: 50,
            }}
            onPress={() => {
              handleAddCaringModal();
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{alignSelf: 'center'}}
                />
              ) : (
                'Thêm nội dung'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFixingChanging}
        onRequestClose={() => {
          setModalFixingChanging(false);
        }}>
        <StatusBar barStyle="light-content" backgroundColor="rgb(20, 14, 56)" />
        <View style={styles.centeredViewChanging}>
          <ScrollView
            style={[
              styles.modalViewScrollView,
              {
                borderRadius: 0,
                paddingTop: 10,
                backgroundColor: 'rgb(20, 14, 56)',
              },
            ]}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                paddingTop: 10,
                textAlign: 'center',
                paddingBottom: 10,
              }}>
              Sửa thông tin khách hàng
            </Text>

            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'white',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Họ tên:</Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputNameNewDownLineFixing(text)}
              value={inputNameNewDownLineFixing}
              placeholder="Họ tên khách hàng"
              placeholderTextColor="gray"
            />

            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'white',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Điện thoại:
              </Text>
            </Text>
            <TextInput
              style={[styles.inputNameChanging, {color: 'white'}]}
              onChangeText={text => setinputPhoneNewDownLineFixing(text)}
              value={inputPhoneNewDownLineFixing}
              placeholder="Số điện thoại khách hàng"
              placeholderTextColor="gray"
              editable={false}
              selectTextOnFocus={false}
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'white',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Email:</Text>{' '}
            </Text>

            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputEmailNewDownLineFixing(text)}
              value={inputEmailNewDownLineFixing}
              placeholder="Email khách hàng"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'white',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Địa chỉ:</Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputAddressNewDownLineFixing(text)}
              value={inputAddressNewDownLineFixing}
              placeholder="Địa chỉ khách hàng"
              placeholderTextColor="gray"
            />
            <Text
              style={{
                fontSize: 18,

                textAlign: 'left',
                paddingBottom: 10,
                color: 'white',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Giới tính:
              </Text>{' '}
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'white'}]}
              placeholderStyle={[styles.placeholderStyle]}
              selectedTextStyle={[styles.selectedTextStyle, {color: 'white'}]}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataPosition}
              search
              maxHeight={300}
              labelField="name"
              valueField="value"
              placeholder={!isFocus ? 'Chọn giới tính' : '...'}
              searchPlaceholder="Tìm kiếm ..."
              value={inputTitleNewDownLineFixing}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setinputTitleNewDownLineFixing(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'white'}
                  name="Safety"
                  size={20}
                />
              )}
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
                    color: 'white',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
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
                  placeholder="Ngày sinh khách hàng"
                  placeholderTextColor="gray"
                /> */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {valueDateFixing.toString() !== new Date().toString() ? (
                    <Text style={{color: 'white', fontSize: 20}}>
                      {convertDateToString(valueDateFixing)}
                    </Text>
                  ) : (
                    <Text style={{color: 'white', fontSize: 20}}>
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
                />
              </View>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontSize: 18,

                    textAlign: 'left',
                    paddingBottom: 10,
                    color: 'white',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Hình đại diện:
                  </Text>{' '}
                </Text>
                {selectedImageFixing ? (
                  <TouchableOpacity onPress={() => openImagePickerFixing()}>
                    <Image alt=""
                      source={{uri: selectedImageFixing}}
                      style={{width: '100%', height: 60}}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => openImagePickerFixing()}>
                    <Image alt=""
                      source={{uri: dataCustomerMore.avatar}}
                      style={{width: '100%', height: 60}}
                      resizeMode="contain"
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
                color: 'white',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Trang Facebook:
              </Text>{' '}
            </Text>
            <TextInput
              style={styles.inputNameChanging}
              onChangeText={text => setinputFacebookNewDownLineFixing(text)}
              value={inputFacebookNewDownLineFixing}
              placeholder="Trang Facebook khách hàng"
              placeholderTextColor="white"
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
                backgroundColor: 'rgb(20, 14, 56)',
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
              onPress={() => setModalFixingChanging(false)}>
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
                  'Sửa thông tin'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <LoginSession visible={showLoginModal} onCloseModal={handleCloseModal} />
    </>
  );
};

export default OrderManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: heightDimension * 0.05,
    paddingHorizontal: widthDimension * 0.03,
  },
  searchSpecifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 15,
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
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    elevation: 5,
    shadowColor: '#52006A',
  },
  inputSearching: {
    height: 60,
    padding: 10,
    marginTop: 5,
    width: '100%',
    borderRadius: 20,
    fontSize: 18,
    paddingLeft: 50,
    color: 'gray',
    backgroundColor: 'rgb(249, 249, 251)',
  },
  inputSearchingCaring: {
    height: 50,
    padding: 10,
    marginTop: 5,
    width: '100%',
    borderRadius: 10,
    fontSize: 18,
    color: 'gray',
    borderWidth: 1,
    borderColor: 'rgb(194, 194, 194)',
  },
  imageLogo: {
    width: 90,
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
    width: '100%',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 15,
    top: 25,
  },
  filterIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 70,
    height: 70,
    backgroundColor: 'rgb(37, 41, 109)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centeredView: {
    paddingHorizontal: heightDimension * 0.02,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    paddingTop: 20,
    borderRadius: 20,
    width: widthDimension * 1,
    paddingHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  modalViewScrollView: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: widthDimension,
    paddingBottom: heightDimension * 0.2,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  centeredViewChanging: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  modalViewChanging: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: widthDimension * 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    height: heightDimension,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputNameChanging: {
    width: '100%',
    borderColor: 'white',
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
    color: 'white',
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
    color: 'gray',
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
    color: 'black',
  },
  buttonModalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    width: 120,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  contentContainer: {
    backgroundColor: 'rgb(21, 17, 59)',
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
    color: 'black',
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
  contentContainerModalCustomerGroup: {
    paddingHorizontal: widthDimension * 0.05,
    paddingVertical: 10,
  },
  checkbox: {
    paddingTop: 10,
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputCheckbox: {
    borderBottomWidth: 0.5,
    borderColor: 'white',
    color: 'white',
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    width: '66%',
  },
});
