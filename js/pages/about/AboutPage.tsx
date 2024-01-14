import React from 'react';
import {Linking} from 'react-native';
import {useTheme} from '@react-navigation/native';

import data from '@/assets/about.json';
import {ScreenProps} from '@/navigators/type';
import {AboutBase, FLAG_ABOUT} from './AboutBase';
import {MORE_MENU, MenuValue} from '@/dao/MenuConst';
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
      case MORE_MENU.Feedback:
        const url = 'mailto:leeco1917@gmail.com';
        Linking.canOpenURL(url)
          .then(support => {
            if (!support) {
              console.log("Can't handle url: " + url);
            } else {
              Linking.openURL(url);
            }
          })
          .catch(e => console.error('An error occurred', e));
        break;
      case MORE_MENU.About_Author:
        routeName = 'AboutMePage';
        break;
    }
    if (routeName) {
      navigation.navigate(routeName as any, params);
    }
  }

  function Item({menu}: {menu: MenuValue}) {
    return <SettingItem {...menu} onPress={() => onPress(menu)} />;
  }

  return (
    <AboutBase params={params} flagAbout={flagAbout}>
      {/* 教程 */}
      <Item menu={MORE_MENU.Tutorial} />
      {/* 关于作者 */}
      <Item menu={MORE_MENU.About_Author} />
      {/* 反馈 */}
      <Item menu={MORE_MENU.Feedback} />
    </AboutBase>
  );
}
