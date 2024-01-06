import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

export const MORE_MENU = {
  Custom_Language: {name: '自定义语言', Icons: Ionicons, icon: 'md-checkbox-outline'},
  Sort_Language: {name: '语言排序', Icons: MaterialCommunityIcons, icon: 'sort'},
  Custom_Theme: {name: '自定义主题', Icons: Ionicons, icon: 'color-palette'},
  Custom_Key: {name: '自定义标签', Icons: MaterialCommunityIcons, icon: 'checkbox-marked-outline'},
  Sort_Key: {name: '标签排序', Icons: MaterialCommunityIcons, icon: 'sort'},
  Remove_Key: {name: '标签移除', Icons: MaterialCommunityIcons, icon: 'checkbox-blank-outline'},
  About_Author: {name: '关于作者', Icons: Octicons, icon: 'smiley'},
  About: {name: '关于', Icons: Ionicons, icon: 'logo-github'},
  Tutorial: {name: '教程', Icons: Ionicons, icon: 'book'},
  Feedback: {name: '反馈', Icons: MaterialIcons, icon: 'feedback'},
  Share: {name: '分享', Icons: Ionicons, icon: 'md-share'},
  CodePush: {name: 'CodePush', Icons: Ionicons, icon: 'ios-planet'},
};

export type MenuKey = keyof typeof MORE_MENU;
export type MenuValue = (typeof MORE_MENU)[MenuKey];
