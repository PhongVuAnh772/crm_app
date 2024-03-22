import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const widthDimension = Dimensions.get('screen').width;
const heightDimension = Dimensions.get('screen').height;
const HomeContentSecond = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleFirstContainer}>
          <Text style={styles.titleFirst}>Tổng quan</Text>
          <Text style={styles.titleSecondNow}>Đơn hàng của tôi</Text>
        </View>
        <Text style={styles.titleSecond}>Tháng này</Text>
      </View>
      <View style={styles.overviewContainer}>
        <View
          style={[styles.overviewChild, {backgroundColor: 'rgb(95, 61, 236)'}]}>
          <View style={styles.overviewTitleContainer}>
            <Text style={styles.overviewTitle}>Đơn hàng</Text>
            <Entypo name="chevron-right" size={20} color="white" />
          </View>
          <View style={styles.overviewTitleContainer}>
            <Text style={styles.overviewNumber}>30</Text>
            <View style={styles.overviewExtraContainer}>
              <AntDesign name="caretup" size={10} color="rgb(40, 162, 114)" />
              <Text style={styles.overviewExtraText}>26,9%</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.overviewChild,
            {backgroundColor: 'rgb(72, 101, 237)', marginLeft: 10},
          ]}>
          <View style={styles.overviewTitleContainer}>
            <Text style={styles.overviewTitle}>Đơn hàng</Text>
            <Entypo name="chevron-right" size={20} color="white" />
          </View>
          <View style={styles.overviewTitleContainer}>
            <Text style={styles.overviewNumber}>359</Text>
            <View style={styles.overviewExtraContainer}>
                <AntDesign name="caretup" size={10} color="rgb(40, 162, 114)" />
                <Text style={styles.overviewExtraText}>
                    26,9%
                </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.overviewChild,
            {backgroundColor: 'rgb(16, 169, 244)'},
          ]}>
          <View style={styles.overviewTitleContainer}>
            <Text style={styles.overviewTitle}>Đơn hàng</Text>
            <Entypo name="chevron-right" size={20} color="white" />
          </View>
          <View style={styles.overviewTitleContainer}>
            <Text style={styles.overviewNumber}>23</Text>
            <View style={styles.overviewExtraContainer}>
                {/* <AntDesign name="caretup" size={10} color="rgb(40, 162, 114)" /> */}
                <Text style={[styles.overviewExtraText, {color:'rgb(221, 184, 100)'}]}>
                    0%
                </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.overviewChild,
            {backgroundColor: 'rgb(239, 123, 66)', marginLeft: 10},
          ]}>
          <View style={styles.overviewTitleContainer}>
            <Text style={styles.overviewTitle}>Đơn hàng</Text>
            <Entypo name="chevron-right" size={20} color="white" />
          </View>
          <View style={styles.overviewTitleContainer}>
            <Text style={styles.overviewNumber}>344</Text>
            <View style={[styles.overviewExtraContainer, {backgroundColor:'rgb(255, 230, 218)'}]}>
                <AntDesign name="caretdown" size={10} color="red" />
                <Text style={[styles.overviewExtraText,{color:'red'}]}>
                    26,9%
                </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeContentSecond;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: heightDimension * 0.01,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleFirstContainer: {},
  titleSecond: {
    color: 'rgb(50, 111, 226)',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  titleFirst: {
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
  },
  titleSecondNow: {
    color: 'rgb(50, 111, 226)',
    fontSize: 16,
    marginTop: 5,
    fontWeight: '500',
  },
  overviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  overviewChild: {
    width: '48%',
    minHeight: 100,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  overviewTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  overviewTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  overviewNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  overviewExtraContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  overviewExtraText: {
    color: 'rgb(40, 162, 114)',
    paddingLeft: 7,
    fontWeight: 'bold',
  },
});
