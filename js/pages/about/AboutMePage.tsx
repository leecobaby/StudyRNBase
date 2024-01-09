import React from 'react';
import {Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {ScreenProps} from '@/navigators/type';
import {MORE_MENU, MenuValue} from '@/dao/MenuConst';
import {AboutBase, FLAG_ABOUT} from './AboutBase';
import data from '@/assets/about.json';
import {SettingItem} from '@/components/SettingItem';
import {DropDownMenu} from '@/components/DropDownMenu';

type Props = ScreenProps<'AboutMePage'>;
export function AboutMePage({navigation, route}: Props) {
  const params = data.author;
  const flagAbout = FLAG_ABOUT.flag_about_me;

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

  function Item({menu}: {menu: any}) {
    let name = menu.name || menu.title;
    if (menu.account) {
      name += `:${menu.account}`;
    }
    return <SettingItem {...menu} name={name} onPress={() => onPress(menu)} />;
  }

  return (
    <AboutBase params={params} flagAbout={flagAbout}>
      <DropDownMenu {...MORE_MENU.Tutorial}>
        {data.aboutMe.Tutorial.items.map((item, index) => (
          <Item key={index} menu={item} />
        ))}
      </DropDownMenu>
      <DropDownMenu name={data.aboutMe.Blog.name} Icons={Ionicons} icon={data.aboutMe.Blog.icon}>
        {data.aboutMe.Blog.items.map((item, index) => (
          <Item key={index} menu={item} />
        ))}
      </DropDownMenu>
      <DropDownMenu name={data.aboutMe.QQ.name} Icons={Ionicons} icon={data.aboutMe.QQ.icon}>
        {data.aboutMe.QQ.items.map((item, index) => (
          <Item key={index} menu={item} />
        ))}
      </DropDownMenu>
      <DropDownMenu name={data.aboutMe.Contact.name} Icons={FontAwesome6} icon={data.aboutMe.Contact.icon}>
        {Object.keys(data.aboutMe.Contact.items).map((key, index) => (
          // @ts-ignore
          <Item key={index} menu={data.aboutMe.Contact.items[key]} />
        ))}
      </DropDownMenu>
    </AboutBase>
  );
}
