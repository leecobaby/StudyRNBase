import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Callback = () => void;
interface Props {
  onPress?: Callback;
}

export function LeftBackButton(props: Props) {
  const {onPress} = props;
  return (
    <TouchableOpacity style={{padding: 8, paddingLeft: 12}} onPress={onPress}>
      <Ionicons name="arrow-back" size={26} style={{color: '#fff'}} />
    </TouchableOpacity>
  );
}
