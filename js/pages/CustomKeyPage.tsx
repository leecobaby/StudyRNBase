import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, RefreshControl, TouchableOpacity, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {useFocusEffect, useNavigation, useTheme} from '@react-navigation/native';

import {NavigationBar} from '@/components/NavigationBar';
import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {ScreenProps} from '@/navigators/type';
import {fetchLangData} from '@/store/langSlice';
import {FlagLang} from '@/dao/LanguageDao';
import {LeftBackButton} from '@/components/LeftBackButton';

type Props = ScreenProps<'CustomKeyPage'>;
export function CustomKeyPage({route, navigation}: Props) {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {flagLang, isRemoveKey} = route.params;
  const languages = useAppSelector(state => state.lang)[flagLang === FlagLang.Popular ? 'popular' : 'trending'];
  const keys = useMemo(() => languages.map(item => item.name), [languages]);
  const loadData = () => {
    dispatch(fetchLangData({flagLang: flagLang}));
  };

  useEffect(() => {
    loadData();
  }, []);

  function onBack() {
    navigation.goBack();
  }

  function onSave() {}

  function LabelItem({item}: {item: string}) {
    return (
      <TouchableOpacity style={styles.labelItem}>
        <Text>{item}</Text>
        <Text>口</Text>
      </TouchableOpacity>
    );
  }

  function LabelList() {
    return (
      <FlatList
        data={keys}
        renderItem={({item}) => <LabelItem item={item} />}
        keyExtractor={item => item}
        numColumns={2}
      />
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
      {keys.length > 0 ? <LabelList /> : null}
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
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#999',
    margin: 5,
    marginVertical: 3,
  },
});
