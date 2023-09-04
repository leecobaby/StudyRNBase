import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface Props {
  navigation: any;
}

export const Page3: React.FC<Props> = props => {
  const {navigation} = props;
  return (
    <View style={{flex: 1, backgroundColor: 'lightgray', paddingTop: 30}}>
      <Text style={styles.text}>Welcome to Page3</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go Page1" onPress={() => navigation.navigate('Page1')} />
      <Button title="Go Page2" onPress={() => navigation.navigate('Page2')} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
  },
});
