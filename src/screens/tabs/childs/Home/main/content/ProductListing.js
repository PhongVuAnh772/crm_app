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
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {sharedElementTransition} from '../../../../../../animations/ShareElementTransition';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SharedElement} from 'react-native-shared-element';
import { colorConstants } from '../../../../../../../constants/colors/colors';
const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const {width} = Dimensions.get('window');
const isSmallScreen = width < 375;

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
        {dataProduct.length > 0 ? (
          dataProduct.map((item, index) => (
            <View style={styles.itemContainer} key={index}>
              {/* <View style={styles.itemDiscountContainer}>
                <Text style={styles.textPercentage}>
                  -{calculateDiscountPercentage(item.price, item.price_old)}%
                </Text>
              </View> */}
              <View style={styles.imageContainer}>
                <SharedElement id={`image_${item.id}`}>
                  <Image source={{uri: item.image}} style={styles.imageItem} alt=""/>
                </SharedElement>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '70%',
                  paddingLeft: 20,
                  height: '100%',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.buttonViewingContainer}>
                  <SharedElement id={`title_${item.id}`}>
                    <Animated.Text
                      style={styles.nameItem}
                      entering={FadeInLeft.duration(400)}>
                      {item.title}
                    </Animated.Text>
                  </SharedElement>
                  <Animated.Text
                    style={styles.nameQuantity}
                    entering={FadeInLeft.duration(600)}>
                    Số lượng :{' '}
                    <Text style={styles.nameQuantitySpecified}>
                      {item.quantity}
                    </Text>
                  </Animated.Text>
                </View>
                <View style={styles.buttonViewingContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Animated.Text
                      style={styles.oldPriceText}
                      entering={FadeInLeft.duration(600)}>
                      {item.price_old === 0
                        ? formatPrice(item.price)
                        : formatPrice(item.price_old)}
                    </Animated.Text>
                  </View>
                  <Animated.Text
                    style={[styles.newPriceText, {paddingRight: 10}]}
                    entering={FadeInLeft.duration(600)}>
                    {formatPrice(item.price)}
                  </Animated.Text>
                  <TouchableOpacity
                    style={styles.buttonSearch}
                    onPress={() =>
                      navigation.navigate('SpecifiedProduct', {
                        item:item
                      })
                    }>
                    <FontAwesome name="angle-right" size={18} color="white" />
                    <Text style={styles.titleButtonSearching}>Xem</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={{height: 300, width: '100%'}}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="column">
                <SkeletonPlaceholder.Item flexDirection="row">
                  <SkeletonPlaceholder.Item
                    width={200}
                    height={150}
                    borderRadius={10}
                  />
                  <SkeletonPlaceholder.Item marginLeft={10}>
                    <SkeletonPlaceholder.Item
                      width={120}
                      height={20}
                      marginTop={5}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={10}
                      width={80}
                      height={20}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={10}
                      width={80}
                      height={20}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={10}
                      width={80}
                      height={20}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={10}
                      width={80}
                      height={20}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item flexDirection="row" marginTop={10}>
                  <SkeletonPlaceholder.Item
                    marginTop={10}
                    width={200}
                    height={150}
                    borderRadius={10}
                  />
                  <SkeletonPlaceholder.Item marginLeft={10}>
                    <SkeletonPlaceholder.Item
                      width={120}
                      height={20}
                      marginTop={5}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={10}
                      width={80}
                      height={20}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={10}
                      width={80}
                      height={20}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={10}
                      width={80}
                      height={20}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={10}
                      width={80}
                      height={20}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: heightDimension * 0.02,
    paddingBottom: heightDimension * 0.1,
    borderRadius: 15,
  },
  imageContainer: {
    width: '30%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgb(242, 242, 242)',
  },
  textTitle: {
    color: 'black',
    fontWeight: '700',
    fontSize: isSmallScreen ? 15 : 21,
    paddingHorizontal: heightDimension * 0.015,
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: heightDimension * 0.015,
    paddingTop: heightDimension * 0.015,
    paddingRight: heightDimension * 0.01,
  },
  itemContainer: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    height: 150,
    alignItems: 'flex-end',
    marginTop: 15,
  },
  imageItem: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'contain',
  },
  nameItem: {
    fontSize: isSmallScreen ? 13 : 18,
    color: 'black',
    fontWeight: '500',
  },
  itemDiscountContainer: {
    paddingVertical: 1,
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
    color: colorConstants.primaryColor,
    fontSize: 20,
    fontWeight: '600',
  },
  buttonViewingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonSearch: {
    height: 30,
    backgroundColor: colorConstants.primaryColor,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  titleButtonSearching: {
    fontSize: isSmallScreen ? 13 : 15,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  nameQuantity: {
    paddingVertical: 5,
    fontSize: 15,
    color: 'black',
  },
  nameQuantitySpecified: {
    fontWeight: 'bold',
  },
});
