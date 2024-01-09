import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GlobalStyles} from '@/GlobalStyles';

interface Props {
  name: string;
  Icons: any;
  icon: string;
  children?: React.ReactNode;
  
}

export function DropDownMenu({name, Icons, icon, children}: Props) {
  const {colors} = useTheme();
  const [showItems, setShowItems] = useState(false);

  function onPress() {
    setShowItems(!showItems);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.setting_item_container} onPress={onPress}>
        <View style={styles.about_left}>
          {Icons && icon ? (
            <Icons name={icon} size={16} style={{color: colors.primary, marginRight: 10}} />
          ) : (
            <View style={styles.card} />
          )}
          <Text>{name}</Text>
        </View>
        <AntDesign
          name={showItems ? 'up' : 'down'}
          size={16}
          style={{color: colors.primary, marginRight: 10, alignSelf: 'center'}}
        />
      </TouchableOpacity>
      <View style={GlobalStyles.line} />
      {showItems && <View style={styles.subMenu}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  subMenu: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 1.5,
  },
});
