import {
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;

const LoginSession = ({visible,onCloseModal}) => {
    const navigation = useNavigation();
    const handleLogin = () => {
    onCloseModal(); 
    navigation.navigate('Login') }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.centeredViewChanging}>
        <View style={styles.modalViewChanging}>
          <Text style={styles.titleLoginRequired}>Phiên đăng nhập hết hạn</Text>
          <Text style={styles.descriptionLoginRequired}>
            Vui lòng đăng nhập lại để đảm bảo an toàn cho tài khoản của bạn !
          </Text>
          <TouchableOpacity
onPress={handleLogin}          style={{
              width: '100%',
              paddingVertical: 7,
              backgroundColor: 'rgb(37, 41, 109)',
              marginTop: 10,
              justifyContent:'center',
              alignItems: 'center',
              borderRadius: 10
            }}>
            <Text style={{color:'white',fontWeight:'600',fontSize:18}}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LoginSession;

const styles = StyleSheet.create({
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
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  descriptionLoginRequired: {
    fontSize: 13,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
