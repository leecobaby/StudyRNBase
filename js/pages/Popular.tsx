import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {useFocusEffect, useNavigation, useTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {PopularItem} from '@/components/PopularItem';
import {NavigationBar} from '@/components/NavigationBar';
import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {fetchPopularData, selectPopular} from '@/store/popularSlice';
import {ScreenProps} from '@/navigators/type';
import {Flag} from '@/types/enum';
import {fetchLangData} from '@/store/langSlice';
import {FlagLang} from '@/dao/LanguageDao';

type Props = ScreenProps<'PopularPage'>;
type NavigationProp = Props['navigation'];

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];

export const PopularPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const keys = useAppSelector(state => state.lang.popular);
  const loadData = () => {
    dispatch(fetchLangData({flagLang: FlagLang.Popular}));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <NavigationBar
        title="最热"
        statusBar={{backgroundColor: colors.primary}}
        style={{backgroundColor: colors.primary}}
        rightButton={
          <View style={{padding: 5, marginRight: 8}}>
            <Text style={{color: 'white'}}>搜索</Text>
          </View>
        }
        leftButton={
          <View style={{padding: 5, marginRight: 8}}>
            <Text style={{color: 'white'}}>扫一扫</Text>
          </View>
        }
      />
      {keys.length === 0 ? null : (
        <Tab.Navigator
          screenOptions={{
            lazy: true,
            tabBarScrollEnabled: true,
            tabBarStyle: [styles.tabBarStyle, {backgroundColor: colors.primary}],
            tabBarItemStyle: styles.tabBarItemStyle,
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
          }}
          initialRouteName={'ALL'}>
          {keys
            .filter(item => item.checked)
            .map((item, index) => (
              <Tab.Screen key={index} name={item.name} component={PopularTabPage} />
            ))}
        </Tab.Navigator>
      )}
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const pageSizes = 10;
const cache = {
  update: 0,
};

export const PopularTabPage: React.FC<{route: any}> = ({route}) => {
  const navigation = useNavigation<NavigationProp>();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const popular = useAppSelector(selectPopular);
  const updatePopular = useAppSelector(state => state.update.popular);
  const popularData = popular[route.name];
  const allItems = popularData?.items;
  const key = route.name || '';
  const url = genFetchUrl(key);
  const [pageIndex, setPageIndex] = useState(1);
  const [items, setItems] = useState(allItems?.slice(0, pageIndex * pageSizes));
  const flag = Flag.popular;
  const loadData = () => {
    dispatch(fetchPopularData({key, url}));
  };
  console.log('cache.update', cache.update, updatePopular);

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

  useFocusEffect(
    React.useCallback(() => {
      if (cache.update !== updatePopular) {
        loadData();
        cache.update = updatePopular;
      }
    }, [updatePopular]),
  );

  const handleEndReached = () => {
    setPageIndex(pageIndex + 1);
  };

  function reanderItem(item: any, index: number) {
    return (
      <PopularItem
        itemKey={key}
        item={item}
        index={index}
        onSelect={() => {
          navigation.navigate('Detail', {item, flag, itemKey: key, index});
        }}
      />
    );
  }

  return popularData?.loading || !items ? (
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
            refreshing={popularData.loading}
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
