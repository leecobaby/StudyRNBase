import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {View, Text, StyleSheet, RefreshControl, TextInput, TouchableOpacity, Keyboard} from 'react-native';

import {Flag} from '@/types/enum';
import {ScreenProps} from '@/navigators/type';
import {genPopularFetchUrl} from '@/utils/url';
import {fetchLangData} from '@/store/langSlice';
import {searchPopularData} from '@/dao/SearchDao';
import {PopularItem} from '@/components/PopularItem';
import {PopularItemType} from '@/store/popularSlice';
import {FlagLang, LanguageDao} from '@/dao/LanguageDao';
import {NavigationBar} from '@/components/NavigationBar';
import {LeftBackButton} from '@/components/LeftBackButton';
import {useAppDispatch, useAppSelector} from '@/hooks/store';

const pageSizes = 10;
type Props = ScreenProps<'SearchPage'>;

export const SearchPage: React.FC<Props> = ({navigation}) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const keys = useAppSelector(state => state.lang.popular);

  const [key, setKey] = useState('');
  const url = genPopularFetchUrl(key);
  const [isPending, setIsPending] = useState(false);
  const [allItems, setAllItems] = useState<PopularItemType[] | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [items, setItems] = useState(allItems?.slice(0, pageIndex * pageSizes));
  const flag = Flag.popular;

  function loadData() {
    Keyboard.dismiss();
    setIsPending(true);
    searchPopularData(url).then(data => {
      setAllItems(data);
      setIsPending(false);
    });
  }

  function loadMore() {
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
  }

  useEffect(() => {
    setItems(allItems?.slice(0, pageIndex * pageSizes));
  }, [allItems]);

  useEffect(() => {
    loadMore();
  }, [pageIndex]);

  const handleEndReached = () => {
    setPageIndex(pageIndex + 1);
  };

  function onBack() {
    Keyboard.dismiss();
    navigation.goBack();
  }

  async function saveKey() {
    if (!key) return;
    if (keys.some(item => item.name === key)) {
      toast.show('该标签已经存在', {
        duration: 1000,
        placement: 'center',
        animationType: 'zoom-in',
      });
      return;
    }
    const languages = keys.concat([{name: key, path: key, checked: true}]);

    await LanguageDao.save(FlagLang.Popular, languages);
    dispatch(fetchLangData({flagLang: FlagLang.Popular}));
  }

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

  function AddLangButton() {
    const isEixst = keys.some(item => item.name === key);
    return isEixst || !key ? null : (
      <TouchableOpacity style={[styles.bottomButton, {backgroundColor: colors.primary}]} onPress={saveKey}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.text}>Add</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{flex: 1}}>
      <NavigationBar
        statusBar={{backgroundColor: colors.primary}}
        style={{backgroundColor: colors.primary}}
        titleLayoutStyle={styles.naviagtionBarTitle}
        titleView={<TextInput placeholder="请输入" onChangeText={text => setKey(text)} style={styles.textInput} />}
        leftButton={<LeftBackButton onPress={onBack} />}
        rightButton={
          <TouchableOpacity onPress={() => loadData()}>
            <View style={{padding: 5, marginRight: 8}}>
              <Text style={styles.text}>{isPending ? '取消' : '搜索'}</Text>
            </View>
          </TouchableOpacity>
        }
      />
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
              refreshing={isPending}
              onRefresh={() => loadData()}
            />
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      </View>
      <AddLangButton />
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
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  textLoading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    fontWeight: '500',
  },
  textInput: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    borderRadius: 3,
    opacity: 0.7,
    color: 'white',
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
  naviagtionBarTitle: {
    flex: 1,
    padding: 2,
    position: undefined,
    right: 0,
    left: 0,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 40,
    opacity: 0.9,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // shadow
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
});
