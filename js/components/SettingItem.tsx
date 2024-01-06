import React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface SettingItemProps {
  name: string;
  Icons: any;
  icon: string;
  onPress?: () => void;
}

export function SettingItem({name, Icons, icon, onPress}: SettingItemProps) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={styles.setting_item_container} onPress={onPress}>
      <View style={styles.about_left}>
        {Icons && icon ? (
          <Icons name={icon} size={16} style={{color: colors.primary, marginRight: 10}} />
        ) : (
          <View style={styles.card} />
        )}
        <Text>{name}</Text>
      </View>
      <AntDesign name="right" size={16} style={{color: colors.primary, marginRight: 10, alignSelf: 'center'}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  setting_item_container: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    opacity: 1,
    width: 16,
    height: 16,
    marginRight: 10,
  },
});
