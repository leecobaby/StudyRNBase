import React, {useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {View, Text, StyleSheet, TouchableHighlight, Modal, TouchableOpacity} from 'react-native';

import {toggleTheme} from '@/store/themeSlice';
import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {ThemeFlags, ThemeFlagsKey, ThemeFlagsKeys} from '@/dao/ThemeDao';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function CustomTheme({visible, onClose}: Props) {
  const dispatch = useAppDispatch();

  function onSelectTheme(theme: ThemeFlags) {
    dispatch(toggleTheme(theme));
  }

  function LabelItem({item: key}: {item: ThemeFlagsKey}) {
    return (
      <TouchableHighlight
        style={{flex: 1}}
        underlayColor="white"
        onPress={() => {
          onSelectTheme(ThemeFlags[key]);
        }}>
        <View style={[styles.labelItem, {backgroundColor: ThemeFlags[key]}]}>
          <Text style={styles.label}>{key}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={{flex: 1}} onPress={onClose}>
        <View style={styles.container}>
          <FlatList
            data={ThemeFlagsKeys}
            renderItem={({item}) => <LabelItem item={item} />}
            keyExtractor={key => key}
            numColumns={3}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    margin: 10,
    marginVertical: '30%',
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: 'gray',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 3,
  },
  labelItem: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#999',
    margin: 5,
    marginVertical: 3,
  },
  label: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    overflow: 'hidden',
  },
});
