import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckListHeader from './children/header/CheckListHeader';
import CheckListContent from './children/content/CheckListContent';
import LoginRequired from '../../../../auth/required/LoginRequired';
import {useSelector, useDispatch} from 'react-redux';

const CheckList = () => {
  const loginChecking = useSelector(state => state.auth.login)

  return (
    <View style={styles.container}>
      {loginChecking ? (
        <>
          <CheckListHeader />
          <CheckListContent />
        </>
      ) : (
        <LoginRequired />
      )}
    </View>
  );
};

export default CheckList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
