import {StyleSheet, Text, View, Dimensions, Image,TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import manIcon from '../assets/man.png';
import campaignIcon from '../assets/marketing.png';
import affiliateIcon from '../assets/affiliate-marketing.png';
import examDoing from '../assets/exam2.png';
import cartViewing from '../assets/empty-cart.png';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import avatarNull from '../../../../assets/avatar-null.png'
import Animated, {FadeInUp,BounceIn,FadeInRight} from 'react-native-reanimated';
import { colorConstants } from '../../../../../../constants/colors/colors';
const widthDimensions = Dimensions.get('screen').width;
const heightDimensions = Dimensions.get('screen').height;
const { width } = Dimensions.get('window');
const isSmallScreen = width < 375; 

const GreetingUser = () => {
  const loginChecking = useSelector(state => state.auth.login);
  const navigation = useNavigation();
  const userData = useSelector(state => state.user.user);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          paddingHorizontal: heightDimensions * 0.015,
          paddingVertical: heightDimensions * 0.015,
        }}>
        <Animated.View 
         entering={BounceIn.duration(500)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            width: '100%',
            backgroundColor: colorConstants.primaryColor,
            paddingHorizontal: 15,
            borderRadius: 10,
            marginVertical: 10,
          }}>
          
 {loginChecking ? <Image
  source={{uri : userData.avatar}} alt=""
  style={[
    styles.imageContainer,
    { borderRadius: 25, resizeMode: 'contain', backgroundColor: 'white' }
  ]}
/> : <Image
  source={avatarNull} alt=""
  style={[
    styles.imageContainer,
    { borderRadius: 25, resizeMode: 'contain', backgroundColor: 'white' }
  ]}
/>}
          <View style={{justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '400',
                color: 'white',
                paddingLeft: 10,
                paddingBottom: 10,
              }}>
              
              {loginChecking ? 'Chào mừng trở lại !' : 'Chào mừng !'}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: 'white',
                paddingLeft: 10,
              }}>
              
              {loginChecking ? userData.name : 'Bắt đầu đăng nhập'}
            </Text>
          </View>
        </Animated.View>
        {/* rgb(250, 250, 252) */}
        <Text style={styles.textTitle}>Bộ lọc công việc</Text>

        <Animated.View 
         entering={FadeInRight.duration(500)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: heightDimensions * 0.015,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(250, 250, 252)',
              paddingVertical: 5,
              width: '48%',
              paddingHorizontal: 5,
              borderRadius: 10,
            }}>
            <View
              style={[
                styles.imageContainer,
                {backgroundColor: colorConstants.secondaryColor},
              ]}>
              <Image source={affiliateIcon} style={styles.imageSpecified} alt=""/>
            </View>
            <TouchableOpacity style={{justifyContent: 'space-between'}} onPress={() => navigation.navigate('AgentTreeStacks')}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: 'black',
                  paddingLeft: 10,
                  paddingBottom: 10,
                }}>
                Đào tạo
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: 'black',
                  paddingLeft: 10,
                }}>
                {isSmallScreen ? 'HT' : 'Hệ thống'} tuyến dưới
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(250, 250, 252)',
              paddingVertical: 5,
              width: '48%',
              paddingHorizontal: 5,
              borderRadius: 10,
            }}>
            <View
              style={[
                styles.imageContainer,
                {backgroundColor: colorConstants.secondaryColor},
              ]}>
              <Image source={examDoing} style={styles.imageSpecified} alt=""/>
            </View>
            <TouchableOpacity style={{justifyContent: 'space-between'}} onPress={() => console.log(userData)}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: 'black',
                  paddingLeft: 10,
                  paddingBottom: 10,
                }}>
                Kiến thức {isSmallScreen ? '' : 'Phoenix'}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: 'black',
                  paddingLeft: 10,
                }}>
                Hệ thống thi
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
        entering={FadeInRight.duration(500)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
          onPress={() => navigation.navigate('CampaignStacks')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(250, 250, 252)',
              paddingVertical: 5,
              width: '48%',
              paddingHorizontal: 5,
              borderRadius: 10,
            }}>
            <View
              style={[
                styles.imageContainer,
                {backgroundColor: colorConstants.secondaryColor},
              ]}>
              <Image source={campaignIcon} style={styles.imageSpecified} alt=""/>
            </View>
            <View style={{justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: 'black',
                  paddingLeft: 10,
                  paddingBottom: 10,
                }}>
                Thực chiến
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: 'black',
                  paddingLeft: 10,
                }}>
                Chiến dịch {isSmallScreen ? 'CĐ' : 'cộng đồng'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CustomerManagement')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(250, 250, 252)',
              paddingVertical: 5,
              width: '48%',
              paddingHorizontal: 5,
              borderRadius: 10,
            }}>
            <View
              style={[
                styles.imageContainer,
                {backgroundColor: colorConstants.secondaryColor},
              ]}>
              <Image source={cartViewing} style={styles.imageSpecified} alt=""/>
            </View>
            <View style={{justifyContent: 'space-between'}} >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: 'black',
                  paddingLeft: 10,
                  paddingBottom: 10,
                }}>
                Mua / bán
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: 'black',
                  paddingLeft: 10,
                }}>
                Quản lý {isSmallScreen ? 'KH' : 'Khách hàng'}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default GreetingUser;

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSpecified: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  textTitle: {
    color: 'black',
    fontWeight: '700',
    fontSize:                 isSmallScreen ? 15 :21,
    marginTop: 10,
  },
});
