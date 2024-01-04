import React from 'react';
import {View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ScreenProps} from '@/navigators/type';
import {NavigationBar} from '@/components/NavigationBar';
import {MORE_MENU} from '@/dao/MenuConst';
import {useTheme} from '@react-navigation/native';
import {GlobalStyles} from '@/GlobalStyles';

type Props = ScreenProps<'MyPage'>;
export const MyPage: React.FC<Props> = ({navigation}) => {
  const {colors} = useTheme();
  const navBarColorStyle = {
    backgroundColor: colors.primary,
  };
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

  return (
    <View style={GlobalStyles.root_container}>
      <NavigationBar
        title="我的"
        statusBar={navBarColorStyle}
        style={navBarColorStyle}
        leftButton={<LightButton />}
        rightButton={<RightButton />}
      />
      <ScrollView>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <View style={styles.about_left}>
            <Ionicons
              name={MORE_MENU.About.icon}
              size={40}
              style={{color: colors.primary, marginRight: 10, alignSelf: 'center'}}
            />
            <Text>GitHub Popular</Text>
          </View>
          <Ionicons
            name="arrow-forward"
            size={16}
            style={{color: colors.primary, marginRight: 10, alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <View style={GlobalStyles.line} />
      </ScrollView>
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
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
