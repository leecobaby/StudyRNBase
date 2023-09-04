import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface Props {
  navigation: any;
}

export const Home: React.FC<Props> = props => {
  const {navigation} = props;
  return (
    <View style={{flex: 1, backgroundColor: 'lightgray', paddingTop: 30}}>
      <Text style={styles.text}>Welcome to home page</Text>
      <Button title="Go to page1" onPress={() => navigation.navigate('Page1')} />
      <Button title="Go to page2 " onPress={() => navigation.navigate('Page2')} />
      <Button title="Go to page3" onPress={() => navigation.navigate('Page3')} />
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
