import React from 'react';
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

const SpinPrizing = () => {
  const dispatch = useDispatch();

  const codeSpinning = useSelector(state => state.addOtherCampaign.codeSpinning);
  const personWinning = useSelector(state => state.addOtherCampaign.personWinning);
  const codeHexColor = useSelector(state => state.addOtherCampaign.codeHexColor);

  const handleCodeSpinningChange = (value) => {
    dispatch(changeAddCodeSpinning(value));
  };

  const handlePersonWinningChange = (value) => {
    dispatch(changeAddPersonWinning(value));
  };

  const handleCodeHexColorChange = (value) => {
    dispatch(changeAddCodeHexColor(value));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginVertical: heightDimension * 0.06,
        }}>
        <View style={{paddingHorizontal: 15, paddingTop: 15}}>
          <Text style={{color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700'}}>
            Mã bảo mật quay thưởng
          </Text>
          <TextInput
            style={styles.input}
            value={codeSpinning}
            onChangeText={handleCodeSpinningChange}
            placeholder="Nhập mã bảo mật quay thưởng"
            placeholderTextColor="rgb(59, 55, 142)"
          />
        </View>
        <View style={{paddingHorizontal: 15, paddingTop: 15}}>
          <Text style={{color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700'}}>
            Id người chiến thắng ( Cách nhau dấu phẩy )
          </Text>
          <TextInput
            style={styles.input}
            value={personWinning}
            onChangeText={handlePersonWinningChange}
            placeholder="Nhập mã bảo mật quay thưởng"
            placeholderTextColor="rgb(59, 55, 142)"
          />
        </View>
        <View style={{paddingHorizontal: 15, paddingTop: 15}}>
          <Text style={{color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700'}}>
            Mã màu chữ
          </Text>
          <TextInput
            style={styles.input}
            value={codeHexColor}
            onChangeText={handleCodeHexColorChange}
            placeholder="Nhập mã màu chữ"
            placeholderTextColor="rgb(59, 55, 142)"
            maxLength={6}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SpinPrizing;

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
