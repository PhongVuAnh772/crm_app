import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import axios from 'axios';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import SpinPrizing from './children/spin/SpinPrizing';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckinScreen from './children/checkin/CheckinScreen';
import LocationScreen from './children/location/LocationScreen';
import TeamScreen from './children/team/TeamScreen';
import TicketClassScreen from './children/ticket/TicketClassScreen';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  addAddLocation,
  updateAddLocation,
  deleteAddLocation,
  resetLocations,
  replaceAddLocations,
} from '../../../../../../../../slices/add-campaign/location/AddLocationSlice';
import {
  changeAddCheckinName,
  changeAddNotificationGreeting,
  changeAddContentShowingQR,
  changeAddCodeSpinning,
  changeAddPersonWinning,
  changeAddCodeHexColor,
  changeAddLogoPicture,
  changeAddBackgroundPicture,
} from '../../../../../../../../slices/add-campaign/others/otherCampaignSlice';
import {
  addAddTeams,
  updateAddTeams,
  deleteAddTeams,
  resetAddTeams,
  replaceAddTeams,
} from '../../../../../../../../slices/add-campaign/teams/AddTeamSlice';
import {
  updateAddInput,
  addAddInput,
  replaceAddInput,
} from '../../../../../../../../slices/add-campaign/ticket/TicketCampaignSlice';
import {
  CHANGE_VALUE_LIST,
  DELETE_ALL_VALUES_LIST,
} from '../../../../../../../../slices/list-campaign/listCampaignSlice';
import Toast from 'react-native-toast-message';

