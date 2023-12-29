import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, RefreshControl, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation, useTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {NavigationBar} from '@/components/NavigationBar';
import {TrendingItem} from '@/components/TrendingItem';
import {TrendingDialog} from '@/components/TrendingDialog';
import {fetchTrendingData, selectTrending} from '@/store/trendingSlice';
import {ScreenProps} from '@/navigators/type';

export type TimeSpan = {
  title: string;
  value: string;
};
export const timespans: TimeSpan[] = [
  {title: '今 天', value: 'daily'},
  {title: '本 周', value: 'weekly'},
  {title: '本 月', value: 'monthly'},
];

type Props = ScreenProps<'TrendingPage'>;
type NavigationProp = Props['navigation'];

const URL = 'https://github.com/trending';
const tabNames = ['All', 'Java', 'C', 'C#', 'Go', 'Dart'];
const THEME_COLOR = '#a67';

export const TrendingPage: React.FC = () => {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);
  const [timespan, setTimespan] = useState<TimeSpan>(timespans[0]);

  function TitleView() {
    return (
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Text style={{fontSize: 18, color: '#fff', fontWeight: '400'}}>趋势 {timespan.title}</Text>
          <MaterialIcons name="arrow-drop-down" size={22} style={{color: 'white'}} />
        </View>
      </TouchableOpacity>
    );
  }

  function onSelectTimeSpan(tab: TimeSpan) {
    setVisible(false);
    setTimespan(tab);
  }

  return (
    <View style={{flex: 1}}>
      <NavigationBar
        statusBar={{backgroundColor: colors.primary}}
        style={{backgroundColor: colors.primary}}
        titleView={<TitleView />}
      />
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarStyle: [styles.tabBarStyle, {backgroundColor: colors.primary}],
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        }}
        initialRouteName={'All'}>
        {tabNames.map((item, index) => (
          // 传递参数给 TrendingTabPage
          <Tab.Screen key={index} name={item} children={props => <TrendingTabPage {...props} timespan={timespan} />} />
        ))}
      </Tab.Navigator>
      <TrendingDialog visible={visible} onClose={() => setVisible(false)} onSelect={onSelectTimeSpan} />
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const pageSizes = 10;

export const TrendingTabPage: React.FC<{route: any; timespan: TimeSpan}> = ({route, timespan}) => {
  const navigation = useNavigation<NavigationProp>();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const trending = useAppSelector(selectTrending);
  const trendingData = trending[route.name];
  const allItems = trendingData?.items;
  const key = route.name || '';
  const url = genFetchUrl(key, timespan.value);
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
  }, [timespan]);

  useEffect(() => {
    setItems(allItems?.slice(0, pageIndex * pageSizes));
  }, [allItems]);

  useEffect(() => {
    loadMore();
  }, [pageIndex]);

  const handleEndReached = () => {
    setPageIndex(pageIndex + 1);
  };

  const reanderItem = (item: any, index: number) => {
    return (
      <TrendingItem itemKey={key} item={item} index={index} onSelect={() => navigation.navigate('Detail', {item})} />
    );
  };

  return trendingData?.loading || !items ? (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item, index}) => reanderItem(item, index)}
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

function genFetchUrl(key: string, timespan: string) {
  const path = key === 'All' ? '' : '/' + key;
  return URL + path + '?since=' + timespan;
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
    backgroundColor: THEME_COLOR,
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
