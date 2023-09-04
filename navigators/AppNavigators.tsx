import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Page1} from '../pages/basic/s3-4/page1';
import {Page2} from '../pages/basic/s3-4/page2';
import {Page3} from '../pages/basic/s3-4/page3';
import {Home} from '../pages/basic/s3-4/home';

const Stack = createStackNavigator();

export const AppNavigators: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{headerBackTitle: '123'}} />
      <Stack.Screen name="Page1" component={Page1} />
      <Stack.Screen name="Page2" component={Page2} />
      <Stack.Screen name="Page3" component={Page3} />
    </Stack.Navigator>
  );
};
