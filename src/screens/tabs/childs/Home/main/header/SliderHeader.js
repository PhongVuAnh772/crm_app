import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions,Image} from 'react-native';
import imageSlide from '../../assets/imageslide.jpg'
import imageSlide2 from '../../assets/imageslide2.jpg'
import imageSlide3 from '../../assets/imageslide3.jpg'
import imageSlide4 from '../../assets/imageslide4.jpg'

import Swiper from 'react-native-swiper';
const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    paddingVertical: heightDimension * 0.015,
    backgroundColor: 'white',
    paddingHorizontal: widthDimension * 0.03,
    width: '100%',
    height: heightDimension * 0.3,
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    width: '100%',
    height: heightDimension * 0.26,
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    height: 100,
  },
  wrapper: {
    borderRadius: 20,
  },
  paginationStyle: {
    position: 'absolute',
    flexDirection: 'row',
    width: Dimensions.width,
    bottom:-15
  },
  blurRefuseContainer: {},
  blurMatchingContainer: {},
  wrapperSwiper: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: heightDimension * 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthDimension * 0.12,
    // backgroundColor:
  },
  infoContainer: {},
  iconAction: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconMessage: {
    width: 70,
    height: 70,
    backgroundColor: 'rgb(254, 133, 26)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRefuse: {
    width: 57,
    height: 57,
    backgroundColor: '#8382fc',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActionMessage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  iconActionRefuse: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  iconMatching: {
    width: 57,
    height: 57,
    backgroundColor: 'rgb(255, 119, 171)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActionMatching: {
    width: '58%',
    height: '58%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  iconActionRocket: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
  dot: {
    width: 25,
    height: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  activeDot: {
    backgroundColor: 'rgb(50, 111, 226)',
    width: 50,
  },
  relationshipContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: widthDimension * 0.03,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    marginHorizontal: widthDimension * 0.03,
    position: 'absolute',
    top: '5%',
  },
  textRelationship: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Helvetica',
  },
  infoMatchingContainer: {
    paddingHorizontal: widthDimension * 0.03,

    position: 'absolute',
    bottom: '15%',
  },
  infoMatchingNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoMatchingWorkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoMatchingWorking: {
    color: 'white',
    fontSize: 17,
  },
  infoMatchingSeparate: {
    color: 'white',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  infoMatchingDistance: {
    color: 'white',
    fontSize: 17,
  },
  infoMatchingName: {
    textTransform: 'capitalize',
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
  },
  infoMatchingAge: {
    marginLeft: 10,
    color: 'white',
    fontSize: 30,
    marginTop: 5,
  },
  infoMatchingVerify: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginTop: 7,
  },
  infoMatchingDescription: {
    color: 'white',
    fontSize: 17,
    paddingVertical: 5,
  },
  infoMatchingDescriptionHabbit: {
    backgroundColor: 'black',
    paddingVertical: 2,
    maxWidth: widthDimension * 0.5,
    alignSelf: 'flex-start',
  },
});

export default class SliderHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          paginationStyle={styles.paginationStyle}
          autoplay
          dotColor="rgba(255,255,255,0.3)"
          dotStyle={styles.dot}
          activeDot={<View style={[styles.dot, styles.activeDot]} />}>
          <Image source={imageSlide} style={styles.slide1} />
                    <Image source={imageSlide2} style={styles.slide1} />
          <Image source={imageSlide3} style={styles.slide1} />
          <Image source={imageSlide4} style={styles.slide1} />

        </Swiper>
      </View>
    );
  }
}

AppRegistry.registerComponent('myproject', () => SliderHeader);
