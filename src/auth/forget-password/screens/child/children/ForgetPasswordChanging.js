import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import forgetPassword from '../../../assets/log-in.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const heightDimensions = Dimensions.get('screen').height;
const widthDimensions = Dimensions.get('screen').width;

const ForgetPasswordChanging = ({ route }) => {
  const navigation = useNavigation();
  const { codeForgot,phonePass } = route.params;

  const network = useSelector(state => state.network.ipv4);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [errMessage, setErrorMessage] = useState(false);
  const [errorMessageNotMatch, setErrorMessageNotMatch] = useState(false);
    const [errorMessageNotMatchCode, setErrorMessageNotMatchCode] = useState(false);

  const handleForgetPassword = async () => {
    setLoading(true);
    if (password !== rePassword && password === "" || rePassword === "")  {
      setErrorMessageNotMatch(true);
          setLoading(false);


    }
    else if (codeForgot.toString() !== verifyCode) {
      setErrorMessageNotMatchCode(true)
                setLoading(false);

    }
    else {
      const response = await axios.post(
      `${network}/saveNewPassAPI`,
      {
        phone: phonePass.toString(),
        code: verifyCode,
        passNew: password,
        passAgain: rePassword
      },
    );
    if (response.data && response.data.code === 0) {
      setLoading(false);
      navigation.navigate('SuccessForgetPassword');
    } else {
      setLoading(false);
      setErrorMessage(true);
    }
    }
  };
 
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <Image source={forgetPassword} style={styles.imageLogo} alt=""/>
        <Text style={styles.forgetPasswordTitle}>Thay đổi mật khẩu</Text>
        <View style={styles.textInputContainer}>
          <FontAwesome name="lock" size={20} color="rgb(169, 177, 189)" />
          <TextInput
            style={styles.input}
                        placeholderTextColor="gray"

            onChangeText={text => {
              setErrorMessage(false);
              setErrorMessageNotMatch(false);
              setErrorMessageNotMatchCode(false);
              setPassword(text);
            }}
            value={password}
            placeholder="Mật khẩu"
            
          />
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome name="lock" size={20} color="rgb(169, 177, 189)" />
          <TextInput
            style={styles.input}
                        placeholderTextColor="gray"

            onChangeText={text => {
              setErrorMessage(false);
              setErrorMessageNotMatch(false);
              setErrorMessageNotMatchCode(false);
              setRePassword(text);
            }}
            value={rePassword}
            placeholder="Thay đổi mật khẩu"
            
          />
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome name="check-square-o" size={18} color="rgb(169, 177, 189)" />
          <TextInput
            style={styles.input}
                        placeholderTextColor="gray"

            onChangeText={text => {
              setErrorMessage(false);
              setErrorMessageNotMatch(false);
              setErrorMessageNotMatchCode(false);
              setVerifyCode(text);
            }}
            value={verifyCode}
            placeholder="Mã xác nhận"
            keyboardType="numeric"
          />
        </View>
        {errMessage && (
          <Text
            style={[
              styles.loginButtonForgotText,
              {color: 'red', fontWeight: '500'},
            ]}>
            Tài khoản không tồn tại hoặc sai số điện thoại
          </Text>
        )}
        {errorMessageNotMatch && (
          <Text
            style={[
              styles.loginButtonForgotText,
              {color: 'red', fontWeight: '500'},
            ]}>
            Mật khẩu để trống hoặc không trùng với nhau, hãy thử lại
          </Text>
        )}
        {errorMessageNotMatchCode && (
          <Text
            style={[
              styles.loginButtonForgotText,
              {color: 'red', fontWeight: '500'},
            ]}>
            Mã xác nhận không đúng, hãy thử lại
          </Text>
        )}
        <TouchableOpacity onPress={() => handleForgetPassword()}>
          <View style={styles.buttonContainer}>
            {loading ? (
              <View style={{flexDirection:'row'}}><ActivityIndicator size="small" color="white" />
                            <Text style={styles.buttonTextLoading}>Đang kiểm tra ...</Text>
</View>
            ) : (
              <Text style={styles.buttonText}>Đồng ý thay đổi</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgetPasswordChanging;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: heightDimensions * 0.1,
    paddingHorizontal: widthDimensions * 0.05,
  },
  imageLogo: {
    width: widthDimensions * 0.6,
    height: heightDimensions * 0.3,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  forgetPasswordTitle: {
    fontSize: 30,
    paddingTop: 20,
    color: 'black',
    fontWeight: '700',
    paddingBottom: 10
  },
  forgetPasswordDescription: {
    paddingTop: 10,
    color: 'black',
    fontWeight: '600',
    marginTop: heightDimensions * 0.02,
  },
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: widthDimensions * 0.1,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    width: '100%',
    borderColor: 'rgb(239, 239, 242)',
    fontSize: 15,
    color: 'black',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 101, 255)',
    paddingVertical: 10,
    marginTop: heightDimensions * 0.05,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  buttonTextLoading: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    paddingLeft: 10
  },
  loginButtonForgotText: {
    color: 'rgb(5, 106, 255)',
    marginTop: heightDimensions * 0.01,
    fontSize: 15,
  },
});
