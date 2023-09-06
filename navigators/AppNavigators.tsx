import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Page1} from '../pages/basic/s3-4/page1';
import {Page2} from '../pages/basic/s3-4/page2';
import {Page3} from '../pages/basic/s3-4/page3';
import {Home} from '../pages/basic/s3-4/home';
import {RootStackParamList} from './type';
import {Text} from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();
const BottonTab = createBottomTabNavigator<RootStackParamList>();
const MaterialTopTab = createMaterialTopTabNavigator<RootStackParamList>();

export const AppNavigators: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Top" component={MaterialTopTabNavigators} options={{title: '顶部导航器'}} />
      <Stack.Screen name="Bottom" component={BottonTabNavigators} options={{title: '底部导航器', header: () => null}} />
      <Stack.Screen name="Page3" component={Page3} />
    </Stack.Navigator>
  );
};

const BottonTabNavigators: React.FC = () => {
  return (
    <BottonTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => null,
        tabBarActiveTintColor: 'red',
      }}>
      <BottonTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: props => TabBarLabel({...props, title: '首页'}),
          tabBarIcon: props => TabBarIcon({...props, name: 'home'}),
        }}
      />
      <BottonTab.Screen
        name="Page1"
        component={Page1}
        options={{
          tabBarLabel: props => TabBarLabel({...props, title: '我的', color: 'orange'}),
          tabBarIcon: props => TabBarIcon({...props, name: 'people', color: 'orange'}),
        }}
      />
      <BottonTab.Screen name="Page2" component={Page2} />
      <BottonTab.Screen name="Page3" component={Page3} />
    </BottonTab.Navigator>
  );
};

const TabBarIcon: React.FC<{focused: boolean; color: string; size: number; name: string}> = ({
  focused,
  color,
  size,
  name,
}) => {
  return <Icons name={name} size={size} color={focused ? color : undefined} />;
};

const TabBarLabel: React.FC<{focused: boolean; color: string; title: string}> = ({focused, color, title}) => {
  return <Text style={{color: focused ? color : undefined}}>{title}</Text>;
};

const MaterialTopTabNavigators: React.FC = () => {
  return (
    <MaterialTopTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {minWidth: 50, backgroundColor: '#879'},
        tabBarLabelStyle: {textTransform: 'capitalize', color: 'white', fontSize: 18, fontWeight: 'bold', margin: 0},
        tabBarIndicatorStyle: {height: 2, backgroundColor: 'white'},
      }}>
      <MaterialTopTab.Screen name="Home" component={Home} />
      <MaterialTopTab.Screen name="Page1" component={Page1} />
      <MaterialTopTab.Screen name="Page2" component={Page2} />
      <MaterialTopTab.Screen name="Page3" component={Page3} />
    </MaterialTopTab.Navigator>
  );
};
