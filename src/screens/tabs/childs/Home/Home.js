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
import CategoryListing from './child/CategoryListing';
import GreetingUser from './child/GreetingUser';
import { colorConstants } from '../../../../../constants/colors/colors';

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
            <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.wrapper}>

        <HomeHeader />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{flex: 1,zIndex:1}}>
          <SliderHeader />
                    <GreetingUser/>

          {/* <HomeContentFirst /> */}
          {/* <HomeContentSecond /> */}
          <CategoryListing />
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
    backgroundColor: 'white',
  },
});
