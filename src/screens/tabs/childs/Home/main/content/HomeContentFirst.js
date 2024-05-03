import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const HomeContentFirst = () => {
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.actionWrapper}>
        <View style={styles.searchingContainer}>
          <Text style={styles.titleSearching}>Tra cứu Đại Lý ZIKII</Text>
          <View style={styles.searchSpecifiedContainer}>
            <TextInput
              style={styles.inputSearching}
              onChangeText={onChangeNumber}
                          placeholderTextColor="gray"

              value={number}
              placeholder="Nhập số điện thoại tại đây"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.buttonSearch}>
              <FontAwesome name="search" size={18} color="white" />
              <Text style={styles.titleButtonSearching}>Tìm kiếm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionIconContainer}></View>
      </View>
    </View>
  );
};

export default HomeContentFirst;

const styles = StyleSheet.create({
  container: {
    paddingVertical: heightDimension * 0.01,
    paddingHorizontal: heightDimension * 0.015,
    backgroundColor:'white',
  },
  actionWrapper: {
    borderWidth: 2,
    borderColor: 'rgb(244, 244, 244)',
    paddingVertical: heightDimension * 0.01,
    borderRadius: 10,

    paddingHorizontal: heightDimension * 0.015,
  },
  titleSearching: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  searchSpecifiedContainer: {
    flexDirection: 'row',
    alignItems:'center',
  },
  inputSearching: {
    height: 40,
    borderWidth: 0.4,
    padding: 10,
    marginTop: 5,
    width: '70%',
    borderRadius: 5,
    borderColor: 'gray',
    fontSize: 17,
    color:'black'
  },
  buttonSearch: {
    width: '28%',
    height: 40,
    backgroundColor: 'rgb(50, 111, 226)',
        marginTop: 5,
        borderRadius: 10,
        alignItems:"center",
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 10,

  },
  titleButtonSearching: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10
  }
});
