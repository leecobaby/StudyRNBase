import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Callback = () => void;
interface Props {
  onPress?: Callback;
}

export function ShareButton(props: Props) {
  const {onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="share-social" size={20} style={{color: 'white', opacity: 0.9, marginRight: 10}} />
    </TouchableOpacity>
  );
}
