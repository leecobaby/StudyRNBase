import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, ScrollView} from 'react-native';

import {ScreenProps} from '@/navigators/type';
import {useAppDispatch} from '@/hooks/store';
import {toggleTheme} from '@/store/themeSlice';

type Props = ScreenProps<'Detail'>;
export const Detail: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const loadData = () => {
    const url = `https://api.github.com/search/repositories?q=${value}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(responseData => {
        setData(responseData.items);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Detail Page</Text>
      <Button title="切换主题" onPress={() => dispatch(toggleTheme())} />

      <TextInput style={styles.input} onChangeText={text => setValue(text)} value={value} />
      <Button title="获取" onPress={loadData} />
      <Text>{JSON.stringify(data)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {height: 30, borderColor: 'gray', borderWidth: 1, width: 200},
});
