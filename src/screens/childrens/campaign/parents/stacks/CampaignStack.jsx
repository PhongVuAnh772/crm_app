import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CampaignIndex from '../../childrens/main/CampaignIndex';

const CampaignStack = createStackNavigator();

const CampaignStacks = () => {
  return (
    <CampaignStack.Navigator screenOptions={{headerShown: false}} initialRouteName="CampaignIndex">
      <CampaignStack.Screen name="CampaignIndex" component={CampaignIndex} />
      
    </CampaignStack.Navigator>
  )}

export default CampaignStacks;
