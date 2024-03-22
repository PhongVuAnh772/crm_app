import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import fakeData from './data/fakeData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {sharedElementTransition} from '../../../../../../animations/ShareElementTransition';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const ProductListing = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const network = useSelector(state => state.network.ipv4);

  const navigation = useNavigation();
  const formatPrice = price => {
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedPrice} đ`;
  };
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${network}/getNewProductAPI`, {
        limit: 20,
        page: 1,
      });
      if (response && response.data) {
        setDataProduct(response.data);
      }
    };
    getData();
  }, []);

  const calculateDiscountPercentage = (oldPrice, newPrice) => {
    if (oldPrice === 0) {
      return 0;
    }

    const discount = oldPrice - newPrice;
    const discountPercentage = (discount / oldPrice) * 100;

    return Math.round(discountPercentage); // Làm tròn đến số nguyên gần nhất
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Sản phẩm nổi bật</Text>
      <View style={styles.productListContainer}>
        {dataProduct.length > 0 &&
          dataProduct.map((item, index) => (
            <TouchableOpacity
              style={styles.itemContainer}
              key={index}
              onPress={() =>
                navigation.navigate('SpecifiedProduct', {
                  productId: item.id,
                  imageUrl: item.image,
                  item:item
                })
              }>
              <View style={styles.itemDiscountContainer}>
                <Text style={styles.textPercentage}>
                  -{calculateDiscountPercentage(item.price, item.price_old)}%
                </Text>
              </View>
              <Animated.Image
                source={{uri: item.image}}
                style={styles.imageItem}
                sharedTransitionTag={`image_${item.id}`}
                sharedTransitionStyle={sharedElementTransition}
              />
              <Text style={styles.nameItem}>{item.title}</Text>
                            <Text style={styles.nameQuantity}>Số lượng : <Text style={styles.nameQuantitySpecified}>{item.quantity}</Text></Text>

              <Text style={styles.oldPriceText}>{formatPrice(item.price)}</Text>
              <View style={styles.buttonViewingContainer}>
                <Text style={styles.newPriceText}>
                  {formatPrice(item.price_old)}
                </Text>
                <TouchableOpacity style={styles.buttonSearch}>
                  <FontAwesome name="angle-right" size={18} color="white" />
                  <Text style={styles.titleButtonSearching}>Xem</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: heightDimension * 0.02,
    marginTop: heightDimension * 0.01,
    paddingBottom: heightDimension * 0.1,
  },
  textTitle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
    paddingHorizontal: heightDimension * 0.015,
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: heightDimension * 0.015,
  },
  itemContainer: {
    width: '45%',
    maxHeight: 700,
    marginTop: 20,
    marginRight: 20,
    position: 'relative',
  },
  imageItem: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  nameItem: {
    fontSize: 16,
    paddingTop: 10,
    color: 'black',
    fontWeight: '600',
  },
  itemDiscountContainer: {
    paddingVertical: 1,
    paddingHorizontal: 7,
    backgroundColor: 'rgb(224, 40, 73)',
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 100,
    borderRadius: 10,
  },
  textPercentage: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  oldPriceText: {
    color: 'gray',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  newPriceText: {
    color: 'rgb(50, 111, 226)',
    fontSize: 20,
    fontWeight: '600',
  },
  buttonViewingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    positon: 'absolute',
    bottom: 0,
  },
  buttonSearch: {
    height: 25,
    backgroundColor: 'rgb(50, 111, 226)',
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  titleButtonSearching: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  nameQuantity: {
    paddingVertical: 5,
    fontSize: 15,
    color:'black'
  },
  nameQuantitySpecified: {
    fontWeight: 'bold',
  }
});