const heightDimension = Dimensions.get('window').height;
const widthDimension = Dimensions.get('window').width;
const {width} = Dimensions.get('window');
const isSmallScreen = width < 375;
const SpecifiedCampaign = ({route}) => {
  const listCampaign = useSelector(state => state.listCampaigns.info);
  const dispatch = useDispatch();
  const {item} = route.params;
  const ticket = useSelector(state => state.ticket);
  const location = useSelector(state => state.addLocation);
  // const convertedObject = location.reduce((acc, curr, index) => {
  //   acc[index + 1] = curr.address || '';
  //   return acc;
  // }, {});
  const [data, setData] = useState([]);
  const [value, setValue] = useState(item?.status === 'lock' ? '2' : '1');
  // useEffect(() => {
  //   setValue(item?.status === 'lock' ? '2' : '1')
  // }, [])
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [inputName, setInputName] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const ticketData = useSelector(state => state.addTicket);
  const network = useSelector(state => state.network.ipv4);
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const response = await axios.post(`${network}/deleteCampaignAPI`, {
      token: token,
      id: item.id,
    });
    if (response.data && response.data.code === 0) {
      const response2 = await axios.post(`${network}/getListCampaignAPI`, {
        token: token,
        limit: 20,
        page: 1,
      });

      if (response2.data && response2.data.code === 0) {
        dispatch(CHANGE_VALUE_LIST(response2.data.listData));
        setLoading(false);
        navigation.goBack();
        Toast.show({
          type: 'success',
          text1: 'Xóa chiến dịch thành công',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Xóa thành công, sẽ cập nhật lại sau ít phút',
        });
      }
    }
  };

  const fetchData = async () => {
    const dataTicketParse = JSON.parse(item.ticket);
    const dataTeamParse = JSON.parse(item.team);
    const dataLocationParse = JSON.parse(item.location);
    dispatch(changeAddCheckinName(item.name_show));
    dispatch(changeAddNotificationGreeting(item.text_welcome));
    dispatch(changeAddContentShowingQR(item.noteCheckin));
    setInputName(item.name);
    dispatch(changeAddCodeSpinning(item.codeSecurity));
    dispatch(changeAddPersonWinning(item.codePersonWin));
    dispatch(changeAddCodeHexColor(item.colorText));
    dispatch(changeAddLogoPicture(item.img_logo));
    dispatch(changeAddBackgroundPicture(item.img_background));
    dispatch(replaceAddInput(dataTicketParse));
    dispatch(replaceAddLocations(dataLocationParse));
    dispatch(replaceAddTeams(dataTeamParse));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const checkinName = useSelector(state => state.addOtherCampaign.checkinName);
  const notificationGreeting = useSelector(
    state => state.addOtherCampaign.notificationGreeting,
  );
  const contentShowingQR = useSelector(
    state => state.addOtherCampaign.contentShowingQR,
  );
  const codeSpinning = useSelector(
    state => state.addOtherCampaign.codeSpinning,
  );
  const personWinning = useSelector(
    state => state.addOtherCampaign.personWinning,
  );
  const codeHexColor = useSelector(
    state => state.addOtherCampaign.codeHexColor,
  );
  const locations = useSelector(state => state.addLocation);
  const team = useSelector(state => state.addTeam);

  const handleFixingCampaign = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${network}/saveInfoCampaignAPI`, {
        token: token,
        id: item.id,
        // name: inputName,
        // name_show: checkinName,
        // text_welcome: notificationGreeting,
        // noteCheckin: contentShowingQR,
        // codeSecurity: codeSpinning,
        // colorText: codeHexColor,
        // codePersonWin: personWinning,
        // location: JSON.stringify(locations).replace(/"/g, "'"),
        // ticket: JSON.stringify(ticketData).replace(/"/g, "'"),team:JSON.stringify(team).replace(/"/g, "'")
        name: 'Kinh doanh thành công',
        name_show: 'Kinh doanh thành công',
        text_welcome: 'Chào mừng bạn đến với sự kiện Kinh doanh thành công',
        noteCheckin: 'Chào mừng bạn đến với sự kiện Kinh doanh thành công',
        codeSecurity: '12345',
        colorText: '#fff',
        codePersonWin: '1,2,3',
        location: {
          1: 'Hà Nội ngày 4-5/5',
          2: 'Sài Gòn tháng 7/2024',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
        },
        ticket: {
          1: {name: 'Thường', price: 0},
          2: {name: 'VIP', price: 1000000},
        },
        team: {
          1: {name: 'Quỳnh Anh 0967777777', id_member: 256},
          2: {name: 'Hồng Minh 0941923999', id_member: 62},
        },
        status: "active"
      });

      if (response.data && response.data.code === 0) {
        const response2 = await axios.post(`${network}/getListCampaignAPI`, {
          token: token,
          limit: 20,
          page: 1,
        });

        if (response2.data && response2.data.code === 0) {
          dispatch(CHANGE_VALUE_LIST(response2.data.listData));
          setLoading(false);
          navigation.goBack();
          Toast.show({
            type: 'success',
            text1: 'Sửa chiến dịch thành công',
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Sửa thành công, sẽ cập nhật lại sau ít phút',
          });
        }
      } else if (response.data && response.data.code === 3) {
        console.log(response.data);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Lỗi mạng, hãy thử lại',
      });
      // console.error('Server response:', error.response);
      // console.error('Status code:', error.response.status);
      console.error('Data:', error.response.data);
    }
  };

  function MyTabBar({state, descriptors, navigation, position}) {
    return (
      <ScrollView
        style={{flexDirection: 'row', position: 'absolute', top: 15}}
        horizontal>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          // const opacity = position.interpolate({
          //   inputRange,
          //   outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          // });

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                alignItems: 'center',
                backgroundColor: isFocused
                  ? 'rgb(59, 55, 142)'
                  : 'rgb(242, 242, 242)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 20,
                marginLeft: 10,
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: isFocused ? 'white' : 'black',
                  fontWeight: 600,
                  fontSize: 13,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const dataSelect = [
    {label: 'Kích hoạt', value: '1'},
    {label: 'Khóa', value: '2'},
  ];

  return (
    <View style={{backgroundColor: 'rgb(59, 55, 142)', flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(59, 55, 142)" />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'rgb(59, 55, 142)',
          paddingHorizontal: 15,
          paddingVertical: 15,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{paddingVertical: 5, paddingHorizontal: 2}}
          onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={15} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            paddingLeft: 40,
            fontWeight: '600',
          }}>
          Thông tin chiến dịch
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 10}}>
            <MaterialIcons name="group" size={17} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingVertical: 5, paddingHorizontal: 5}}
            onPress={() => setVisibleModalDelete(true)}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={17}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'rgb(59, 55, 142)',
          paddingHorizontal: 15,
          paddingTop: 15,
          paddingBottom: 30,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 13,
            fontWeight: '700',
          }}>
          Tên chiến dịch
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputName(text)}
          value={inputName}
          placeholder="Nhập tên chiến dịch"
          placeholderTextColor="white"
        />
        <Text
          style={{
            color: 'white',
            fontSize: 13,
            fontWeight: '700',
            marginTop: 20,
          }}>
          Trạng thái
        </Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'white'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataSelect}
          renderItem={renderItem}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Chọn' : '...'}
          searchPlaceholder="Tìm kiếm ..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'white' : 'white'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Quay thưởng"
          component={SpinPrizing}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Checkin"
          component={CheckinScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Khu vực"
          component={LocationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Đội nhóm"
          component={TeamScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Hạng vé"
          component={TicketClassScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: 10,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            paddingVertical: 10,
            backgroundColor: 'rgb(59, 55, 142)',
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}
          onPress={() => handleFixingCampaign()}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              Lưu thay đổi
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModalDelete}
        onRequestClose={() => {}}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
        <View style={styles.centeredViewChanging}>
          <View style={styles.modalViewChanging}>
            <Text style={styles.titleLoginRequired}>
              Bạn chắc chắn muốn xóa chiến dịch này chứ ?
            </Text>
            <Text style={styles.descriptionLoginRequired}>
              Hãy cẩn thận với lựa chọn, nếu không bạn sẽ mất hết dữ liệu liên
              quan !
            </Text>
            <TouchableOpacity
              onPress={handleDelete}
              style={{
                width: '100%',
                paddingVertical: 7,
                backgroundColor: 'rgb(37, 41, 109)',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    fontSize: isSmallScreen ? 13 : 18,
                  }}>
                  Đồng ý
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisibleModalDelete(false)}
              style={{
                width: '100%',
                paddingVertical: 7,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 0.3,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: isSmallScreen ? 13 : 18,
                }}>
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    //   </View>
  );
};

export default SpecifiedCampaign;

const styles = StyleSheet.create({
  item: {paddingVertical: 10, paddingHorizontal: 10},
  textItem: {color: 'black'},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerContainer: {
    alignItems: 'center',
    backgroundColor: 'rgb(242, 242, 242)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginLeft: 15,
  },
  input: {
    width: '100%',
    borderBottomColor: 'white',
    borderBottomWidth: 0.2,
    height: 40,
    fontSize: 13,
    marginTop: 5,
  },
  dropdown: {
    marginTop: 10,
    height: 40,
    borderColor: 'white',
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
    fontSize: 13,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 13,
    color: 'white',
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
    width: widthDimension * 0.9,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleLoginRequired: {
    fontSize: isSmallScreen ? 13 : 15,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  descriptionLoginRequired: {
    fontSize: isSmallScreen ? 10 : 15,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
