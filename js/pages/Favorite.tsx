import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {ScreenProps} from '@/navigators/type';

type Props = ScreenProps<'FavoritePage'>;
export const FavoritePage: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorite Page</Text>
      <Button
        title="修改颜色"
        onPress={() => {
          navigation.getParent()?.setParams({theme: {color: 'green'}});
        }}
      />
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
