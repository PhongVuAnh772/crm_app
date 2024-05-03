import {StyleSheet, Text, View, Dimensions,Image} from 'react-native';
import React,{useEffect} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;
const {width} = Dimensions.get('window');
const isSmallScreen = width < 375;
const CartItem = ({item}) => {
  
  const formatPrice = price => {
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedPrice} đ`;
  };
  
  return (
    <View style={styles.container}>
      
        <Image source={{uri: item.image}} alt="" style={{
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
            {item.title}
          </Text>
          <Text style={styles.cartItemDescription}>Số lượng hiện có: {item.quantity}</Text>
          <Text style={styles.cartItemDescriptionPrice}>Giá gốc: {formatPrice(item.price)}</Text>
                    <Text style={styles.cartItemDescriptionQuantity}>Số lượng bạn đặt: {item.quantityProduct}</Text>

        </View>
        <View style={styles.cartItemInformationBottomContainer}>
          <View style={styles.cartItemValueContainer}>
            {/* <View style={styles.cartItemButtonValueContainer}>
              <FontAwesome6 name="trash" size={15} color="rgb(42, 112, 234)" />
            </View> */}
            {/* <Text style={styles.cartItemButtonValueText}>{item.quantityProduct}</Text> */}
            {/* <View style={styles.cartItemButtonValueContainer}>
              <FontAwesome6 name="add" size={15} color="rgb(42, 112, 234)" />
            </View> */}
              
          </View>
          <Text style={styles.priceText}>Tổng: <Text style={{color:"rgb(42, 112, 234)"}}>{formatPrice(item.quantityProduct * item.price)}</Text></Text>
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
    fontSize: 17,
    paddingTop: 3,
    color:'black'
  },
  cartItemDescriptionPrice: {
    fontSize: 19,
    paddingTop: 3,
    color:'blue',
    fontWeight: '500',
  },
  cartItemDescriptionQuantity: {
   fontSize: 19,
    paddingTop: 3,
    color:'red',
    fontWeight: '500',
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
