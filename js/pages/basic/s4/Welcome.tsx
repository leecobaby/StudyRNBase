import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Welcome: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 30,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
