import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import PersonalHeader from './children/header/PersonalHeader';
import PersonalContent from './children/content/PersonalContent';
import {useSelector, useDispatch} from 'react-redux';
import LoginRequired from '../../../../auth/required/LoginRequired';
const ConversationMain = () => {
  const loginChecking = useSelector(state => state.auth.login)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator>
      {loginChecking ? (
        <>
          <PersonalHeader />
          <PersonalContent />
        </>
      ) : (
        <LoginRequired />
      )}
    </ScrollView>
  );
};

export default ConversationMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '10%',
  },
});
