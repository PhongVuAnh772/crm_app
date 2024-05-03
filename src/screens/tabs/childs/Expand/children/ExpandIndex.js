import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React,{useEffect} from 'react'
// import PersonalHeader from './header/PersonalHeader'
import PersonalContent from './content/PersonalContent'
import LoginRequired from '../../../../../auth/required/LoginRequired'
import { useSelector,useDispatch } from "react-redux"
const ExpandIndex = () => {
  const loginChecking = useSelector(state => state.auth.login)

  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator>      
      {loginChecking ? <PersonalContent /> : <LoginRequired  /> }
    </ScrollView>
  )
}

export default ExpandIndex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    marginBottom:'10%',
    
  }
})