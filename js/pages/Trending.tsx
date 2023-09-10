import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {ScreenProps, RootStackParamList} from '../navigators/type';
import {useNavigation} from '@react-navigation/native';

type Props = ScreenProps<'TrendingPage'>;

export const TrendingPage: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trending Page</Text>
      <Button
        title="修改主题"
        onPress={() => {
          navigation.getParent()?.setParams({theme: {color: 'red'}});
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
