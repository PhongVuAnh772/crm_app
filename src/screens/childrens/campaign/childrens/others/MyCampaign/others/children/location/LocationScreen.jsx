import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAddLocation,
  updateAddLocation,
  deleteAddLocation,
  resetLocations,
} from '../../../../../../../../../../slices/add-campaign/location/AddLocationSlice';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const LocationScreen = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.addLocation);
  const [dataParsing, setDataParsing] = useState(null);

  const handleAddressChange = (index, value) => {
    // Tạo bản sao của dataParsing
    // const newDataParsing = {...dataParsing};

    // // Cập nhật giá trị mới vào bản sao
    // if (newDataParsing[index]) {
    //   newDataParsing[index] = {
    //     ...newDataParsing[index],
    //     address: value,
    //   };
    // }

    // // Cập nhật state
    // setDataParsing(newDataParsing);

    // // Gửi action đến Redux
    // dispatch(updateAddLocation({index, address: value}));
    console.log(dataParsing)
  };

  const addLocationHandler = () => {
    const outputObject = {};
    Object.keys(locations).forEach(key => {
      const index = parseInt(key, 10);
      outputObject[index] = locations[key];
    });
    return outputObject;
  };

  useEffect(() => {
    const dataParsing = addLocationHandler();
    setDataParsing(dataParsing);
  }, []);
  const addLocation = () => {
      const newInput = { address: '' };

    const index = Object.keys(dataParsing).length + 1;
    dispatch(addAddLocation({index, address: ''}));
    const newDataParsing = { ...dataParsing };
  newDataParsing[index] = newInput;

  // Cập nhật state
  setDataParsing(newDataParsing);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginVertical: heightDimension * 0.06,
        }}>
        {dataParsing && Object.keys(dataParsing).map((location, index) => (
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
              value={dataParsing[index]?.address}
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
          onPress={addLocation}>
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
