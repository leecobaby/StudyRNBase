import React from 'react';
import {Text} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {useWelcome} from '@/js/hooks/use-welcome';
import {WelcomePage} from '@/js/pages/Welcome';
import {HomePage} from '@/js/pages/Home';
import {DrawerParamList, RootStackParamList} from './type';

const Stack = createStackNavigator<RootStackParamList>();
const NativeStack = createNativeStackNavigator<RootStackParamList>();
const BottonTab = createBottomTabNavigator<RootStackParamList>();
const MaterialTopTab = createMaterialTopTabNavigator<RootStackParamList>();
const DrawerNav = createDrawerNavigator<DrawerParamList>();

const InitNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomePage">
      <Stack.Screen name="WelcomePage" component={WelcomePage} options={{header: () => null}} />
    </Stack.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <BottonTab.Navigator>
      <BottonTab.Screen name="PopularPage" component={HomePage} options={{header: () => null}} />
    </BottonTab.Navigator>
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

// const BottonTabNavigators: React.FC = () => {
//   return (
//     <BottonTab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         header: () => null,
//         tabBarActiveTintColor: 'red',
//       }}>
//       <BottonTab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarLabel: props => TabBarLabel({...props, title: '首页'}),
//           tabBarIcon: props => TabBarIcon({...props, name: 'home'}),
//         }}
//       />
//       <BottonTab.Screen
//         name="Page1"
//         component={Page1}
//         options={{
//           tabBarLabel: props => TabBarLabel({...props, title: '我的', color: 'orange'}),
//           tabBarIcon: props => TabBarIcon({...props, name: 'people', color: 'orange'}),
//         }}
//       />
//       <BottonTab.Screen name="Page2" component={Page2} />
//       <BottonTab.Screen name="Page3" component={Page3} />
//     </BottonTab.Navigator>
//   );
// };

// const TabBarIcon: React.FC<{focused: boolean; color: string; size: number; name: string}> = ({
//   focused,
//   color,
//   size,
//   name,
// }) => {
//   return <Icons name={name} size={size} color={focused ? color : undefined} />;
// };

// const TabBarLabel: React.FC<{focused: boolean; color: string; title: string}> = ({focused, color, title}) => {
//   return <Text style={{color: focused ? color : undefined}}>{title}</Text>;
// };

// const MaterialTopTabNavigators: React.FC = () => {
//   return (
//     <MaterialTopTab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarStyle: {minWidth: 50, backgroundColor: '#879'},
//         tabBarLabelStyle: {textTransform: 'capitalize', color: 'white', fontSize: 18, fontWeight: 'bold', margin: 0},
//         tabBarIndicatorStyle: {height: 2, backgroundColor: 'white'},
//       }}>
//       <MaterialTopTab.Screen name="Home" component={Home} />
//       <MaterialTopTab.Screen name="Page1" component={Page1} />
//       <MaterialTopTab.Screen name="Page2" component={Page2} />
//       <MaterialTopTab.Screen name="Page3" component={Page3} />
//     </MaterialTopTab.Navigator>
//   );
// };

// const DrawerNavigators: React.FC = () => {
//   return (
//     <DrawerNav.Navigator drawerContent={props => DrawerView(props)} screenOptions={{drawerActiveTintColor: 'white'}}>
//       <DrawerNav.Screen
//         name="DrawerPage"
//         component={Drawer}
//         options={{drawerIcon: props => TabBarIcon({...props, name: 'journal'})}}
//       />
//     </DrawerNav.Navigator>
//   );
// };

// const DrawerView: React.FC<DrawerContentComponentProps> = props => {
//   return (
//     <DrawerContentScrollView {...props} style={{backgroundColor: '#982300'}}>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// };
