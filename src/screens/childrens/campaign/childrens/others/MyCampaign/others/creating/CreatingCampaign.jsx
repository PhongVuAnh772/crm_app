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
  TextInput,ActivityIndicator
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
import LocationScreen from './children/location/LocationCreatingScreen';
import TeamScreen from './children/team/TeamScreen';
import TicketClassScreen from './children/ticket/TicketClassScreen';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import { CHANGE_VALUE_LIST } from '../../../../../../../../../slices/list-campaign/listCampaignSlice';
const heightDimension = Dimensions.get('window').height;

const CreatingCampaign = route => {
  const ticket = useSelector(state => state.ticket);
  const location = useSelector(state => state.location);

  const notificationGreeting = useSelector(
    state => state.otherCampaign.notificationGreeting,
  );
  const contentShowingQR = useSelector(
    state => state.otherCampaign.contentShowingQR,
  );
  const codeSpinning = useSelector(state => state.otherCampaign.codeSpinning);
  const personWinning = useSelector(state => state.otherCampaign.personWinning);
  const codeHexColor = useSelector(state => state.otherCampaign.codeHexColor);
  const checkinName = useSelector(state => state.otherCampaign.checkinName);
  const ticketData = useSelector(state => state.ticket);
  const team = useSelector(state => state.team);
  const locations = useSelector(state => state.location);
  const token = useSelector(state => state.auth.token);
  const network = useSelector(state => state.network.ipv4);

  const [loading, setLoading] = useState(false);
  const [nameCampaign, setNameCampaign] = useState('');

  const handleAddCampaign = async () => {
    //   const convertedObject = location.reduce((acc, curr, index) => {
    //   acc[index + 1] = curr.address || '';
    //   return acc;
    // }, {});
    setLoading(true);
    try {
      const response = await axios.post(`${network}/saveInfoCampaignAPI`, {
        token: token,
        name: nameCampaign,
        name_show: checkinName,
        text_welcome: notificationGreeting,
        noteCheckin: contentShowingQR,
        codeSecurity: codeSpinning,
        colorText: codeHexColor,
        codePersonWin: personWinning,
        location: locations,
        ticket: ticketData,
        team: team,
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
    } catch (e) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Lỗi mạng, hãy thử lại',
      });
    }
  };

  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const windowWidth = Dimensions.get('window').width;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://662e0a1ea7dda1fa378bdf8a.mockapi.io/api/listing',
      );
      if (response.data) {
        setData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          // justifyContent: 'space-between',
          backgroundColor: 'rgb(59, 55, 142)',
          paddingHorizontal: 15,
          paddingVertical: 15,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={15} color="white" />
        </TouchableOpacity>
        <View style={{flex: 0.8, alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              paddingLeft: 30,
              fontWeight: '600',
            }}>
            Tạo mới chiến dịch
          </Text>
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
          onChangeText={text => setNameCampaign(text)}
          value={nameCampaign}
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
          onPress={() => handleAddCampaign()}>
          
          {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            Lưu thay đổi
          </Text>
              )}
        </TouchableOpacity>
      </View>
    </View>
    //   </View>
  );
};

export default CreatingCampaign;

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
});
