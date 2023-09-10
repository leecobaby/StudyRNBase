import React, {useEffect} from 'react';
import {Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import {PopularPage} from '@/js/pages/Popular';
import {DrawerParamList, RootStackParamList, ScreenProps} from './type';
import {TrendingPage} from '@/js/pages/Trending';
import {FavoritePage} from '../pages/Favorite';
import {MyPage} from '../pages/Me';
import {useNavigation} from '@react-navigation/native';

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

type MainNavigatorProps = ScreenProps<'Main'>;
const MainNavigator: React.FC<MainNavigatorProps> = ({navigation}) => {
  const {theme} = navigation.getState().routes.at(0)?.params || {};

  return (
    <BottonTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 16},
        header: () => null,
        tabBarActiveTintColor: theme?.color,
      }}>
      <BottonTab.Screen
        name="PopularPage"
        component={PopularPage}
        options={{
          tabBarLabel: '最热',
          tabBarIcon: ({color}) => <MaterialIcons name="whatshot" size={26} color={color} />,
        }}
      />
      <BottonTab.Screen
        name="TrendingPage"
        component={TrendingPage}
        options={{
          tabBarLabel: '趋势',
          tabBarIcon: ({color}) => <MaterialIcons name="trending-up" size={26} color={color} />,
        }}
      />
      <BottonTab.Screen
        name="FavoritePage"
        component={FavoritePage}
        options={{
          tabBarLabel: '收藏',
          tabBarIcon: ({color}) => <MaterialIcons name="favorite" size={26} color={color} />,
        }}
      />
      <BottonTab.Screen
        name="MyPage"
        component={MyPage}
        options={{tabBarLabel: '我的', tabBarIcon: ({color}) => <AntDesign name="user" size={26} color={color} />}}
      />
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
