import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from './main/header/HomeHeader';
import HomeContentFirst from './main/content/HomeContentFirst';
import HomeContentSecond from './main/content/HomeContentSecond';
// import HomeContentThird from './main/content/HomeContentThird';
import SliderHeader from './main/header/SliderHeader';
import ProductListing from './main/content/ProductListing';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <>
      <View style={styles.wrapper}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <HomeHeader />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{flex: 1}}>
          <SliderHeader />
          {/* <HomeContentFirst /> */}
          {/* <HomeContentSecond /> */}
          <ProductListing />
        </ScrollView>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgb(227, 228, 231)',
  },
});
