// TeamScreen.js
import React, {useState, useEffect} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {
  addLocation,
  updateLocation,
} from '../../../../../../../../../../../slices/campaign/location/LocationSlice';
import axios from 'axios';
const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const TeamScreen = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.location);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const network = useSelector(state => state.network.ipv4);
  const token = useSelector(state => state.auth.token);
  const handleAddressChange = (index, value) => {
    dispatch(updateLocation({index, address: value}));
  };

  const addLocationHandler = () => {
    dispatch(addLocation(''));
  };

  const handleSearchInputChange = value => {
    setSearchTerm(value);
    clearTimeout(debounceTimeout);
    const timeout = setTimeout(async () => {
      try {
        const response = await axios.post(`${network}/searchMemberAPI`, {
          token: token,
          term: value
        });
        if (response.data && response.data.success) {
          setSearchResults(response.data.results);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error searching locations:', error);
        setSearchResults([]);
      }
    }, 500);
    setDebounceTimeout(timeout);
  };

  const handleSelectLocation = (index, location) => {
  dispatch(updateLocation({index, address: location.address}));
    setSearchResults([]);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginVertical: heightDimension * 0.06,
        }}>
        {locations.map((location, index) => (
          <View key={index} style={{paddingHorizontal: 15, paddingTop: 15}}>
            <Text
              style={{
                color: 'rgb(59, 55, 142)',
                fontSize: 13,
                fontWeight: '700',
              }}>
              Đội nhóm {index + 1}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập đội nhóm"
              value={location.address.toString()}
              onChangeText={value => handleSearchInputChange(value)}
              placeholderTextColor="rgb(59, 55, 142)"
            />
            {searchResults.length > 0 && (
              <View style={{marginTop: 10}}>
                {searchResults.map((result, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      padding: 10,
                      backgroundColor: '#f0f0f0',
                      marginBottom: 5,
                    }}
                    onPress={() => handleSelectLocation(index, result)}>
                    <Text>{result.address}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
        <TouchableOpacity
          style={{marginTop: 15, paddingHorizontal: 15, flexDirection: 'row'}}
          onPress={addLocationHandler}>
          <Ionicons name="add-outline" size={20} color="rgb(59, 55, 142)" />
          <Text
            style={{
              color: 'rgb(59, 55, 142)',
              fontSize: 13,
              fontWeight: '500',
              marginLeft: 10,
            }}>
            Thêm đội nhóm
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

export default TeamScreen;
