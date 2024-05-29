import {StyleSheet, Text, View, Dimensions,Image} from 'react-native';
import React from 'react';
import CheckListHeader from './children/header/CheckListHeader';
import CheckListContent from './children/content/CheckListContent';
import LoginRequired from '../../../../auth/required/LoginRequired';
import {useSelector, useDispatch} from 'react-redux';
import stickerLogin from '../../../../auth/assets/loginRequired.png'

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;
const isSmallScreen = widthDimension < 375;

const CheckList = () => {
  const loginChecking = useSelector(state => state.auth.login)

  return (
    <View style={styles.container}>
      {loginChecking ? (
        <>
          {/* <CheckListHeader />
          <CheckListContent /> */}
          <Image source={stickerLogin} style={styles.stickerLoginAssets} alt=""/>
          <Text style={styles.textLoginRequired}>Bạn không có quyền truy cập, hãy đăng nhập</Text>
          
        </>
      ) : (
        <LoginRequired />
      )}
      <>
          {/* <CheckListHeader />
          <CheckListContent /> */}
          <Image source={stickerLogin} style={styles.stickerLoginAssets} alt=""/>
          <Text style={styles.textLoginRequired}>Tính năng này đang cập nhật</Text>
          
        </>
    </View>
  );
};

export default CheckList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: heightDimension * 0.15,
    height: heightDimension
  },
  stickerLoginAssets: {
        width: isSmallScreen ? 170 : 200,
        height: isSmallScreen ? 170 : 200
    },
});
