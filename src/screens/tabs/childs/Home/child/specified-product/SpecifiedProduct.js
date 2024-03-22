import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions 
} from 'react-native';
import React, {useEffect} from 'react';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import sharedElementTransition from '../../../../../../animations/ShareElementTransition';
import SpecifiedProductHeader from './header/SpecifiedProductHeader';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import TabViewExample from './content/tab-view/TabBarTabView';
const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;

const SpecifiedProduct = ({route}) => {
  const {productId, imageUrl, item} = route.params;
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    <View style={styles.container}>
      <SpecifiedProductHeader />
      <Animated.Image
        source={{uri: imageUrl}}
        style={{width: '100%', height: '40%', resizeMode: 'contain'}}
        sharedTransitionTag={`image_${productId}`}
        sharedTransitionStyle={sharedElementTransition}
      />

      <ScrollView style={styles.itemInfoContainer}>
        <Text style={styles.itemInfoHeader}>{item.title}</Text>
        <Text style={styles.itemInfoQuantity}>Số lượng : {item.quantity}</Text>
        {/* <View style={styles.itemInfoTabsContainer}>
          <TouchableOpacity style={styles.itemInfoTabsButton}>
            <Text style={styles.itemInfoTabsButtonText}>Mô tả</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemInfoTabsButton}>
            <Text style={styles.itemInfoTabsButtonText}>Cách sử dụng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemInfoTabsButton}>
            <Text style={styles.itemInfoTabsButtonText}>Đánh giá</Text>
          </TouchableOpacity>
        </View> */}
                          <TabViewExample tabDescriptionRoute={item.description} tabInfoRoute={item.info}/>

      </ScrollView>

      <View style={styles.priceAllContainer}>
        <View>
          <Text style={styles.priceSpecified}>$55.08</Text>
        </View>
        <View style={styles.buttonValueContainer}>
          <TouchableOpacity style={styles.cartItemButtonValueContainer}>
            <FontAwesome6 name="minus" size={15} color="rgb(160, 160, 160)" />
          </TouchableOpacity>
          <Text style={styles.cartItemButtonValueText}>1</Text>
          <TouchableOpacity style={styles.cartItemButtonValueContainer}>
            <FontAwesome6 name="add" size={15} color="rgb(160, 160, 160)" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View style={styles.buttonContainer}>
            <FontAwesome6 name="cart-arrow-down" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpecifiedProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: widthDimension * 0.08,
    position: 'relative',
  },
  itemInfoContainer: {
    paddingHorizontal: widthDimension * 0.05,
  },
  itemInfoHeader: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },

  itemInfoQuantity: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(187, 169, 178)',
  },
  priceAllContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingHorizontal: widthDimension * 0.05,
    paddingVertical: heightDimension * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(143, 132, 137)',
  },
  priceSpecified: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: 'rgb(42, 112, 234)',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconButtonContainer: {
    marginLeft: 15,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonValueContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: 'rgb(246, 232, 239)',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  cartItemButtonValueContainer: {
    width: 40,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemButtonValueText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: 'rgb(42, 112, 234)',
  },
  itemInfoTabsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  itemInfoTabsButton: {
    backgroundColor: 'rgb(42, 112, 234)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '30%',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  itemInfoTabsButtonText: {
    color:'white',
    fontWeight:'bold',
  },
});
