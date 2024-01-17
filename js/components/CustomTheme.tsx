import React, {useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {View, Text, StyleSheet, TouchableHighlight, Modal, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {toggleTheme} from '@/store/themeSlice';
import {useAppDispatch, useAppSelector} from '@/hooks/store';
import {ThemeFlags, ThemeFlagsKey, ThemeFlagsKeys} from '@/dao/ThemeDao';
import {splitCamelCase} from '@/utils/string';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function CustomTheme({visible, onClose}: Props) {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(state => state.theme.theme);

  function onSelectTheme(theme: ThemeFlags) {
    dispatch(toggleTheme(theme));
  }

  function LabelItem({item: key}: {item: ThemeFlagsKey}) {
    const isSelected = ThemeFlags[key] === currentTheme;
    return (
      <TouchableHighlight
        style={{flex: 1 / 3}}
        underlayColor="white"
        onPress={() => {
          onSelectTheme(ThemeFlags[key]);
        }}>
        <View style={[styles.labelItem, {backgroundColor: ThemeFlags[key]}]}>
          <Text style={styles.label}>{splitCamelCase(key)}</Text>
          {isSelected && <MaterialIcons name="check" size={88} style={styles.selectedIcon} />}
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
    aspectRatio: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#999',
    margin: 5,
    marginVertical: 3,
    position: 'relative',
  },
  label: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    overflow: 'hidden',
  },
  selectedIcon: {
    position: 'absolute',
    zIndex: -1,
    margin: 'auto',
    color: 'rgba(0,0,0,0.3)',
  },
});
