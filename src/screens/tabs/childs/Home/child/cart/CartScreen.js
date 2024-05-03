import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import CartItem from './content/cart-item/CartItem';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;

const {width} = Dimensions.get('window');
const isSmallScreen = width < 375;

const CartScreen = () => {
  const network = useSelector(state => state.network.ipv4);
  const token = useSelector(state => state.auth.token);
  // const userData = useSelector(state => state/
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantityProduct;
    });
    return totalPrice;
  };
  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('@cart');
      setCart([]);
      setModalVisible(false);
    } catch (error) {
      console.log('Lỗi khi xóa sản phẩm trong kho:', error);
    }
  };
  const [errVoucher, setErrVoucher] = useState(false);
  const [cart, setCart] = useState([]);
  const formatPrice = price => {
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${formattedPrice} đ`;
  };
  const handlePaying = async () => {
    setLoading(true);
  };
  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('@cart');
        if (cartData !== null) {
          setCart(JSON.parse(cartData));
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCartData();
  }, []);
  const [codeVoucherInput, setCodeVoucherInput] = useState('');
  const [successVoucher, setSuccessVoucher] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleVoucher = async () => {
    setLoading(true);
    const response = await axios.post(
      `${network}/searchDiscountCodeReservedAPI`,
      {
        code: codeVoucherInput,
      },
    );
    if (response.data && response.data.code === 0) {
      setLoading(false);
      setSuccessVoucher(true);
    } else {
      setLoading(false);

      setErrVoucher(true);
    }
  };
  const addToCart = async item => {
    try {
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      await AsyncStorage.setItem('@cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  const removeFromCart = async itemIndex => {
    try {
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);
      setCart(updatedCart);
      await AsyncStorage.setItem('@cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.4)" />

        <View style={styles.centeredViewModal}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có muốn xóa sản phẩm trong kho không ?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.buttonModal, {backgroundColor: 'gray'}]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonModalText}>Không</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonModal,
                  {marginLeft: 20, backgroundColor: 'rgb(37, 41, 109)'},
                ]}
                onPress={() => clearCart()}>
                <Text style={styles.buttonModalText}>Có</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        {/* <HeaderCart />
         */}
        <View style={styles.containerHeader}>
          <TouchableOpacity
            style={styles.iconCartContainer}
            onPress={() => navigation.goBack()}>
            <FontAwesome6
              name="chevron-left"
              size={isSmallScreen ? 15 : 18}
              color="rgb(37, 41, 109)"
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Giỏ hàng</Text>
          <TouchableOpacity
            style={styles.iconCartContainer}
            onPress={() => setModalVisible(true)}>
            <FontAwesome6
              name="trash"
              size={isSmallScreen ? 15 : 18}
              color="rgb(37, 41, 109)"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {cart.length > 0 ? (
            cart.map((item, index) => <CartItem item={item} key={index} />)
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
      <View style={styles.priceAllContainer}>
        <View
          style={{
            width: '100%',
            marginBottom: 20,
            paddingHorizontal: widthDimension * 0.02,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View style={{width: '70%'}}>
            <Text
              style={{
                fontSize: isSmallScreen ? 13 : 15,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Phoenix Voucher
            </Text>
            {errVoucher && (
              <Text style={{color: 'red', textAlign: 'left', paddingTop: 5}}>
                Voucher không đúng, hãy thử lại
              </Text>
            )}
            {successVoucher && (
              <Text style={{color: 'green', textAlign: 'left', paddingTop: 5}}>
                Voucher đã được áp dụng thành công
              </Text>
            )}
            <TextInput
              style={[
                styles.inputVoucher,
                {borderColor: errVoucher ? 'red' : 'black'},
              ]}
              onChangeText={text => {
                setCodeVoucherInput(text);
              }}
              // value={number}
              placeholder="Mã giảm giá"
              keyboardType="numeric"
            />
          </View>
          {codeVoucherInput !== '' ? (
            <TouchableOpacity
              style={{
                width: '30%',
                paddingVertical: 12,
                backgroundColor: 'rgb(37, 41, 109)',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => handleVoucher()}>
              <Text style={{color: 'white'}}>Áp dụng</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: '30%',
                paddingVertical: 12,
                backgroundColor: 'gray',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => handleVoucher()}>
              <Text style={{color: 'white'}}>Áp dụng</Text>
            </View>
          )}
        </View>
        <View style={styles.priceContainer}>
          <View style={{width: '50%'}}>
            <Text style={styles.priceTitle}>Tổng tiền</Text>
            <Text style={styles.priceSpecified}>
              {formatPrice(calculateTotalPrice())}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handlePaying()}
            style={{width: '50%'}}>
            <View
              style={[
                styles.buttonContainer,
                {width: loading && 180, height: loading && 70},
              ]}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Thanh toán</Text>
                  <View style={styles.iconButtonContainer}>
                    <FontAwesome6
                      name="cart-arrow-down"
                      size={15}
                      color="rgb(37, 41, 109)"
                    />
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  inputVoucher: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    width: '90%',
    borderRadius: 10,
  },
  buttonModalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonModal: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: widthDimension * 0.05,
  },
  iconCartContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgb(245, 228, 235)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    fontSize: isSmallScreen ? 18 : 23,
    color: 'black',
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthDimension * 0.02,
  },
  container: {
    flex: 1,
    paddingTop: heightDimension * 0.02,
    position: 'relative',
    paddingBottom: heightDimension * 0.165,
    backgroundColor: 'white',
  },
  priceAllContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingHorizontal: widthDimension * 0.05,
    paddingVertical: heightDimension * 0.04,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
  },
  priceTitle: {
    fontSize: isSmallScreen ? 13 : 18,
    fontWeight: 'bold',
    color: 'rgb(143, 132, 137)',
  },
  priceSpecified: {
    fontSize: isSmallScreen ? 25 : 30,
    fontWeight: 'bold',
    color: 'black',
    paddingRight: 10,
  },
  buttonContainer: {
    backgroundColor: 'rgb(37, 41, 109)',
    paddingVertical: 20,
    paddingHorizontal: widthDimension * 0.1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: isSmallScreen ? 15 : 20,
  },
  iconButtonContainer: {
    marginLeft: 15,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});
