import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {ScreenProps} from '@/js/navigators/type';

type Props = ScreenProps<'Page2'>;

export const Page2: React.FC<Props> = props => {
  const {navigation} = props;

  return (
    <View style={{flex: 1, backgroundColor: 'lightgray', paddingTop: 30}}>
      <Text style={styles.text}>Welcome to Page2</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go Page1" onPress={() => navigation.navigate('Page1')} />
      <Button title="Go Page3" onPress={() => navigation.navigate('Page3')} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
  },
});
