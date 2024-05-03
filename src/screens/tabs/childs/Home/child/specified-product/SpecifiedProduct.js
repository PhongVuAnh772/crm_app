import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {FadeInLeft, FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import sharedElementTransition from '../../../../../../animations/ShareElementTransition';
import SpecifiedProductHeader from './header/SpecifiedProductHeader';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import TabViewExample from './content/tab-view/TabBarTabView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SharedElement} from 'react-native-shared-element';

const heightDimension = Dimensions.get('screen').height;
const widthDimension = Dimensions.get('screen').width;

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375; 
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const SpecifiedProduct = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  // useEffect(() => {
  //   if (sharedElementTransition) {
  //     sharedElementTransition.apply();
  //   }
  // }, [sharedElementTransition]);

  const [index, setIndex] = React.useState(0);
  const [quantityProduct, setQuantityProduct] = React.useState(1);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('@cart');
        if (cartData !== null) {
          setCart(JSON.parse(cartData));
        } else {
          await AsyncStorage.setItem('@cart', JSON.stringify([])); // Tạo cart mới nếu không tìm thấy
          setCart([]);
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCartData();
  }, []);
  const handleDecreasingQuantity = () => {
    if (quantityProduct <= 0) {
      return;
    } else {
      setQuantityProduct(quantityProduct - 1);
    }
  };
  const isProductInCart = (cart, product) => {
    return cart.some(cartItem => cartItem.id === product.id);
  };
  const addToCart = async item => {
    try {
      const cartItem = {
        ...item,
        quantityProduct,
      };
      if (isProductInCart(cart, cartItem)) {
        const updatedCart = cart.map(cartItem =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantityProduct: cartItem.quantityProduct + quantityProduct,
              }
            : cartItem,
        );
        setCart(updatedCart);
        await AsyncStorage.setItem('@cart', JSON.stringify(updatedCart));
      } else {
        const updatedCart = [...cart, cartItem];

        setCart(updatedCart);
        await AsyncStorage.setItem('@cart', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  const calculateDiscountPercentage = (oldPrice, newPrice) => {
    if (oldPrice === 0) {
      return 0;
    }

    const discount = oldPrice - newPrice;
    const discountPercentage = (discount / oldPrice) * 100;

    return Math.round(discountPercentage); // Làm tròn đến số nguyên gần nhất
  };
  const formatPrice = price => {
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedPrice} đ`;
  };
  return (
    <View style={styles.container}>
      <SpecifiedProductHeader />
      <SharedElement
        id={`image_${item.id}`}
        style={{width: '100%', height: '40%'}}>
        <Image
          source={{uri: item.image}} alt=""
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        />
      </SharedElement>

      <ScrollView style={styles.itemInfoContainer}>
        <SharedElement id={`title_${item.id}`}>
          <Animated.Text
            style={styles.itemInfoHeader}
            entering={FadeInLeft.duration(400)}>
            {item.title}
          </Animated.Text>
        </SharedElement>

        <Animated.Text
          style={styles.itemInfoQuantity}
          entering={FadeInLeft.duration(700)}>
          Số lượng : {item.quantity}
        </Animated.Text>
        <View style={styles.itemInfoPriceContainer}>
          <Animated.Text
            style={styles.itemInfoPrice}
            entering={FadeInLeft.duration(700)}>
            {formatPrice(item.price)}
          </Animated.Text>
          {item.price_old !== 0 && (
            <Animated.Text
              entering={FadeInLeft.duration(700)}
              style={styles.itemInfoPriceOld}>
              {formatPrice(item.price_old)}
            </Animated.Text>
          )}
        </View>
        <TabViewExample
          tabDescriptionRoute={item.description}
          tabInfoRoute={item.info}
        />
      </ScrollView>

      <View style={styles.priceAllContainer}>
        <View>
          <Animated.Text
            style={styles.priceSpecified}
            entering={FadeInDown.duration(1000)}>
            {formatPrice(item.price * quantityProduct)}
          </Animated.Text>
        </View>
        <View style={styles.buttonValueContainer}>
          <AnimatedTouchableOpacity
            style={styles.cartItemButtonValueContainer}
            onPress={() => handleDecreasingQuantity()}
            entering={FadeInDown.duration(1000)}>
            <FontAwesome6 name="minus" size={15} color="rgb(160, 160, 160)" />
          </AnimatedTouchableOpacity>
          <Text style={styles.cartItemButtonValueText}>{quantityProduct}</Text>
          <AnimatedTouchableOpacity
            style={styles.cartItemButtonValueContainer}
            entering={FadeInDown.duration(1200)}>
            <FontAwesome6
              name="add"
              size={15}
              color="rgb(160, 160, 160)"
              onPress={() => setQuantityProduct(quantityProduct + 1)}
            />
          </AnimatedTouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => addToCart(item)}>
          <Animated.View
            style={styles.buttonContainer}
            entering={FadeInDown.duration(1200)}>
            <FontAwesome6 name="cart-arrow-down" size={isSmallScreen ? 15 : 20} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SpecifiedProduct.SharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [
    {
      id: `image_${item.id}`,
    },
    {
      id: `title_${item.id}`,
    },
  ];
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
    fontSize: isSmallScreen ? 18: 25,
    fontWeight: 'bold',
  },

  itemInfoQuantity: {
    paddingTop: 10,
    fontSize: isSmallScreen ? 13 : 18,
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
    paddingBottom: isSmallScreen ? heightDimension * 0.1 : heightDimension * 0.1 ,
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
    fontSize: isSmallScreen ? 20 : 30,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: 'rgb(37, 41, 109)',
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
    color: 'rgb(37, 41, 109)',
  },
  itemInfoTabsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  itemInfoTabsButton: {
    backgroundColor: 'rgb(37, 41, 109)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  itemInfoTabsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemInfoPrice: {
    fontSize: isSmallScreen ? 25 : 35,
    paddingTop: 10,
    color: 'rgb(37, 41, 109)',
    fontWeight: '500',
  },
  itemInfoPriceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemInfoPriceOld: {
    textDecorationLine: 'line-through',
    fontSize: isSmallScreen ? 20 : 30,
    paddingLeft: 15,
    fontWeight: '300',
  },
});
