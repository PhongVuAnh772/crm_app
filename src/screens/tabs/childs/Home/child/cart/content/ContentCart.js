import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CartItem from './cart-item/CartItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;

const ContentCart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('@cart');
        if (cartData !== null) {
          setCart(JSON.parse(cartData));
        }
        else {
          setCart([])
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCartData();
  }, []);
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>    
      {cart.length > 0 && cart.map((item, index) => (
      <CartItem item={item}/>
    ))}
    </ScrollView>
  );
};

export default ContentCart;

const styles = StyleSheet.create({
  container: {
    paddingTop: heightDimension * 0.01,
    // paddingBottom: heightDimension * 0.
  },
});
