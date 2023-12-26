import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '@/pages/Home';
import {Detail} from '@/pages/Detail';
import {WelcomePage} from '@/pages/Welcome';
import {useWelcome} from '@/hooks/use-welcome';
import {RootStackParamList, ScreenProps} from './type';

const Stack = createStackNavigator<RootStackParamList>();
const NativeStack = createNativeStackNavigator<RootStackParamList>();

const InitNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomePage">
      <Stack.Screen name="WelcomePage" component={WelcomePage} options={{header: () => null}} />
    </Stack.Navigator>
  );
};

type MainNavigatorProps = ScreenProps<'Main'>;
const MainNavigator: React.FC<MainNavigatorProps> = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{header: () => null}} />
      <Stack.Screen name="Detail" component={Detail} options={{header: () => null}} />
    </Stack.Navigator>
  );
};

export const AppNavigators: React.FC = () => {
  const {isShow} = useWelcome();
  return (
    <Stack.Navigator>
      {isShow ? (
        <Stack.Screen name="Init" component={InitNavigator} options={{header: () => null}} />
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} options={{header: () => null}} />
      )}
    </Stack.Navigator>
  );
};
