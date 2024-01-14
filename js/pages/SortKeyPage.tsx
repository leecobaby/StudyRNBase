import React, {useEffect, useMemo, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import DraggableFlatList, {RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ArrayUtil} from '@/utils/array';
import {ScreenProps} from '@/navigators/type';
import {fetchLangData} from '@/store/langSlice';
import {FlagLang, LanguageDao} from '@/dao/LanguageDao';
import {NavigationBar} from '@/components/NavigationBar';
import {LeftBackButton} from '@/components/LeftBackButton';
import {useAppDispatch, useAppSelector} from '@/hooks/store';

type Props = ScreenProps<'SortKeyPage'>;
export function SortKeyPage({route, navigation}: Props) {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {flagLang} = route.params;
  const flag = flagLang === FlagLang.Popular ? 'popular' : 'trending';
  const initLanguages = useAppSelector(state => state.lang)[flag];
  const [languages, setLanguages] = useState<Lang[]>(initLanguages);
  const loadData = () => {
    dispatch(fetchLangData({flagLang: flagLang}));
  };

  useEffect(() => {
    loadData();
  }, []);

  function onBack() {
    if (isEqualForLang(initLanguages, languages)) {
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
    await LanguageDao.save(flagLang, languages);
    dispatch(fetchLangData({flagLang: flagLang}));
    navigation.goBack();
  }

  const renderItem = ({item, drag, isActive}: RenderItemParams<Lang>) => {
    return item.checked ? (
      <ScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive} style={styles.dragContainer}>
          <Text style={styles.label}>{item.name}</Text>
          <MaterialIcons name={'drag-indicator'} size={24} color={'#999'} />
        </TouchableOpacity>
      </ScaleDecorator>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'排序'}
        statusBar={{backgroundColor: colors.primary}}
        style={{backgroundColor: colors.primary}}
        leftButton={<LeftBackButton onPress={onBack} />}
        rightButton={
          <TouchableOpacity style={{alignItems: 'center'}} onPress={onSave}>
            <Text style={styles.saveButton}>{'保存'}</Text>
          </TouchableOpacity>
        }
      />
      <DraggableFlatList
        data={languages}
        onDragEnd={({data}) => setLanguages(data)}
        keyExtractor={item => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}

function isEqualForLang(lang1: Lang[], lang2: Lang[]) {
  if (lang1.length !== lang2.length) {
    return false;
  }
  for (let i = 0, l = lang2.length; i < l; i++) {
    if (lang1[i].name !== lang2[i].name) {
      return false;
    }
  }
  return true;
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
  dragContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#999',
    margin: 5,
    marginVertical: 3,
    padding: 10,
  },
});
