// LocationScreen.js

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { addInput,updateInput } from '../../../../../../../../../../../slices/campaign/ticket/TicketCampaignSlice';

const LocationScreen = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.ticket);

  const handleNameChange = (index, value) => {
    dispatch(updateInput({ index, name: value }));
  };

  const handlePriceChange = (index, value) => {
    dispatch(updateInput({ index, price: value }));
  };

  const addLocation = () => {
    const index = Object.keys(locations).length + 1;
    dispatch(addInput({ index, name: '', price: '' }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginVertical: 0.06 * Dimensions.get('screen').height,
        }}>
        {Object.keys(locations).map(index => (
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
              Loại vé {index}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên loại vé"
              value={locations[index]?.name}
              onChangeText={value => handleNameChange(index, value)}
              placeholderTextColor="rgb(59, 55, 142)"
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập giá vé"
              value={locations[index]?.price}
              onChangeText={value => handlePriceChange(index, value)}
              placeholderTextColor="rgb(59, 55, 142)"
              keyboardType='numeric'
            />
          </View>
        ))}
        <TouchableOpacity
          style={{
            marginTop: 15,
            paddingHorizontal: 15,
            flexDirection: 'row',
          }}
          onPress={addLocation}>
          <Ionicons name="add-outline" size={20} color="rgb(59, 55, 142)" />
          <Text
            style={{
              color: 'rgb(59, 55, 142)',
              fontSize: 13,
              fontWeight: '500',
              marginLeft: 10,
            }}>
            Thêm loại vé
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
    color:'black'
  },
});

export default LocationScreen;
