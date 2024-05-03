import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Animated, {FadeInUp,BounceIn,FadeInLeft} from 'react-native-reanimated';

const widthDimensions = Dimensions.get('screen').width;
const heightDimensions = Dimensions.get('screen').height;

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375; 

const CategoryListing = () => {
  const [flatIndex, setFlatIndex] = useState([]);
  const network = useSelector(state => state.network.ipv4);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDataCategory = async () => {
      setLoading(true);
      const response = await axios.get(`${network}/getCategoryProductAPI`);
      if (response.data) {
        setLoading(false);
        setFlatIndex(response.data);
      } else {
        setLoading(false);
      }
    };
    getDataCategory();
  }, []);

  return (
    <>
      <Text style={styles.textTitle}>Bạn muốn chọn loại sản phẩm gì ?</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{paddingLeft: heightDimensions * 0.005}}
        >
        {flatIndex.length > 0 ? (
          flatIndex.map((item, index) => (
            <TouchableOpacity key={index}>
              <Animated.View
                       entering={FadeInLeft.duration(500 + (index *150))}

              style={styles.container}
              // onPress={() => handlePress(item)}
              >
              {item.image ? (
          <Image
            alt=""
            source={{ uri: item.image }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        ) : (
          <Image
            alt=""
            source={require('../../../../../../constants/logo/phoenix-logo.jpg')} // Đường dẫn tới hình ảnh mặc định
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        )}
              <Text style={styles.Text}>{item.name}</Text>
            </Animated.View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{height: 180,width:'100%',overflow:'visible'}}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginLeft={10}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center"
                 >
                  <SkeletonPlaceholder.Item
                    width={150}
                    height={150}
                    borderRadius={10}
                  />
                  <SkeletonPlaceholder.Item >
                    <SkeletonPlaceholder.Item width={120} height={20} marginTop={5}/>
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
                
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="center"
                  paddingLeft={10}
                 >
                  <SkeletonPlaceholder.Item
                    width={150}
                    height={150}
                    borderRadius={10}
                  />
                  <SkeletonPlaceholder.Item >
                    <SkeletonPlaceholder.Item width={120} height={20} marginTop={5}/>
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default CategoryListing;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconContainer: {
    paddingVertical: 18,
    backgroundColor: 'white',
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  Text: {
    paddingTop: 15,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  textTitle: {
    color: 'black',
    fontWeight: '700',
    fontSize: isSmallScreen ? 15 :  21,
    paddingHorizontal: heightDimensions * 0.015,
    paddingVertical: heightDimensions * 0.015,
  },
});
