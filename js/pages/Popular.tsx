import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];

export const PopularPage: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
      }}>
      {tabNames.map((item, index) => (
        <Tab.Screen key={index} name={item} component={PopularTabPage} />
      ))}
    </Tab.Navigator>
  );
};

const Tab = createMaterialTopTabNavigator();

export const PopularTabPage: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Popular Page</Text>
      <Link to={{screen: 'Detail'}} style={{marginBottom: 20}}>
        <Text>跳转到详情页</Text>
      </Link>
    </View>
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
  tabBarStyle: {
    backgroundColor: '#a67',
  },
  tabBarItemStyle: {
    minWidth: 30,
  },
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontSize: 13,
    marginVertical: 6,
    fontWeight: 'bold',
    color: 'white',
  },
  tabBarIndicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
});
