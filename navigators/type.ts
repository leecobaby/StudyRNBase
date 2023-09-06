import type {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Page1: {name?: string} | undefined;
  Page2: undefined;
  Page3: {name?: string; mode: string} | undefined;
  Top: undefined;
  Bottom: undefined;
  Login: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;
