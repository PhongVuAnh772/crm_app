import { StyleSheet, Text, View,Image,Dimensions,StatusBar } from 'react-native'
import React from 'react'
import forgetPassword from '../../assets/security.png'

const heightDimensions = Dimensions.get('screen').height
const widthDimensions = Dimensions.get('screen').width

const ForgetPasswordIndex = () => {
  return (
    <View style={styles.container}>
              <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Image source={forgetPassword} style={styles.imageLogo}/>
    </View>
  )
}

export default ForgetPasswordIndex

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageLogo: {
        
    }
})