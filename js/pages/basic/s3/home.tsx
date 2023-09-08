import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {ScreenProps} from '@/navigators/type';

type Props = ScreenProps<'Home'>;

export const Home: React.FC<Props> = props => {
  const {navigation} = props;
  return (
    <View style={{flex: 1, backgroundColor: 'lightgray', paddingTop: 30}}>
      <Text style={styles.text}>Welcome to home page</Text>
      <Button title="Go to top" onPress={() => navigation.navigate('Top')} />
      <Button title="Go to bottom " onPress={() => navigation.navigate('Bottom')} />
      <Button title="Go to drawer" onPress={() => navigation.navigate('Drawer')} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'white',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
  },
});
