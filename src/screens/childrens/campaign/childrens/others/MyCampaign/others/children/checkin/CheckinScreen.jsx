import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeAddCheckinName,
  changeAddNotificationGreeting,
  changeAddContentShowingQR,
  changeAddCodeSpinning,
  changeAddPersonWinning,
  changeAddCodeHexColor,
  changeAddLogoPicture,
  changeAddBackgroundPicture, } from '../../../../../../../../../../slices/add-campaign/others/otherCampaignSlice';
  

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const CheckinScreen = () => {
  const dispatch = useDispatch();

  const checkinName = useSelector(state => state.addOtherCampaign.checkinName);
  const notificationGreeting = useSelector(state => state.addOtherCampaign.notificationGreeting);
  const contentShowingQR = useSelector(state => state.addOtherCampaign.contentShowingQR);

  const handleCheckinNameChange = (value) => {
    dispatch(changeAddCheckinName(value));
  };

  const handleNotificationGreetingChange = (value) => {
    dispatch(changeAddNotificationGreeting(value));
  };

  const handleContentShowingQRChange = (value) => {
    dispatch(changeAddContentShowingQR(value));
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginVertical: heightDimension * 0.06,
        }}>
        <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
          <Text style={{ color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700' }}>
            Tên hiển thị của sự kiện
          </Text>
          <TextInput
            style={styles.input}
            value={checkinName}
            onChangeText={handleCheckinNameChange}
            placeholder="Nhập tên hiển thị"
            placeholderTextColor="rgb(59, 55, 142)"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
          <Text style={{ color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700' }}>
            Thông báo chào mừng
          </Text>
          <TextInput
            style={styles.input}
            value={notificationGreeting}
            onChangeText={handleNotificationGreetingChange}
            placeholder="Nhập thông báo chào mừng"
            placeholderTextColor="rgb(59, 55, 142)"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
          <Text style={{ color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700' }}>
            Nội dung hiển thị khi quét mã QR Checkin
          </Text>
          <TextInput
            style={styles.input}
            value={contentShowingQR}
            onChangeText={handleContentShowingQRChange}
            placeholder="Nhập nội dung hiển thị"
            placeholderTextColor="rgb(59, 55, 142)"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckinScreen;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.2,
    height: 40,
    fontSize: 13,
    marginTop: 5,
    color:'black'
  },
});
