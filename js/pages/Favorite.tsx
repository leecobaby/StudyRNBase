import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {useFocusEffect, useNavigation, useTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {PopularItem} from '@/components/PopularItem';
import {NavigationBar} from '@/components/NavigationBar';
import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {ScreenProps} from '@/navigators/type';
import {Flag} from '@/types/enum';
import {fetchFavoriteData, selectFavorite} from '@/store/favoriteSlice';
import {TrendingItem} from '@/components/TrendingItem';

type Props = ScreenProps<'PopularPage'>;
type NavigationProp = Props['navigation'];

export const FavoritePage: React.FC = () => {
  const {colors} = useTheme();
  const bgColorStyle = {backgroundColor: colors.primary};
  return (
    <View style={{flex: 1}}>
      <NavigationBar title="收藏" statusBar={bgColorStyle} style={bgColorStyle} />
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarStyle: [styles.tabBarStyle, bgColorStyle],
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        }}
        initialRouteName={'Popular'}>
        <Tab.Screen name={'Popular'} component={FavotiteTabPage} options={{title: '流行'}} />
        <Tab.Screen name={'Trending'} component={FavotiteTabPage} options={{title: '趋势'}} />
      </Tab.Navigator>
    </View>
  );
};
const Tab = createMaterialTopTabNavigator();

const pageSizes = 10;
const cache = {
  update: 0,
};

export const FavotiteTabPage: React.FC<{route: any}> = ({route}) => {
  const navigation = useNavigation<NavigationProp>();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const key = route.name.toLowerCase() || '';
  const favorite = useAppSelector(selectFavorite);
  const updateFavorite = useAppSelector(state => state.update.favorite);
  const favoriteData = favorite[key];
  const allItems = favoriteData?.items;
  const [pageIndex, setPageIndex] = useState(1);
  const [items, setItems] = useState(allItems?.slice(0, pageIndex * pageSizes));
  const [canLoadMore, setCanLoadMore] = useState(false);
  const flag = useMemo(() => {
    return key === 'popular' ? Flag.popular : Flag.trending;
  }, [key]);
  const loadData = () => {
    dispatch(fetchFavoriteData({flag}));
  };

  const loadMore = () => {
    if (!allItems) return;
    if (allItems.length > pageIndex * pageSizes) {
      setItems(allItems?.slice(0, pageIndex * pageSizes));
    } else {
      if (pageIndex > 1) {
        toast.show('没有更多数据了', {
          duration: 1000,
          placement: 'center',
          animationType: 'zoom-in',
        });
      }
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

  useFocusEffect(
    // 当 updateFavorite 变化时，重新加载数据
    React.useCallback(() => {
      if (updateFavorite !== cache.update) {
        loadData();
        cache.update = updateFavorite;
      }
    }, [updateFavorite]),
  );

  const handleEndReached = () => {
    if (!canLoadMore) return;
    setPageIndex(pageIndex + 1);
  };

  function reanderItem(item: any, index: number) {
    const Item = key === 'popular' ? PopularItem : TrendingItem;
    return (
      <Item
        itemKey={key}
        item={item}
        index={index}
        onSelect={() => {
          navigation.navigate('Detail', {item, flag, itemKey: key, index});
        }}
      />
    );
  }

  return favoriteData?.loading || !items ? (
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
            refreshing={favoriteData.loading}
            onRefresh={() => loadData()}
          />
        }
        onEndReached={handleEndReached}
        onMomentumScrollBegin={() => {
          // fix 初始化时页调用onEndReached的问题
          setCanLoadMore(true);
        }}
        onEndReachedThreshold={0.1}
      />
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
