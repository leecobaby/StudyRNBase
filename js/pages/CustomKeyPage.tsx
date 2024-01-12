import React, {useEffect, useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';

import {ArrayUtil} from '@/utils/array';
import {ScreenProps} from '@/navigators/type';
import {fetchLangData} from '@/store/langSlice';
import {FlagLang, LanguageDao} from '@/dao/LanguageDao';
import {NavigationBar} from '@/components/NavigationBar';
import {LeftBackButton} from '@/components/LeftBackButton';
import {useAppDispatch, useAppSelector} from '@/hooks/store';

type Props = ScreenProps<'CustomKeyPage'>;
export function CustomKeyPage({route, navigation}: Props) {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {flagLang, isRemoveKey} = route.params;
  const flag = flagLang === FlagLang.Popular ? 'popular' : 'trending';
  let languages = useAppSelector(state => state.lang)[flag];
  const changeCache: Lang[] = [];
  const keys = useMemo(warpKeys, [isRemoveKey, languages]);
  const loadData = () => {
    dispatch(fetchLangData({flagLang: flagLang}));
  };

  useEffect(() => {
    loadData();
  }, []);

  function warpKeys() {
    if (isRemoveKey) {
      return languages.map(item => ({
        ...item,
        checked: false,
      }));
    } else {
      return languages;
    }
  }

  function onBack() {
    if (changeCache.length === 0) {
      navigation.goBack();
      return;
    }
    Alert.alert('提示', '要保存修改吗？', [
      {
        text: '否',
        onPress: () => navigation.goBack(),
        style: 'cancel',
      },
      {
        text: '是',
        onPress: () => onSave(),
      },
    ]);
  }

  async function onSave() {
    if (changeCache.length === 0) {
      navigation.goBack();
      return;
    }

    if (isRemoveKey) {
      // 移除标签
      for (const item of changeCache) {
        ArrayUtil.remove(languages, item, 'name');
      }
    }

    await LanguageDao.save(flagLang, languages);
    dispatch(fetchLangData({flagLang: flagLang}));
    navigation.goBack();
  }

  function onToggle(item: Lang) {
    ArrayUtil.updateArray(changeCache, item);
    const newItem = {...item, checked: !item.checked};
    // 更新 languages
    languages = languages.map(item => {
      if (item.name === newItem.name) return newItem;
      return item;
    });
  }

  function LabelItem({item}: {item: Lang}) {
    return (
      <View style={styles.labelItem}>
        <Text style={styles.label}>{item.name}</Text>
        <CheckBox value={item.checked} onValueChange={() => onToggle(item)} boxType="square" style={styles.checkbox} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={isRemoveKey ? '标签移除' : '自定义标签'}
        statusBar={{backgroundColor: colors.primary}}
        style={{backgroundColor: colors.primary}}
        leftButton={<LeftBackButton onPress={onBack} />}
        rightButton={
          <TouchableOpacity style={{alignItems: 'center'}} onPress={onSave}>
            <Text style={styles.saveButton}>{isRemoveKey ? '移除' : '保存'}</Text>
          </TouchableOpacity>
        }
      />
      <FlatList
        data={keys}
        renderItem={({item}) => <LabelItem item={item} />}
        keyExtractor={item => item.name}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  saveButton: {
    fontSize: 20,
    color: 'white',
    marginRight: 10,
  },
  labelItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#999',
    margin: 5,
    marginVertical: 3,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
