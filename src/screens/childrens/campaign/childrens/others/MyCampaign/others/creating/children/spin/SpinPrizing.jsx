import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCodeSpinning, changePersonWinning, changeCodeHexColor } from '../../../../../../../../../../../slices/campaign/others/otherCampaignSlice';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const SpinPrizing = () => {
  const dispatch = useDispatch();
  const [codeSpinning, setCodeSpinning] = useState('');
  const [personWinning, setPersonWinning] = useState('');
  const [codeHexColor, setCodeHexColor] = useState('');

  const handleCodeSpinningChange = (text) => {
    setCodeSpinning(text);
    dispatch(changeCodeSpinning(text));
  };

  const handlePersonWinningChange = (text) => {
    setPersonWinning(text);
    dispatch(changePersonWinning(text));
  };

  const handleCodeHexColorChange = (text) => {
    setCodeHexColor(text);
    dispatch(changeCodeHexColor(text));
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'white', marginVertical: heightDimension * 0.06 }}>
        <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
          <Text style={{ color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700' }}>
            Mã bảo mật quay thưởng
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleCodeSpinningChange}
            value={codeSpinning}
            placeholder="Nhập mã bảo mật quay thưởng"
            placeholderTextColor="rgb(59, 55, 142)"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
          <Text style={{ color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700' }}>
            Id người chiến thắng (Cách nhau dấu phẩy)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handlePersonWinningChange}
            value={personWinning}
            placeholder="Nhập mã bảo mật quay thưởng"
            placeholderTextColor="rgb(59, 55, 142)"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
          <Text style={{ color: 'rgb(59, 55, 142)', fontSize: 13, fontWeight: '700' }}>
            Mã màu chữ
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleCodeHexColorChange}
            value={codeHexColor}
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
  },
});