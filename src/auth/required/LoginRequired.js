import { StyleSheet, Text, View,Image,Dimensions,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import stickerLogin from '../../auth/assets/loginRequired.png'
import { useNavigation } from '@react-navigation/native';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;
const {width} = Dimensions.get('window');
const isSmallScreen = width < 375;
const LoginRequired = () => {
      const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Image source={stickerLogin} style={styles.stickerLoginAssets} alt=""/>
        <Text style={styles.textLoginRequired}>Bạn không có quyền truy cập, hãy đăng nhập</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonLoginText}>Đăng nhập</Text>
            </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

export default LoginRequired

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',

        alignItems: 'center',
        paddingTop: heightDimension * 0.15,
        height: heightDimension
    },
    stickerLoginAssets: {
        width: isSmallScreen ? 170 : 200,
        height: isSmallScreen ? 170 : 200
    },
    textLoginRequired: {
        fontSize: isSmallScreen ? 15: 20,
        fontWeight: 'bold',
        color:'black',
        paddingTop: heightDimension * 0.03
    },
    buttonContainer: {
        width: '60%',
        height: isSmallScreen ? 40 : 50,
        backgroundColor:'rgb(50, 111, 226)',
                marginTop: heightDimension * 0.05,
                alignItems:'center',
                justifyContent: 'center',
                borderRadius: 10

    },
    buttonLoginText: {
        fontSize: isSmallScreen ? 15: 20,
        color:'white',
        fontWeight: 'bold',
    }
})