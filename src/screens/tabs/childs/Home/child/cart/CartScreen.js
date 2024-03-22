import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import HeaderCart from './header/HeaderCart';
import ContentCart from './content/ContentCart';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'


const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;

const CartScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <HeaderCart />
        <ContentCart />
        
      </View>
      <View style={styles.priceAllContainer}>
          <View>
            <Text style={styles.priceTitle}>Tổng tiền</Text>
            <Text style={styles.priceSpecified}>$55.08</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Thanh toán</Text>
              <View style={styles.iconButtonContainer}>
                <FontAwesome6 name="cart-arrow-down" size={15} color="rgb(42, 112, 234)"/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: heightDimension * 0.02,
    position: 'relative',
    paddingBottom: heightDimension * 0.165,
    backgroundColor: 'white'
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(143, 132, 137)',
  },
  priceSpecified: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: 'rgb(42, 112, 234)',
    paddingVertical: 20,
    paddingHorizontal: widthDimension * 0.1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconButtonContainer: {
    marginLeft: 15,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
        justifyContent: 'center',
alignItems:'center'
  },
});
