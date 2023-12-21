import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ScreenProps} from '@/navigators/type';
import {NavigationBar} from '@/components/NavigationBar';

type Props = ScreenProps<'MyPage'>;
export const MyPage: React.FC<Props> = ({navigation}) => {
  function changeTheme() {
    navigation.getParent()?.setParams({theme: {color: 'blue'}});
  }
  function LightButton() {
    return (
      <View style={{padding: 8, paddingLeft: 12}}>
        <Ionicons name="arrow-back" size={26} style={{color: 'white', marginRight: 10}} onPress={() => {}} />
      </View>
    );
  }
  function RightButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Feather name="search" size={24} style={{color: 'white', marginRight: 10}} onPress={() => {}} />
      </View>
    );
  }

  function MyPageContent() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>My Page</Text>
        <Button title="修改颜色" onPress={changeTheme} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <NavigationBar
        title="我的"
        statusBar={{backgroundColor: 'red'}}
        style={{backgroundColor: 'red'}}
        leftButton={<LightButton />}
        rightButton={<RightButton />}
      />
      <View style={styles.container}>
        <MyPageContent />
      </View>
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
