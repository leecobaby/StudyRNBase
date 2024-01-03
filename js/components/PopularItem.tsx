import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Flag} from '@/types/enum';
import {onFavorite} from '@/dao/FavoriteDao';
import {useAppDispatch} from '@/hooks/store';
import {FavoriteButton} from './FavoriteButton';
import {PopularItemType} from '@/store/popularSlice';
import {useTheme} from '@react-navigation/native';
import {getDispatchAction} from '@/utils';
import {updateFavoriteCounter} from '@/store/updateSlice';

type Props = {
  item?: PopularItemType;
  index: number;
  itemKey: string;
  onSelect: () => void;
};

export const PopularItem: React.FC<Props> = ({item, index, itemKey, onSelect}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  if (!item || !item.owner) return null;
  const flag = Flag.popular;

  function onPressFavorite() {
    if (!item) return;
    const dispatchAction = getDispatchAction(flag, itemKey);
    dispatch(dispatchAction({item: item as any, index, key: itemKey}));
    const isFavorite = !item.isFavorite;
    const key = itemKey === 'popular' ? 'popular' : 'favorite';
    dispatch(updateFavoriteCounter(key));
    onFavorite(flag, item, isFavorite);
  }
  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={stlyes.container}>
        <Text style={stlyes.title}>{item.full_name}</Text>
        <Text style={stlyes.description}>{item.description}</Text>
        <View style={stlyes.row}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Author:</Text>
            <Image style={{width: 22, height: 22}} source={{uri: item.owner.avatar_url}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Stars:</Text>
            <Text>{item.stargazers_count}</Text>
          </View>
          <FavoriteButton isFavorite={item.isFavorite} onPress={onPressFavorite} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const stlyes = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: '#ccc',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    // Android
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
});
