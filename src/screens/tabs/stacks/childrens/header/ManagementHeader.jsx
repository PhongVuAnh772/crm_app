import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import avatarNull from '../../../../assets/avatar-null.png'
const ManagementHeader = () => {
  const navigation = useNavigation()
  const userData = useSelector(state => state.user.user)
  const loginChecking = useSelector(state => state.auth.login);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
       
      {loginChecking ? <Image alt=""
  source={{uri : userData.avatar}}
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
/> : <Image alt=""
  source={avatarNull}
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
/>}
      <View style={{paddingLeft: 15,paddingTop: 5}}>

        <Text style={{color:'black'}}>Chủ TK: <Text style={{fontWeight:'bold'}}>{userData.name}</Text></Text>
        <Text style={{color:'black',paddingTop: 5}}>SĐT: <Text style={{fontWeight:'bold'}}>{userData.phone}</Text></Text>
      </View>
      </View>
      
      <View style={styles.iconContainer}
       >
        
        <TouchableOpacity
               onPress={() =>navigation.goBack()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: 'rgb(37, 41, 109)',
            shadowColor: 'black',
            shadowOffset: {width: -22, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            borderColor: 'rgb(232, 228, 232)',
            borderWidth: 1.5,
          }}>
          <FontAwesome name="chevron-left" size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: 'rgb(37, 41, 109)',
            shadowColor: 'black',
            shadowOffset: {width: -22, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            marginLeft: 15,
            borderColor: 'rgb(232, 228, 232)',
            borderWidth: 1.5,
          }}>
          <Entypo name="menu" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManagementHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
    backgroundColor: 'white',
  },
  imageLogo: {
    width: '31%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    paddingLeft: '10%',
  },
  buttonIcon: {
    // paddingHorizontal:2,
    // paddingVertical:2,
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
