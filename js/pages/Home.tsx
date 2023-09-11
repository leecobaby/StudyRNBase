import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {FavoritePage} from './Favorite';
import {MyPage} from './Me';
import {PopularPage} from './Popular';
import {TrendingPage} from './Trending';
import {RootStackParamList, ScreenProps} from '@/navigators/type';

const BottonTab = createBottomTabNavigator<RootStackParamList>();

type HomeNavigatorProps = ScreenProps<'Home'>;
export const Home: React.FC<HomeNavigatorProps> = ({navigation}) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
