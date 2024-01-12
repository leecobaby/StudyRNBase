import type {StackScreenProps} from '@react-navigation/stack';
import {DrawerScreenProps} from '@react-navigation/drawer';

import {Flag} from '@/types/enum';
import {PopularItemType} from '@/store/popularSlice';
import {TrendingItemType} from '@/store/trendingSlice';
import {FavoriteItemType} from '@/store/favoriteSlice';
import {FlagLang} from '@/dao/LanguageDao';

type DetailPageParams = {
  item: PopularItemType | TrendingItemType | FavoriteItemType;
  itemKey: string;
  index: number;
  flag: Flag;
};

export type RootStackParamList = {
  Init: undefined;
  Main: {theme: {color: string}} | undefined;
  WelcomePage: undefined;
  Home: undefined;
  PopularPage: undefined;
  TrendingPage: undefined;
  FavoritePage: undefined;
  MyPage: undefined;
  Detail: DetailPageParams;
  WebViewPage: {url: string; title: string; canGoBack: boolean};
  AboutPage: undefined;
  AboutMePage: undefined;
  CustomKeyPage: {flagLang: FlagLang; isRemoveKey: boolean};
};

export type RootStackKey = keyof RootStackParamList;

export type DrawerParamList = {
  DrawerPage: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type DScreenProps<T extends keyof DrawerParamList> = DrawerScreenProps<DrawerParamList, T>;
