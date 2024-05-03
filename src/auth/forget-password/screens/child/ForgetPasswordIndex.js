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
  ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';
import forgetPassword from '../../assets/security.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const heightDimensions = Dimensions.get('screen').height;
const widthDimensions = Dimensions.get('screen').width;

const ForgetPasswordIndex = () => {  const navigation = useNavigation();

      const network = useSelector(state => state.network.ipv4);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  const handleForgetPassword = async () => {
    setLoading(true);
    const response = await axios.post(`${network}/requestCodeForgotPasswordAPI`, {
      phone: phone,
    });
    if (response.data && response.data.code === 0) {
      setLoading(false);

      navigation.navigate('ForgetPasswordChanging', {
        codeForgot: response.data.codeForgotPassword,
        phonePass: phone
      });
    } else {
      setLoading(false);

      setErrorMessage(true);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <Image source={forgetPassword} style={styles.imageLogo} alt=""/>
        <Text style={styles.forgetPasswordTitle}>Quên mật khẩu?</Text>
        <Text style={styles.forgetPasswordDescription}>
          Đừng lo, chúng tôi sẽ giúp bạn. Hãy nhập đúng thông tin để có thể lấy
          lại mật khẩu nhé !
        </Text>
        <View style={styles.textInputContainer}>
          <FontAwesome name="phone" size={20} color="rgb(169, 177, 189)" />
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
                setErrorMessage(false);
                setPhone(text)
            }}
            value={phone}
            placeholder="Số điện thoại"
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>{errMessage && (
          <Text
            style={[
              styles.loginButtonForgotText,
              {color: 'red', fontWeight: '500'},
            ]}>
            Số điện thoại không tồn tại hoặc không được cài email, hãy thử lại
          </Text>
        )}
        <TouchableOpacity onPress={() => handleForgetPassword()}>
          <View style={styles.buttonContainer}>
            
            {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Đồng ý</Text>
          )}
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgetPasswordIndex;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: heightDimensions * 0.1,
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
  },
  forgetPasswordDescription: {
    paddingTop: 10,
    color: 'black',
    fontWeight: '600',
    marginTop: heightDimensions * 0.02,
  },
  textInputContainer: {
    width: '100%',
    marginTop: heightDimensions * 0.05,
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
    color:'black'
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
  loginButtonForgotText: {
    color: 'rgb(5, 106, 255)',
    marginTop: heightDimensions * 0.01,
    fontSize: 15,
  },
});
