import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Link, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {fetchPopularData, selectPopular} from '@/store/popularSlice';
import {FlatList} from 'react-native-gesture-handler';
import {Icon} from 'react-native-vector-icons/Icon';
type Props = {
  item?: {owner?: {avatar_url: string; login: string}};
  onSelect: () => void;
};

export const PopularItem: React.FC<Props> = ({item, onSelect}) => {
  if (!item || !item.owner) return null;

  let favoriteButton = (
    <TouchableOpacity style={{padding: 6}} onPress={() => {}}>
      <FontAwesome name={'star-o'} size={26} style={{color: 'red'}} />
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={stlyes.container}>
        <Text style={stlyes.title}>{item.full_name}</Text>
        <Text style={stlyes.description}>{item.description}</Text>
        <View style={stlyes.row}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Author:</Text>
            <Image style={{width: 22, height: 22}} source={{uri: item.owner.avatar_url}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Stars:</Text>
            <Text>{item.stargazers_count}</Text>
          </View>
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
