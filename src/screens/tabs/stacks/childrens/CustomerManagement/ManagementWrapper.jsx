import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ManagementHeader from '../header/ManagementHeader'
import CustomerManagement from './CustomerManagement'
const ManagementWrapper = () => {
  return (
    <View style={styles.container}>
      <ManagementHeader />
      <CustomerManagement />
    </View>
  )
}

export default ManagementWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})