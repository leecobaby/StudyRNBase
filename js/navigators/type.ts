import type {StackScreenProps} from '@react-navigation/stack';
import {DrawerScreenProps} from '@react-navigation/drawer';

type DetailPageParams = {
  item: GitHubRepo & GitHubTrendingRepo;
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
};

export type DrawerParamList = {
  DrawerPage: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type DScreenProps<T extends keyof DrawerParamList> = DrawerScreenProps<DrawerParamList, T>;
