import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExpandIndex from './children/ExpandIndex';

const ExpandStack = createStackNavigator();

const ExpandStacks = () => {
  return (
    <ExpandStack.Navigator screenOptions={{headerShown: false}} initialRouteName="ExpandIndex">
      <ExpandStack.Screen
        name="ExpandIndex"
        component={ExpandIndex}
       
      />

      {/* <ExpandStack.Screen
        name="TransferMoney"
        component={TransferMoney}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_bottom',
        }}
      /> */}
      
    </ExpandStack.Navigator>
  )}

export default ExpandStacks;
