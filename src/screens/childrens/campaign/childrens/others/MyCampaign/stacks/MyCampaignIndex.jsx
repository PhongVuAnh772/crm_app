import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Modal,
  ActivityIndicator,
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
import Toast from 'react-native-toast-message';

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
import {CHANGE_VALUE_LIST} from '../../../../../../../../slices/list-campaign/listCampaignSlice';
const widthDimensions = Dimensions.get('screen').width;
const widthDimension = Dimensions.get('screen').width;
const heightDimensions = Dimensions.get('screen').height;

const {width} = Dimensions.get('window');
const isSmallScreen = width < 375;

const MyCampaignIndex = () => {
  const dispatch = useDispatch();
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const listCampaign = useSelector(state => state.listCampaigns.info);
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
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const response = await axios.post(`${network}/deleteCampaignAPI`, {
      token: token,
      id: itemSelectMore.id,
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
        setVisibleModalDelete(false); 
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
        dispatch(CHANGE_VALUE_LIST(response.data.listData));
        console.log(token);
      } else {
        setShowLoginModal(true);
      }
    };
    getData();
  }, []);

  return (
    <>
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
            // onPress={() => console.log(listCampaign)}
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
          {listCampaign.length > 0 ? (
            listCampaign.map((data, index) => (
              <TouchableOpacity
                style={styles.itemCardContainer}
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
                  }}>
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
                    <MaterialIcons
                      name="more-horiz"
                      color={'white'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
                  {data.name}
                </Text>

                <View>
                  <Text
                    style={{color: 'white', fontWeight: '600', fontSize: 10}}>
                    Số lượng Checkin : {data.number_checkin}
                  </Text>
                  <Text
                    style={{color: 'white', fontWeight: '600', fontSize: 10,marginTop: 5}}>
                    Số lượng tham gia : {data.number_reg}
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
        <View
          style={{paddingHorizontal: widthDimensions * 0.05, paddingTop: 15}}>
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
        <View
          style={{paddingHorizontal: widthDimensions * 0.05, paddingTop: 15}}>
          <Text style={styles.jobSummaryTitle}>Chiến dịch gần đây</Text>

          {listCampaign.length > 0 ? (
            listCampaign.map((data, index) => (
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
                  marginTop: 10,
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
        <LoginSession
          visible={showLoginModal}
          onCloseModal={handleCloseModal}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
          backgroundStyle={{backgroundColor: 'rgb(20, 14, 56)'}}
          handleIndicatorStyle={{backgroundColor: 'white'}}>
          <BottomSheetScrollView>
            <TouchableOpacity onPress={()=> {
                  bottomSheetModalRef.current?.close();

              navigation.navigate('ListEnjoyingCustomer', {item: itemSelectMore})
              // console.log(itemSelectMore)
            }}>
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
            <TouchableOpacity onPress={() => {
              bottomSheetModalRef.current?.close();
        setVisibleModalDelete(true)
            }}>
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
    </>
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
