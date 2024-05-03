import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { addLocation,updateLocation } from '../../../../../../../../../../../slices/campaign/location/LocationSlice';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const LocationScreen = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.location);

  const handleAddressChange = (index, value) => {
    dispatch(updateLocation({ index, address: value }));
  };

  const addLocationHandler = () => {
    dispatch(addLocation(''));
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginVertical: heightDimension * 0.06,
        }}>
        {locations.map((location, index) => (
          <View
            key={index}
            style={{
              paddingHorizontal: 15,
              paddingTop: 15,
            }}>
            <Text
              style={{
                color: 'rgb(59, 55, 142)',
                fontSize: 13,
                fontWeight: '700',
              }}>
              Khu vực {index + 1}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập địa chỉ"
              value={location.address}
              onChangeText={value => handleAddressChange(index, value)}
              placeholderTextColor="rgb(59, 55, 142)"
            />
          </View>
        ))}
        <TouchableOpacity
          style={{
            marginTop: 15,
            paddingHorizontal: 15,
            flexDirection: 'row',
          }}
          onPress={addLocationHandler}>
          <Ionicons name="add-outline" size={20} color="rgb(59, 55, 142)" />
          <Text
            style={{
              color: 'rgb(59, 55, 142)',
              fontSize: 13,
              fontWeight: '500',
              marginLeft: 10,
            }}>
            Thêm khu vực
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.2,
    height: 40,
    fontSize: 13,
    marginTop: 5,
    color: 'black',
  },
});

export default LocationScreen;
