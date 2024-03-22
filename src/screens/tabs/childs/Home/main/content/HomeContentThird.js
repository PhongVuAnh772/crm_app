import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'

const widthDimension = Dimensions.get('screen').width
const heightDimension = Dimensions.get('screen').height

const HomeContentThird = () => {
  return (
    <View style={styles.container}>
      <Text>HomeContentThird</Text>
    </View>
  )
}

export default HomeContentThird

const styles = StyleSheet.create({
    container: {
                marginVertical: heightDimension * 0.01,backgroundColor:'white',

    }
})