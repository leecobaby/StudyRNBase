import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ScreenProps} from '@/navigators/type';
import {useAppDispatch} from '@/hooks/store';
import {toggleTheme} from '@/store/themeSlice';
import {fetchData} from '@/dao/DataStore';

const KEY = 'save_key';
type Props = ScreenProps<'Detail'>;
export const Detail: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [storage, setStorage] = useState('');
  const [optdata, setOptdata] = useState('');
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(value)}`;

  const loadData = () => {
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

  const doSave = () => {
    AsyncStorage.setItem(KEY, value).catch(e => console.log(e.toString()));
  };
  const doGet = () => {
    AsyncStorage.getItem(KEY)
      .then(val => {
        setStorage(val || '');
      })
      .catch(e => console.log(e.toString()));
  };
  const doRemove = () => {
    AsyncStorage.removeItem(KEY).catch(e => console.log(e.toString()));
  };

  const doGetData = () => {
    fetchData<any>(url)
      .then(res => {
        setOptdata(`初次数据加载时间：${new Date(res.timestamp)}\n${JSON.stringify(res.data)}`);
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

      <Text style={styles.text}>AsyncStorage 使用</Text>
      <View style={styles.storageAction}>
        <Text onPress={() => doSave()}>存储</Text>
        <Text onPress={() => doGet()}>获取</Text>
        <Text onPress={() => doRemove()}>删除</Text>
      </View>
      <Text>{storage}</Text>

      <Text style={styles.text}>离线缓存</Text>
      <View style={styles.storageAction}>
        <Text onPress={() => doGetData()}>获取</Text>
      </View>
      <Text>{optdata}</Text>
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
  storageAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    marginVertical: 10,
  },
});
