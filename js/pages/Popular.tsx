import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Link, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {PopularItem} from '@/components/PopularItem';
import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {fetchPopularData, selectPopular} from '@/store/popularSlice';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

const tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];

export const PopularPage: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
      }}
      initialRouteName={'Java'}>
      {tabNames.map((item, index) => (
        // 传递参数给 PopularTabPage
        <Tab.Screen key={index} name={item} component={PopularTabPage} />
      ))}
    </Tab.Navigator>
  );
};

const Tab = createMaterialTopTabNavigator();

const reanderItem = (item: any) => {
  return <PopularItem item={item} onSelect={() => {}} />;
};

export const PopularTabPage: React.FC<{route: any}> = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const popular = useAppSelector(selectPopular);
  const popularData = popular[route.name];
  const items = popularData?.items;
  const key = route.name || '';
  const url = genFetchUrl(key);
  const loadData = () => {
    dispatch(fetchPopularData({key, url}));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return popularData?.loading || !items ? (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Name1: {key}</Text>
      <FlatList
        data={items}
        renderItem={({item}) => reanderItem(item)}
        keyExtractor={item => '' + item?.id}
        refreshControl={
          <RefreshControl
            title="Loading"
            titleColor="red"
            tintColor="red"
            colors={['red']}
            refreshing={popularData.loading}
            onRefresh={() => loadData()}
          />
        }
      />
    </View>
  );
};

function genFetchUrl(key: string) {
  return URL + encodeURIComponent(key) + QUERY_STR;
}

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
