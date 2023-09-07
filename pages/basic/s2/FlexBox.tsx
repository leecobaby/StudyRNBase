import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

export function FlexBoxTest(): JSX.Element {
  return (
    <View style={{display: 'flex', flexDirection: 'column', backgroundColor: 'darkgray', marginTop: 20, height: 500}}>
      <View style={{width: 100, backgroundColor: 'darkcyan', margin: 5, flex: 1}}>
        <Text style={{fontSize: 20}}>1</Text>
      </View>
      <View style={{width: 100, backgroundColor: 'darkcyan', margin: 5, flex: 1}}>
        <Text>2</Text>
      </View>
      <View style={{width: 100, backgroundColor: 'darkcyan', margin: 5, flex: 1}}>
        <Text>3</Text>
      </View>
      <View style={{width: 100, backgroundColor: 'darkcyan', margin: 5, flex: 1}}>
        <Text>矢量图标</Text>
        <Icons name="accessibility" size={50} style={{color: 'red'}} />
        <Icons name="american-football" size={50} style={{color: 'blue'}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
