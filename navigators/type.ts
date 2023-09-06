import type {StackScreenProps} from '@react-navigation/stack';
import type {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MaterialTopTabBarProps, MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

export type RootStackParamList = {
  Home: undefined;
  Page1: {name?: string} | undefined;
  Page2: undefined;
  Page3: {name?: string; mode: string} | undefined;
  Top: undefined;
  Bottom: undefined;
  Login: undefined;
  Drawer: undefined;
};

export type DrawerParamList = {
  DrawerPage: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type DScreenProps<T extends keyof DrawerParamList> = DrawerScreenProps<DrawerParamList, T>;
