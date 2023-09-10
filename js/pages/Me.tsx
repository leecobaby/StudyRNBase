import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {ScreenProps} from '../navigators/type';

type Props = ScreenProps<'MyPage'>;
export const MyPage: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Page</Text>
      <Button
        title="修改主题"
        onPress={() => {
          navigation.getParent()?.setParams({theme: {color: 'blue'}});
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
