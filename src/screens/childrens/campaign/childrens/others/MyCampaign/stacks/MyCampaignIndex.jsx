import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import LoginSession from '../../../../../../../auth/required/LoginSession';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Animated, {
  FadeInUp,
  BounceIn,
  FadeInLeft,
} from 'react-native-reanimated';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import defaultLogo from '../../../../../../../../constants/logo/phoenix-logo.jpg';
const widthDimensions = Dimensions.get('screen').width;
const heightDimensions = Dimensions.get('screen').height;

const {width} = Dimensions.get('window');
const isSmallScreen = width < 375;
const MyCampaignIndex = () => {
  const network = useSelector(state => state.network.ipv4);
  const token = useSelector(state => state.auth.token);
  const [dataCampaign, setDataCampaign] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [itemSelectMore, setItemSelectMore] = useState(null);
  const loginChecking = useSelector(state => state.auth.login);
  const navigation = useNavigation();
  const userData = useSelector(state => state.user.user);
  const snapPoints = useMemo(() => ['25%', '30%'], []);

  const bottomSheetModalRef = useRef(null);
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
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleMore = data => {
    setItemSelectMore(data);
    handlePresentModalPress();
  };
  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${network}/getListCampaignAPI`, {
        token: token,
        limit: 20,
        page: 1,
      });
      console.log(response.data);

      if (response.data && response.data.code === 0) {
        setDataCampaign(response.data.listData);
        console.log(response.data.listData);
        console.log(token);
      } else {
        setShowLoginModal(true);
      }
    };
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          paddingTop: 20,
          color: 'black',
          fontWeight: '700',
          fontSize: 15,
          paddingBottom: 10,
          marginLeft: widthDimensions * 0.05,
        }}>
        Chiến dịch nổi bật
      </Text>
      <ScrollView
        style={{marginRight: 5, maxHeight: 200}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatingCampaign')}
          style={[
            styles.itemCardContainer,
            {
              backgroundColor: 'white',
              borderColor: 'rgb(245, 243, 242)',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: 130,
            },
          ]}>
          {/* <Image source={{uri: userData.avatar}} style={{width: '100%',height: '60%'}} />
           */}
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'rgb(37, 41, 109)',
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="add-sharp" size={20} color="white" />
          </View>

          <Text
            style={{
              color: 'rgb(37, 41, 109)',
              marginTop: 10,
              fontWeight: '500',
            }}>
            Tạo mới
          </Text>
        </TouchableOpacity>
        {dataCampaign.length > 0 ? (
          dataCampaign.map((data, index) => (
            <TouchableOpacity
              style={styles.itemCardContainer}
              key={index}
              onPress={() =>
                navigation.navigate('SpecifiedCampaign', {
                  item: data,
                })
              }>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                  source={{uri: data.img_logo}}
                  alt=""
                  style={[
                    styles.imageContainer,
                    {
                      borderRadius: 25,
                      resizeMode: 'contain',
                      backgroundColor: 'white',
                      //    alignSelf:'flex-end'
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => handleMore(data)}
                  style={{
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons name="more-horiz" color={'white'} size={20} />
                </TouchableOpacity>
              </View>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
                {data.name}
              </Text>

              <View>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 10}}>
                  Số lượng người Checkin : {data.number_checkin}
                </Text>
              </View>
              <View style={styles.itemStatusContainer}>
                <Entypo
                  name="dot-single"
                  color={data.status ? 'rgb(47, 154, 72)' : 'red'}
                  size={20}
                />
                <Text
                  style={{
                    color: data.status ? 'rgb(47, 154, 72)' : 'red',
                    fontWeight: '600',
                    fontSize: 12,
                  }}>
                  {data.status ? 'Kích hoạt' : 'Khóa'}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{height: 180, width: '100%', overflow: 'visible'}}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginLeft={10}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center">
                  <SkeletonPlaceholder.Item
                    width={165}
                    height={200}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center"
                  paddingLeft={10}>
                  <SkeletonPlaceholder.Item
                    width={165}
                    height={200}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )}
      </ScrollView>
      <View style={{paddingHorizontal: widthDimensions * 0.05, paddingTop: 15}}>
        <Text style={styles.jobSummaryTitle}>Chức năng chính</Text>

        <TouchableOpacity
        onPress={() => navigation.navigate('CreatingCampaign')}
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
            <Text style={styles.heading}>Tạo mới chiến dịch</Text>
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
            <FontAwesome name="free-code-camp" color="white" size={18} />
            <Text style={styles.heading}>
              Danh sách chi tiết chiến dịch hiện có
            </Text>
          </View>
          <Entypo name="chevron-right" color="white" size={18} />
        </View>
      </View>
      <View style={{paddingHorizontal: widthDimensions * 0.05, paddingTop: 15}}>
        <Text style={styles.jobSummaryTitle}>Chiến dịch gần đây</Text>

        {dataCampaign.length > 0 ? (
          dataCampaign.map((data, index) => (
            <TouchableOpacity
              style={{
                width: '100%',
                paddingVertical: 10,
                borderWidth: 0.1,
                borderColor: 'rgb(37, 41, 109)',
                flexDirection: 'row',
                borderRadius: 2,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={index}
              onPress={() =>
                navigation.navigate('SpecifiedCampaign', {
                  item: data,
                })
              }>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {data.img_logo === '' ? (
                  <Image
                    source={defaultLogo}
                    alt=""
                    style={[
                      styles.imageContainer,
                      {
                        borderRadius: 25,
                        resizeMode: 'contain',
                        backgroundColor: 'white',
                        //    alignSelf:'flex-end'
                      },
                    ]}
                  />
                ) : (
                  <Image
                    source={{uri: data.img_logo}}
                    alt=""
                    style={[
                      styles.imageContainer,
                      {
                        borderRadius: 25,
                        resizeMode: 'contain',
                        backgroundColor: 'white',
                        //    alignSelf:'flex-end'
                      },
                    ]}
                  />
                )}
                <Text
                  style={{
                    color: 'rgb(37, 41, 109)',
                    fontWeight: '600',
                    fontSize: 13,
                    paddingLeft: 10,
                  }}>
                  {data.name}
                </Text>
              </View>

              <View style={styles.itemStatusContainer}>
                <Entypo
                  name="dot-single"
                  color={data.status ? 'rgb(47, 154, 72)' : 'red'}
                  size={20}
                />
                <Text
                  style={{
                    color: data.status ? 'rgb(47, 154, 72)' : 'red',
                    fontWeight: '600',
                    fontSize: 12,
                  }}>
                  {data.status ? 'Kích hoạt' : 'Khóa'}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{height: 180, width: '100%', overflow: 'visible'}}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                flexDirection="column"
                alignItems="center"
                marginLeft={10}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center">
                  <SkeletonPlaceholder.Item
                    width={400}
                    height={40}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center"
                  paddingTop={10}>
                  <SkeletonPlaceholder.Item
                    width={400}
                    height={40}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center"
                  paddingTop={10}>
                  <SkeletonPlaceholder.Item
                    width={400}
                    height={40}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center"
                  paddingTop={10}>
                  <SkeletonPlaceholder.Item
                    width={400}
                    height={40}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )}
      </View>
      <View style={styles.processContainer}>
        <View style={styles.processContentContainer}></View>
      </View>
      <LoginSession visible={showLoginModal} onCloseModal={handleCloseModal} />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{backgroundColor: 'rgb(20, 14, 56)'}}
        handleIndicatorStyle={{backgroundColor: 'white'}}>
        <BottomSheetScrollView>
          <TouchableOpacity>
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
                  height: isSmallScreen ? 35 : 45,
                  width: isSmallScreen ? 35 : 45,
                  backgroundColor: 'white',
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialIcons
                  name="find-in-page"
                  size={isSmallScreen ? 18 : 20}
                  color="rgb(20, 14, 56)"
                />
              </View>
              <Text
                style={{
                  fontSize: isSmallScreen ? 14 : 18,
                  color: 'white',
                  paddingLeft: 15,
                }}>
                Xem khách hàng tham gia
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bottomSheetModalRef.current?.close();
              navigation.navigate('SpecifiedCampaign', {
                item: itemSelectMore,
              });
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
                  height: isSmallScreen ? 35 : 45,
                  width: isSmallScreen ? 35 : 45,
                  backgroundColor: 'white',
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome
                  name="edit"
                  size={isSmallScreen ? 15 : 20}
                  color="rgb(20, 14, 56)"
                />
              </View>
              <Text
                style={{
                  fontSize: isSmallScreen ? 14 : 18,
                  color: 'white',
                  paddingLeft: 15,
                }}>
                Sửa thông tin
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
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
                  height: isSmallScreen ? 35 : 45,
                  width: isSmallScreen ? 35 : 45,
                  backgroundColor: 'white',
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialIcons
                  name="delete"
                  size={isSmallScreen ? 18 : 20}
                  color="rgb(20, 14, 56)"
                />
              </View>
              <Text
                style={{
                  fontSize: isSmallScreen ? 14 : 18,
                  color: 'white',
                  paddingLeft: 15,
                }}>
                Xóa chiến dịch
              </Text>
            </View>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </ScrollView>
  );
};

export default MyCampaignIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingBottom: heightDimensions * 0.5,
  },
  itemCardContainer: {
    width: 165,
    height: 200,
    backgroundColor: 'rgb(57, 55, 142)',
    marginLeft: widthDimensions * 0.05,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  itemStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(245, 243, 242)',
  },
  processContainer: {
    flex: 1,
    // paddingVertical: 10,
    paddingHorizontal: widthDimensions * 0.05,
  },
  processContentContainer: {
    width: '100%',
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  jobSummaryTitle: {
    color: 'rgb(37, 41, 109)',
    fontSize: isSmallScreen ? 15 : 18,
    fontWeight: 'bold',
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
