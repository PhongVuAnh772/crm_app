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
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
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
import Animated, {
  FadeInUp,
  BounceIn,
  FadeInLeft,
} from 'react-native-reanimated';
import {PieChart} from 'react-native-gifted-charts';

const {width} = Dimensions.get('window');
const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;
const isSmallScreen = width < 375;

const dataActionCaring = [
  {label: 'Gọi điện', id: 'call'},
  {label: 'Nhắn tin', id: 'message'},
  {label: 'Đi gặp', id: 'go_meet'},
  {label: 'Họp online', id: 'online_meeting'},
  {label: 'Khác', id: 'other'},
];

const WarehouseManagement = () => {
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

  const handleAddWarehouse = async () => {};
  const handleAddGroupCustomer = async () => {
    setLoadingAddGroup(true);
    const response = await axios.post(`${network}/getHistoryWarehouseProductAPI`, {
      token: token,
      limit: 30,
      page: 1
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
      setDataCustomerGroup([newDataGroup, ...dataCustomerGroup]);
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
  const handleSheetChanges = useCallback(index => {}, []);
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
  const pieData = [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
    {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
    {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
  ];

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#006DFF')}
            <Text style={{color: 'white'}}>Excellent: 47%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#8F80F3')}
            <Text style={{color: 'white'}}>Okay: 16%</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#3BE9DE')}
            <Text style={{color: 'white'}}>Good: 40%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#FF7F97')}
            <Text style={{color: 'white'}}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };
  const handleGetListCustomerGroup = async () => {
    const response = await axios.post(`${network}/listGroupCustomerAPI`, {
      token: token,
    });
    if (response.data && response.data.code === 0) {
      setDataCustomerGroup(response.data.listData);
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

  const [countingNew, setCountingNew] = useState('');
  const [countingBrowser, setCountingBrowser] = useState('');
  const [countingDone, setCountingDone] = useState('');
  const [countingDelivery, setCountingDelivery] = useState('');
  const [countingCancel, setCountingCancel] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(
        `${network}/getListRequestImportProductAPI`,
        {
          token: token,
          limit: 100,
          status: 'new',
        },
      );
      if (response.data && response.data.code === 0) {
        setCountingNew(response.data.listData.length);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(
        `${network}/getListRequestImportProductAPI`,
        {
          token: token,
          limit: 100,
          status: 'browser',
        },
      );
      if (response.data && response.data.code === 0) {
        setCountingBrowser(response.data.listData.length);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(
        `${network}/getListRequestImportProductAPI`,
        {
          token: token,
          limit: 100,
          status: 'delivery',
        },
      );
      if (response.data && response.data.code === 0) {
        setCountingDelivery(response.data.listData.length);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(
        `${network}/getListRequestImportProductAPI`,
        {
          token: token,
          limit: 100,
          status: 'done',
        },
      );
      if (response.data && response.data.code === 0) {
        setCountingDone(response.data.listData.length);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(
        `${network}/getListRequestImportProductAPI`,
        {
          token: token,
          limit: 100,
          status: 'cancel',
        },
      );
      if (response.data && response.data.code === 0) {
        setCountingCancel(response.data.listData.length);
      }
    };
    getData();
  }, []);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
        <View style={styles.container}>
          <Text style={styles.jobSummaryTitle}>Tổng quan kho hàng</Text>
          <ScrollView style={styles.scrollViewJobSummary} horizontal>
            <View
              style={[
                styles.jobSummarySpecified,
                {backgroundColor: 'rgb(243, 211, 107)'},
              ]}>
              <View>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="truck-delivery"
                    size={30}
                    color="rgb(243, 211, 107)"
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>
                  {countingDelivery}
                </Text>
              </View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                Đơn đang giao
              </Text>
            </View>
            <View
              style={[
                styles.jobSummarySpecified,
                {
                  backgroundColor: 'rgb(79, 209, 221)',
                  borderRadius: 15,
                  marginLeft: 10,
                },
              ]}>
              <View>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FontAwesome5
                    name="user-check"
                    size={20}
                    color="rgb(79, 209, 221)"
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>
                  {countingBrowser}
                </Text>
              </View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                Đơn đã duyệt
              </Text>
            </View>
            <View
              style={[
                styles.jobSummarySpecified,
                {
                  backgroundColor: 'rgb(255, 76, 131)',
                  borderRadius: 15,
                  marginLeft: 10,
                },
              ]}>
              <View>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="account-cancel-outline"
                    size={30}
                    color="rgb(255, 76, 131)"
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>
                  {countingCancel}
                </Text>
              </View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                Đơn từ chối
              </Text>
            </View>
            <View
              style={[
                styles.jobSummarySpecified,
                {
                  backgroundColor: 'green',
                  borderRadius: 15,
                  marginLeft: 10,
                },
              ]}>
              <View>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons
                    name="done"
                    size={30}
                    color="green"
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>
                  {countingDone}
                </Text>
              </View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                Đơn hoàn thành
              </Text>
              
            </View>
          </ScrollView>
          <Text style={styles.jobSummaryTitle}>Chức năng chính</Text>

          <TouchableOpacity
           onPress={() => navigation.navigate('ImportingGoods')}
            style={[
              styles.card,
              styles.shadowProp,
              {
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="add-outline" color="white" size={18} />
              <Text style={styles.heading}>Nhập hàng vào kho</Text>
            </View>
            <Entypo name="chevron-right" color="white" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ImportingGoods')}
            style={[
              styles.card,
              styles.shadowProp,
              {
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome name="shopping-cart" color="white" size={18} />
              <Text style={styles.heading}>Danh sách hàng hóa trong kho</Text>
            </View>
            <Entypo name="chevron-right" color="white" size={18} />
          </TouchableOpacity>
          <View
            style={[
              styles.card,
              styles.shadowProp,
              {
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons name="checklist" color="white" size={18} />
              <Text style={styles.heading}>Danh sách yêu cầu nhập hàng</Text>
            </View>
            <Entypo name="chevron-right" color="white" size={18} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('HistoryRequests')}
            style={[
              styles.card,
              styles.shadowProp,
              {
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome name="history" color="white" size={18} />

              <Text style={styles.heading}>Lịch sử xuất nhập hàng</Text>
            </View>
            <Entypo name="chevron-right" color="white" size={18} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default WarehouseManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: heightDimension * 0.08,
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
  jobSummaryTitle: {
    color: 'rgb(37, 41, 109)',
    fontSize: isSmallScreen ? 15 : 18,
    fontWeight: 'bold',
  },
  scrollViewJobSummary: {
    paddingTop: 20,
    maxHeight: 200,
    flex: 1
  },
  jobSummarySpecified: {
    width: 100,
    height: 150,
    borderRadius: 15,
    paddingTop: 10,
    paddingHorizontal: 7,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  heading: {
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
    paddingLeft: 10,
  },
  card: {
    backgroundColor: 'rgb(57, 55, 142)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
