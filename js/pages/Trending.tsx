import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {TrendingItem} from '@/components/TrendingItem';
import {fetchTrendingData, selectTrending} from '@/store/trendingSlice';

const URL = 'https://github.com/trending';
const QUERY_STR = '?since=daily';
const tabNames = ['All', 'Java', 'C', 'C#', 'Go', 'Dart'];

export const TrendingPage: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        }}
        initialRouteName={'All'}>
        {tabNames.map((item, index) => (
          // 传递参数给 TrendingTabPage
          <Tab.Screen key={index} name={item} component={TrendingTabPage} />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const reanderItem = (item: any) => {
  return <TrendingItem item={item} onSelect={() => {}} />;
};

const pageSizes = 10;

export const TrendingTabPage: React.FC<{route: any}> = ({route}) => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const trending = useAppSelector(selectTrending);
  const trendingData = trending[route.name];
  const allItems = trendingData?.items;
  const key = route.name || '';
  const url = genFetchUrl(key);
  const [pageIndex, setPageIndex] = useState(1);
  const [items, setItems] = useState(allItems?.slice(0, pageIndex * pageSizes));
  const loadData = () => {
    dispatch(fetchTrendingData({key, url}));
  };

  const loadMore = () => {
    if (!allItems) return;
    if (allItems.length > pageIndex * pageSizes) {
      setItems(allItems?.slice(0, pageIndex * pageSizes));
    } else {
      toast.show('没有更多数据了', {
        duration: 1000,
        placement: 'center',
        animationType: 'zoom-in',
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setItems(allItems?.slice(0, pageIndex * pageSizes));
  }, [allItems]);

  useEffect(() => {
    loadMore();
  }, [pageIndex]);

  const handleEndReached = () => {
    setPageIndex(pageIndex + 1);
  };

  return trendingData?.loading || !items ? (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  ) : (
    <View style={styles.container}>
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
            refreshing={trendingData.loading}
            onRefresh={() => loadData()}
          />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

function genFetchUrl(key: string) {
  const path = key === 'All' ? '' : '/' + key;
  return URL + path + QUERY_STR;
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
