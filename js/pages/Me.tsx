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
      <NavigationBar
        title="我的"
        statusBar={navBarColorStyle}
        style={navBarColorStyle}
        leftButton={<LightButton />}
        rightButton={<RightButton />}
      />
      <ScrollView>
        <TouchableOpacity style={styles.item} onPress={() => onPress(MORE_MENU.About)}>
          <View style={styles.about_left}>
            <Ionicons
              name={MORE_MENU.About.icon}
              size={40}
              style={{color: colors.primary, marginRight: 10, alignSelf: 'center'}}
            />
            <Text>GitHub Popular</Text>
          </View>
          <AntDesign name="right" size={16} style={{color: colors.primary, marginRight: 10, alignSelf: 'center'}} />
        </TouchableOpacity>
        <View style={GlobalStyles.line} />
        <SettingItem {...MORE_MENU.Tutorial} onPress={() => onPress(MORE_MENU.Tutorial)} />
        {/* 趋势管理 */}
        <Text style={styles.groupTitle}>趋势管理</Text>
        {/* 自定义语言 */}
        <SettingItem {...MORE_MENU.Custom_Language} onPress={() => {}} />
        {/* 语言排序 */}
        <SettingItem {...MORE_MENU.Sort_Language} onPress={() => {}} />
        {/* 最热管理 */}
        <Text style={styles.groupTitle}>最热管理</Text>
        {/* 自定义标签 */}
        <SettingItem {...MORE_MENU.Custom_Key} onPress={() => {}} />
        {/* 标签排序 */}
        <SettingItem {...MORE_MENU.Sort_Key} onPress={() => {}} />
        {/* 标签移除 */}
        <SettingItem {...MORE_MENU.Remove_Key} onPress={() => {}} />

        {/* 设置 */}
        <Text style={styles.groupTitle}>设置</Text>
        {/* 自定义主题 */}
        <SettingItem {...MORE_MENU.Custom_Theme} onPress={() => {}} />
        {/* 关于作者 */}
        <SettingItem {...MORE_MENU.About_Author} onPress={() => {}} />
        {/* 反馈 */}
        <SettingItem {...MORE_MENU.Feedback} onPress={() => {}} />
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
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
  },
});
