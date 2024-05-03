import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import avatarNull from '../../../../../screens/assets/avatar-null.png';
import MyCampaignIndex from '../others/MyCampaign/stacks/MyCampaignIndex';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LottieView from "lottie-react-native";

const widthDimensions = Dimensions.get('screen').width;
const heightDimensions = Dimensions.get('screen').height;

const CampaignIndex = () => {
  const loginChecking = useSelector(state => state.auth.login);
  const navigation = useNavigation();
  const userData = useSelector(state => state.user.user);
    const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerButtonContainer}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={15} color="rgb(37, 41, 109)" />
        </TouchableOpacity>

        {loginChecking ? (
          <TouchableOpacity onPress={() => console.log(userData.avatar)}>
            <Image
            source={{uri: userData.avatar}}
            alt=""
            style={[
              styles.imageContainer,
              {
                borderRadius: 25,
                resizeMode: 'contain',
                backgroundColor: 'white',
              },
            ]}
          />
          </TouchableOpacity>
        ) : (
          <Image
            source={avatarNull}
            alt=""
            style={[
              styles.imageContainer,
              {
                borderRadius: 25,
                resizeMode: 'contain',
                backgroundColor: 'white',
              },
            ]}
          />
        )}
      </View>
      <Text style={styles.headerTitle}>Xin chào, <Text style={{color: 'rgb(51, 61, 80)',fontWeight:'700'}}>{userData.name}</Text> !</Text>
      <Text style={styles.headerDescription}>Chào mừng đến với quản lý Chiến dịch !</Text>
<LottieView
      source={require("../../../../../animations/lotties/campaignLotties.json")}
      style={{width: 120, height:120,resizeMode:'cover',alignSelf:'flex-end',position:'absolute',top: '5%'}}
      autoPlay
      loop
    />
      <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'rgb(255, 102, 100)',
        tabBarInactiveTintColor: '#000000',

        tabBarStyle: {
          height: 40,
          width: '40%',
          position: 'absolute',
          top: -15,
          right: 16,
          left: -5,
          borderRadius: 10,
          backgroundColor: 'white',
          elevation: 0,marginTop: 30,
          borderTopColor: 'white',
              marginLeft: widthDimensions * 0.05,

        },
        tabBarLabelStyle: {
          fontSize: 13, // Kích thước của chữ
          paddingBottom: 5,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconComponent;

          if (route.name === 'MyCampaignIndex') {
            iconName = focused ? 'home' : 'home';
            color = focused ? 'white' : 'rgb(123, 133, 146)';
            iconComponent = (
              <View
                style={{
                  backgroundColor: focused ? 'rgb(37, 41, 109)' : 'rgb(224, 232, 245)',
                  width: '95%',
                  height: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    color: focused ? 'white' : 'rgb(37, 41, 109)',
                    fontSize: 12,
                    fontWeight: 500,
                  }}>
                  Tổng quan
                </Text>
              </View>
            );
          }  else if (route.name === 'CreatingCampaignIndex') {
            iconName = focused ? 'compass' : 'compass';
            color = focused ? 'white' : 'rgb(123, 133, 146)';
            iconComponent = (
              <View
                style={{
                  backgroundColor: focused ? 'rgb(37, 41, 109)' : 'rgb(224, 232, 245)',
                  height: '90%',
                  width:'95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    color: focused ? 'white' : 'rgb(37, 41, 109)',
                    fontSize: 12,
                    fontWeight: 500,
                  }}>
                  Kho hàng
                </Text>
              </View>
            );
          }

          return iconComponent;
        },
        swipeEnabled: true,
      })}>
      <Tab.Screen
        name="MyCampaignIndex"
        component={MyCampaignIndex}
        options={{tabBarShowLabel: false}}
      />
      {/* <Tab.Screen
        name="CreatingCampaignIndex"
        component={MyCampaignIndex}
        options={{tabBarShowLabel: false}}
      /> */}
      
    </Tab.Navigator>
    </View>
  );
};

export default CampaignIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: heightDimensions * 0.01,
  },
  headerButtonContainer: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: 'rgb(245, 243, 242)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
        paddingHorizontal: widthDimensions * 0.05,

  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(245, 243, 242)',

  },
  headerTitle: {
    color: 'rgb(94, 99, 118)',
    paddingTop: 15,
    fontSize: 20,
    fontWeight: '500',
        paddingHorizontal: widthDimensions * 0.05,

  },
  headerDescription: {
    color: 'rgb(94, 99, 118)',
    paddingTop: 15,
    fontSize: 10,
        paddingHorizontal: widthDimensions * 0.05,

  }
});
