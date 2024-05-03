import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCheckinName, changeNotificationGreeting, changeContentShowingQR } from '../../../../../../../../../../../slices/campaign/others/otherCampaignSlice';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const CheckinScreen = () => {
  const dispatch = useDispatch();
  const [checkinName, setCheckinName] = useState('');
  const [notificationGreeting, setNotificationGreeting] = useState('');
  const [contentShowingQR, setContentShowingQR] = useState('');

  const handleCheckinNameChange = (text) => {
    setCheckinName(text);
    dispatch(changeCheckinName(text));
  };

  const handleNotificationGreetingChange = (text) => {
    setNotificationGreeting(text);
    dispatch(changeNotificationGreeting(text));
  };

  const handleContentShowingQRChange = (text) => {
    setContentShowingQR(text);
    dispatch(changeContentShowingQR(text));
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'white', marginVertical: heightDimension * 0.06 }}>
        <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
          <Text style={{ color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700' }}>
            Tên hiển thị của sự kiện
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleCheckinNameChange}
            value={checkinName}
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
            onChangeText={handleNotificationGreetingChange}
            value={notificationGreeting}
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
            onChangeText={handleContentShowingQRChange}
            value={contentShowingQR}
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
  },
});