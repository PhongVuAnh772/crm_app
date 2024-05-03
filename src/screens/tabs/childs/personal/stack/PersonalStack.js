import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PersonalPage from '../PersonalPage'


const PersonalStack = createStackNavigator();

const PersonalStacks = () => {
  return (
    <PersonalStack.Navigator screenOptions={{headerShown: false}} initialRouteName="PersonalIndex">
      <PersonalStack.Screen name="PersonalIndex" component={PersonalPage} />

      {/* <PersonalStack.Screen
        name="TransferMoney"
        component={TransferMoney}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_bottom',
        }}
      /> */}
      
    </PersonalStack.Navigator>
  )}

export default PersonalStacks;
