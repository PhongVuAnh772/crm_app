import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import zikiProduct from './image.png';
import zikiiLogoWhite from '../../constants/logo/phoenix-logo-other.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {UPDATE_USER_DATA} from '../../slices/users/userSlice';
import {useNavigation} from '@react-navigation/native';
import {
  UPDATE_LOGIN_REQUIRED,
  UPDATE_TOKEN_REQUIRED,
} from '../../slices/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorConstants } from '../../constants/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const LoginScreen = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const network = useSelector(state => state.network.ipv4);
  const [visible,setVisible] =useState(true)
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [inputPhone, setInputPhone] = useState('0366886886');
  const [inputPassword, setInputPassword] = useState('123456');
  const [errMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    const storedTokenDevice = await AsyncStorage.getItem('token_device');
    setLoading(true);
    const response = await axios.post(`${network}/checkLoginMemberAPI`, {
      phone: inputPhone,
      password: inputPassword,
      token_device: storedTokenDevice
    });
    if (response.data && response.data.code === 0) {
      dispatch(UPDATE_USER_DATA(response.data.info_member));
      dispatch(UPDATE_LOGIN_REQUIRED());

      dispatch(UPDATE_TOKEN_REQUIRED(response.data.info_member.token));
      await AsyncStorage.setItem(
        'user_data',
        JSON.stringify(response.data.info_member),
      );
      await AsyncStorage.setItem(
        'token',
        JSON.stringify(response.data.info_member.token),
      );

      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeTabNavigators'}],
      });
      // navigation.navigate('HomeTabNavigators');
    } else {
      setLoading(false);

      setErrorMessage(true);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colorConstants.primaryColor} />
      <Image
        source={zikiProduct}
        resizeMode="contain"
        style={styles.imageBackground} alt=""></Image>
      <View style={styles.containerBackground}>
        <Image source={zikiiLogoWhite} style={styles.logoAssets} alt=""/>
        <View style={styles.containerLogoHelp}>
          <MaterialIcons name="support-agent" size={20} color="black" />
        </View>
      </View>
      <ScrollView style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Đăng nhập</Text>
        <View
          style={[
            styles.inputContainer,
            isFocusedUsername && styles.focusedInput,
          ]}>
          <Text
            style={[styles.labelText, isFocusedUsername && styles.focusedText]}>
            Số điện thoại
          </Text>
          <TextInput
            style={[styles.input, isFocusedUsername && styles.focusedInput]}
            onFocus={() => setIsFocusedUsername(true)}
            onBlur={() => setIsFocusedUsername(false)}
            placeholderTextColor="gray"
            maxLength={12}
            keyboardType="numeric"
            onChangeText={text => {
              setErrorMessage(false);
              setInputPhone(text);
            }}
            autoFocus
            value={inputPhone}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            isFocusedPassword && styles.focusedInput,
          ]}>
          <Text
            style={[styles.labelText, isFocusedPassword && styles.focusedText]}>
            Mật khẩu
          </Text>
          <TextInput
            style={[styles.input]}
            secureTextEntry={visible}
            placeholderTextColor="gray"
            maxLength={50}
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsFocusedPassword(false)}
            onChangeText={text => {
              setInputPassword(text);
              setErrorMessage(false);
            }}
            
            value={inputPassword}
          />
          <TouchableOpacity style={{position:'absolute',top: '70%',right: 15,width: 20,height: 20}} onPress={() => setVisible(!visible)}><Ionicons name={visible ? "eye-outline" :  "eye-off-outline"} color="black" size={18} /></TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPasswordIndex')}>
          <Text style={styles.loginButtonForgotText}>Quên mật khẩu ?</Text>
        </TouchableOpacity>
        {errMessage && (
          <Text
            style={[
              styles.loginButtonForgotText,
              {color: 'red', fontWeight: '500'},
            ]}>
            Sai tài khoản hoặc mật khẩu, hãy thử lại
          </Text>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLogin()}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstants.primaryColor,
    position: 'relative',
    // alignItems: 'center',
  },
  loginContainer: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: heightDimension * 0.02,
    paddingHorizontal: widthDimension * 0.05,
  },
  loginTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
  },
  inputContainer: {
    width: '100%',
    borderColor: 'rgb(245, 245, 245)',
    borderWidth: 1,
    marginTop: 15,
    paddingTop: heightDimension * 0.01,
    paddingHorizontal: widthDimension * 0.03,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    fontSize: 18,
    color: 'black',
  },
  labelText: {
    color: 'rgb(114, 119, 127)',
    fontSize: 17,
  },
  focusedText: {
    color: colorConstants.primaryColor, // Màu văn bản khi focus
  },
  focusedInput: {
    borderColor: colorConstants.primaryColor, // Màu viền khi focus
  },
  loginButton: {
    backgroundColor: colorConstants.primaryColor,
    marginTop: heightDimension * 0.03,
    paddingVertical: heightDimension * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
  },
  loginButtonForgotText: {
    color: colorConstants.primaryColor,
    marginTop: heightDimension * 0.03,
    fontSize: 16,
  },
  imageBackground: {
    width: '100%',
    height: '63%',
    borderRadius: 10
  },
  logoAssets: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  containerBackground: {
    position: 'absolute',
    top: 20,
    paddingHorizontal: widthDimension * 0.05,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  containerLogoHelp: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    alignSelf: 'center',
  },
});
