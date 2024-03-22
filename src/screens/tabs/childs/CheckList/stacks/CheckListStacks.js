import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CheckListIndex from '../CheckListIndex';
const CheckListStack = createStackNavigator();

const CheckListStacks = () => {
  return (
    <CheckListStack.Navigator screenOptions={{headerShown: false}}>
      <CheckListStack.Screen
        name="CheckListIndex"
        component={CheckListIndex}
       
      />

      {/* <CheckListStack.Screen
        name="TransferMoney"
        component={TransferMoney}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_bottom',
        }}
      /> */}
      
    </CheckListStack.Navigator>
  )}

export default CheckListStacks;
