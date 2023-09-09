import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {DScreenProps} from '@/js/navigators/type';

type Props = DScreenProps<'DrawerPage'>;

export const Drawer: React.FC<Props> = props => {
  const {navigation} = props;

  return (
    <View style={{flex: 1, backgroundColor: 'lightgray', paddingTop: 30}}>
      <Text style={styles.text}>Welcome to Drawer</Text>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Close Drawer" onPress={() => navigation.closeDrawer()} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
  },
});
