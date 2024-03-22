import {StyleSheet, Text, View, StatusBar,Dimensions,TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';


const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;

const HeaderCart = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconCartContainer} onPress={() => navigation.goBack()}>
        <FontAwesome6 name="chevron-left" size={18} color="rgb(42, 112, 234)" />
      </TouchableOpacity>
      <Text style={styles.titleHeader}>Giỏ hàng</Text>
      <View style={styles.iconCartContainer}>
        <FontAwesome6 name="trash" size={18} color="rgb(42, 112, 234)" />
      </View>

    </View>
  );
};

export default HeaderCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingBottom: 10,
        paddingHorizontal: widthDimension * 0.05,

  },
  iconCartContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgb(245, 228, 235)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    fontSize: 23,
    color:'black',
    fontWeight: '500',
  },

});
