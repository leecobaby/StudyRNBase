import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {ScreenProps} from '@/navigators/type';
import {useAppDispatch} from '@/hooks/store';
import {toggleTheme} from '@/store/themeSlice';

type Props = ScreenProps<'Detail'>;
export const Detail: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Page</Text>
      <Button title="切换主题" onPress={() => dispatch(toggleTheme())} />
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
