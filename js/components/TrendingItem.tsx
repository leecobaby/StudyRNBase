import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HTMLView from 'react-native-htmlview';

import {FavoriteButton} from './FavoriteButton';
import {TrendingItemType, toggleFavorite} from '@/store/trendingSlice';
import {useAppDispatch} from '@/hooks/store';
import {onFavorite} from '@/dao/FavoriteDao';
import {Flag} from '@/types/enum';
import {useTheme} from '@react-navigation/native';

type Props = {
  item?: TrendingItemType;
  index: number;
  itemKey: string;
  onSelect: () => void;
};

export const TrendingItem: React.FC<Props> = ({item, index, itemKey, onSelect}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  if (!item || !item.id) return null;

  const description = '<p>' + item.description + '</p>';
  const flag = Flag.trending;

  function onPressFavorite() {
    if (!item) return;
    const isFavorite = !item.isFavorite;
    dispatch(toggleFavorite({item, index, key: itemKey}));
    onFavorite(flag, item, isFavorite);
  }

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <HTMLView
          value={description}
          onLinkPress={url => {}}
          stylesheet={{
            p: styles.description,
            a: styles.description,
          }}
        />
        <Text style={styles.description}>{item.meta}</Text>
        <View style={styles.row}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Built by: </Text>
            {item.contributors.map((result, i, arr) => {
              return <Image key={i} style={{height: 22, width: 22, margin: 2}} source={{uri: arr[i]}} />;
            })}
          </View>
          <FavoriteButton isFavorite={item.isFavorite} onPress={onPressFavorite} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
