import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import avatarNull from '../../../../assets/avatar-null.png'
const CustomDrawer = props => {
      const userData = useSelector(state => state.user.user);
    const loginChecking = useSelector(state => state.auth.login);

  return (
    <View style={{flex: 1,position:'relative'}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('./assets/menu-bg.jpeg')}
          style={{padding: 20}}>
          
          {loginChecking ? <Image alt=""
  source={{uri : userData.avatar}}
              style={{height: 60, width: 60, borderRadius: 40, marginBottom: 10,backgroundColor:'white',resizeMode:'contain'}}

/> : <Image alt=""
  source={avatarNull}
              style={{height: 60, width: 60, borderRadius: 40, marginBottom: 10,backgroundColor:'white'}}

/>}
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {userData ? userData.name : 'Bạn chưa đăng nhập'}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              {userData ? userData.email : ''}
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 5, borderTopWidth: 1, borderTopColor: '#ccc',position:'absolute',bottom: 55,width:'100%',paddingLeft: 15}}>
        
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={18} color="black"/>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color:'black'
              }}>
              Chia sẻ ứng dụng
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={18} color="black"/>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,color:'black'
              }}>
              Đăng xuất
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
