// LocationScreen.js

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {
  addAddInput,
  updateAddInput,
} from '../../../../../../../../../../slices/add-campaign/ticket/TicketCampaignSlice';
const LocationScreen = () => {
  const dispatch = useDispatch();
  const [dataParsing, setDataParsing] = useState(null);
  const ticketData = useSelector(state => state.addTicket);

  const addLocationHandler = () => {
    const outputObject = {};
    Object.keys(ticketData).forEach(key => {
      const index = parseInt(key, 10);
      outputObject[index] = ticketData[key];
    });
    return outputObject;
  };

  useEffect(() => {
    const dataParsing = addLocationHandler();
    setDataParsing(dataParsing);
  }, []);

  const handleNameChange = (index, value) => {
    // Tạo bản sao của dataParsing
    const newDataParsing = {...dataParsing};

    // Cập nhật giá trị mới vào bản sao
    if (newDataParsing[index]) {
      newDataParsing[index] = {
        ...newDataParsing[index],
        name: value,
      };
    }

    // Cập nhật state
    setDataParsing(newDataParsing);

    // Gửi action đến Redux
    dispatch(updateAddInput({index, name: value}));
  };

  const handlePriceChange = (index, value) => {
    dispatch(updateAddInput({index, price: value}));
    const newDataParsing = {...dataParsing};

    // Cập nhật giá trị mới vào bản sao
    if (newDataParsing[index]) {
      newDataParsing[index] = {
        ...newDataParsing[index],
        price: value,
      };
    }

    // Cập nhật state
    setDataParsing(newDataParsing);
  };

  const addLocation = () => {
      const newInput = { name: '', price: '' };

    const index = Object.keys(dataParsing).length + 1;
    console.log(index)
    dispatch(addAddInput({index, name: '', price: ''}));
    const newDataParsing = { ...dataParsing };
  newDataParsing[index] = newInput;

  // Cập nhật state
  setDataParsing(newDataParsing);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginVertical: 0.06 * Dimensions.get('screen').height,
        }}>
        {dataParsing &&
          Object.keys(dataParsing).map(index => (
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
                value={dataParsing[index]?.name}
                onChangeText={value => handleNameChange(index, value)}
                placeholderTextColor="rgb(59, 55, 142)"
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập giá vé"
                value={dataParsing[index]?.price?.toString()}
                onChangeText={value => handlePriceChange(index, value)}
                placeholderTextColor="rgb(59, 55, 142)"
                keyboardType="numeric"
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
    color: 'black',
  },
});

export default LocationScreen;
