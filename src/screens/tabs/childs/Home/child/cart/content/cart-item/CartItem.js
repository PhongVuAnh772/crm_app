import {StyleSheet, Text, View, Dimensions,Image} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;

const CartItem = () => {
  return (
    <View style={styles.container}>
      
        <Image source={{uri: 'https://crm.zikii.vn/upload/admin/files/logozikii.png'}} style={{
          height: '100%',
          width: '30%',
          borderRadius: 15,
          resizeMode:'contain',
          borderWidth: 2,
          borderColor: 'rgb(232, 239, 251)'
        }} />

      <View style={styles.cartItemInformationContainer}>
        <View style={styles.cartItemInformationTopContainer}>
          <Text style={styles.cartItemInformationTitle}>
            Men Classic Fit Dress Suit Classic Fit Dress Suit
          </Text>
          <Text style={styles.cartItemDescription}>Size: L</Text>
          <Text style={styles.cartItemDescription}>Color: blue</Text>
        </View>
        <View style={styles.cartItemInformationBottomContainer}>
          <View style={styles.cartItemValueContainer}>
            <View style={styles.cartItemButtonValueContainer}>
              <FontAwesome6 name="trash" size={15} color="rgb(42, 112, 234)" />
            </View>
            <Text style={styles.cartItemButtonValueText}>1</Text>
            <View style={styles.cartItemButtonValueContainer}>
              <FontAwesome6 name="add" size={15} color="rgb(42, 112, 234)" />
            </View>
              
          </View>
          <Text style={styles.priceText}>Tổng: <Text style={{color:"rgb(42, 112, 234)"}}>16.57$</Text></Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 170,
    flexDirection: 'row',
    marginTop: heightDimension * 0.02,
            paddingHorizontal: widthDimension * 0.05,
            backgroundColor:'white',
            paddingVertical: heightDimension * 0.01

  },
  cartItemInformationContainer: {
    paddingLeft: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  cartItemInformationTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    paddingRight: 100,
  },
  cartItemDescription: {
    fontSize: 16,
    paddingTop: 3,
  },
  cartItemInformationBottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'space-between'

  },
  cartItemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemButtonValueContainer: {
    width: 35,
    height: 35,
    backgroundColor: 'rgb(234, 238, 251)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemButtonValueText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
        // paddingLeft: 30

  },
  cartItemPriceContainer: {

  },
});
