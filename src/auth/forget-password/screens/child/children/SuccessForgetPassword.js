import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import successIcon from '../../../assets/success.gif'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native';

const SuccessForgetPassword = () => {
    const navigation = useNavigation();
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Login')
      }, 4000);
    }, [])
    
  return (
    <View style={styles.container}>
      <FastImage
        style={{ width: 400, height: 400 }}
        source={successIcon}
        resizeMode={FastImage.resizeMode.contain}
    />
    <Text style={styles.successTitle}>Đổi mật khẩu thành công</Text>
        <Text style={styles.successDescription}>Mời bạn quay về trang đăng nhập</Text>

    </View>
  )
}

export default SuccessForgetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center'
    },
    successTitle: {
        paddingTop: 10,
        color:'black',
        fontSize: 20,
        fontWeight:'bold',
    },
    successDescription: {
        paddingTop: 20,
        color:'black',
        fontSize: 15,
        fontWeight:'400',
    }
})