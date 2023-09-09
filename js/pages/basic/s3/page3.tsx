import {ScreenProps} from '@/js/navigators/type';
import React, {useCallback, useEffect} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';

type Props = ScreenProps<'Page3'>;

export const Page3: React.FC<Props> = ({route, navigation}) => {
  const {name, mode} = route.params || {};
  const showText = mode === 'edit' ? '正在编辑' : '编辑完成';

  const headerRight = useCallback(() => {
    return (
      <Button
        title={mode === 'edit' ? '保存' : '编辑'}
        onPress={() => {
          navigation.setParams({mode: mode === 'edit' ? '' : 'edit'});
        }}
      />
    );
  }, [mode, navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: `${name ?? 'this is page3'}`,
      headerRight,
    });
  }, [navigation, name, headerRight]);

  return (
    <View style={{flex: 1, backgroundColor: 'lightgray', paddingTop: 30}}>
      <Text style={styles.text}>Welcome to Page3</Text>
      <Text style={styles.text}>{showText}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go Page1" onPress={() => navigation.navigate('Page1')} />
      <Button title="Go Page2" onPress={() => navigation.navigate('Page2')} />

      <TextInput
        style={styles.input}
        onChangeText={text => {
          navigation.setParams({name: text});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    borderColor: 'black',
  },
  showText: {
    marginTop: 20,
    fontSize: 20,
    color: 'red',
  },
});
