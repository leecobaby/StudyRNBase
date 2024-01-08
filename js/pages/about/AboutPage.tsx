import React from 'react';
import {View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ScreenProps} from '@/navigators/type';
import {MORE_MENU, MenuValue} from '@/dao/MenuConst';
import {GlobalStyles} from '@/GlobalStyles';
import {AboutBase, FLAG_ABOUT} from './AboutBase';
import data from '@/assets/about.json';
import {SettingItem} from '@/components/SettingItem';

type Props = ScreenProps<'AboutPage'>;
export function AboutPage({navigation, route}: Props) {
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
    <AboutBase params={params} flagAbout={flagAbout}>
      {/* 教程 */}
      <SettingItem {...MORE_MENU.Tutorial} onPress={() => {}} />
      {/* 关于作者 */}
      <SettingItem {...MORE_MENU.About_Author} onPress={() => {}} />
      {/* 反馈 */}
      <SettingItem {...MORE_MENU.Feedback} onPress={() => {}} />
    </AboutBase>
  );
}
