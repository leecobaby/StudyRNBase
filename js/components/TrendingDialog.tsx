import React, {useState} from 'react';
import {Modal, NativeSyntheticEvent, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {TimeSpan, timespans} from '@/pages/Trending';

interface Props {
  visible: boolean;
  onClose?: () => any;
  onSelect?: (item: TimeSpan) => any;
  onRequestClose?: () => any;
}

export function TrendingDialog({visible, onClose, onSelect, onRequestClose}: Props) {
  function onInternalClose() {
    // console.log(e.target);
    onClose?.();
  }
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <TouchableOpacity style={styles.container} onPress={onInternalClose}>
        <MaterialIcons name="arrow-drop-up" size={36} style={styles.arrow} />
        <View style={styles.content}>
          {timespans.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => onSelect?.(item)} key={index}>
                <View style={styles.text_container}>
                  <Text style={styles.text}>{item.title}</Text>
                </View>
                {index !== timespans.length - 1 ? <View style={styles.line} /> : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },
  arrow: {
    marginTop: 40,
    color: 'white',
    padding: 0,
    margin: -15,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
  },
  text_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 2,
    paddingLeft: 26,
    paddingRight: 26,
  },
  line: {
    height: 0.5,
    backgroundColor: '#ddd',
  },
});
