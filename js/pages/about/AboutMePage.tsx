import React from 'react';
import {View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ScreenProps} from '@/navigators/type';
import {NavigationBar} from '@/components/NavigationBar';
import {MORE_MENU, MenuValue} from '@/dao/MenuConst';
import {useTheme} from '@react-navigation/native';
import {GlobalStyles} from '@/GlobalStyles';
import {SettingItem} from '@/components/SettingItem';
import {AboutBase, FLAG_ABOUT} from './AboutBase';
import data from '@/assets/about.json';

type Props = ScreenProps<'AboutPage'>;
export function AboutMePage({navigation, route}: Props) {
  const {colors} = useTheme();
  const params = data.app;
  const flagAbout = FLAG_ABOUT.flag_about;

  function onPress(menu: MenuValue) {
    let routeName: string = '';
    let params: {[key: string]: any} = {};
    switch (menu) {
      case MORE_MENU.Tutorial:
        routeName = 'WebViewPage';
        params.title = '教程';
        params.url = 'https://github.com/leecobaby';
        break;
      case MORE_MENU.About:
        routeName = 'AboutPage';
        break;
      case MORE_MENU.Custom_Theme:
        // const {onShowCustomThemeView} = this.props;
        // onShowCustomThemeView(true);
        break;
      case MORE_MENU.CodePush:
        routeName = 'CodePushPage';
        break;
      case MORE_MENU.About_Author:
        routeName = 'AboutMePage';
        break;
      default:
        routeName = 'WebViewPage';
        break;
    }
    navigation.navigate(routeName as any, params);
  }

  return (
    <View style={GlobalStyles.root_container}>
      <AboutBase params={params} flagAbout={flagAbout} />
    </View>
  );
}

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
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
  },
});
