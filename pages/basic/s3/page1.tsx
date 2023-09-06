import React, {useEffect, useLayoutEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {ScreenProps} from '@/navigators/type';

interface Props extends ScreenProps<'Page1'> {}

export const Page1: React.FC<Props> = ({route, navigation}) => {
  const {name} = route.params || {};

  useEffect(() => {
    navigation.setOptions({
      title: `Page1 ${name ?? ''}`,
    });
  }, [navigation, name]);

  return (
    <View style={{flex: 1, backgroundColor: 'lightgray', paddingTop: 30}}>
      <Text style={styles.text}>Welcome to Page1</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go Page2" onPress={() => navigation.navigate('Page2')} />
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
