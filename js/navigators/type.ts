import type {StackScreenProps} from '@react-navigation/stack';
import type {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MaterialTopTabBarProps, MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

export type RootStackParamList = {
  Main: {theme: {color: string}} | undefined;
  Init: undefined;
  WelcomePage: undefined;
  HomePage: undefined;
  PopularPage: undefined;
  TrendingPage: undefined;
  FavoritePage: undefined;
  MyPage: undefined;
};

export type DrawerParamList = {
  DrawerPage: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type DScreenProps<T extends keyof DrawerParamList> = DrawerScreenProps<DrawerParamList, T>;
