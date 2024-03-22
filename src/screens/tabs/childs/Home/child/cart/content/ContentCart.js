import { StyleSheet, Text, View,Image,Dimensions, ScrollView,FlatList } from 'react-native'
import React from 'react'
import CartItem from './cart-item/CartItem';

const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;
const ContentCart = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />

    </ScrollView>
  )
}

export default ContentCart

const styles = StyleSheet.create({
    container: {
        paddingTop: heightDimension * 0.01,
            // paddingBottom: heightDimension * 0.

    }
})