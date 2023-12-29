import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  isFavorite: boolean;
  onPress: () => void;
  color?: string;
}

export function FavoriteButton(props: Props) {
  const {isFavorite, onPress, color} = props;
  const name = isFavorite ? 'star' : 'star-o';

  return (
    <TouchableOpacity style={{padding: 6}} onPress={onPress}>
      <FontAwesome name={name} size={26} style={{color: color ?? 'red'}} />
    </TouchableOpacity>
  );
}
