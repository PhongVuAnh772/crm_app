import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ManagementHeader from '../header/ManagementHeader'
import StorageManagement from './StorageManagement'
const CustomerManagementWrapper = () => {
  return (
    <View style={styles.container}>
      <ManagementHeader />
      <StorageManagement />
    </View>
  )
}

export default CustomerManagementWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})