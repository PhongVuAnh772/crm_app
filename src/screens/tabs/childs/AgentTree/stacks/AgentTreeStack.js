import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AgentTree from '../AgentTree';


const AgentTreeStack = createStackNavigator();

const AgentTreeStacks = () => {
  return (
    <AgentTreeStack.Navigator screenOptions={{headerShown: false}} initialRouteName="PersonalIndex">
      <AgentTreeStack.Screen name="PersonalIndex" component={AgentTree} />

      {/* <AgentTreeStack.Screen
        name="TransferMoney"
        component={TransferMoney}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_bottom',
        }}
      /> */}
      
    </AgentTreeStack.Navigator>
  )}

export default AgentTreeStacks;
