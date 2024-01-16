import AsyncStorage from '@react-native-async-storage/async-storage';

export enum ThemeFlags {
  Default = '#2196F3',
  Red = '#F44336',
  Pink = '#E91E63',
  Purple = '#9C27B0',
  DeepPurple = '#673AB7',
  Indigo = '#3F51B5',
  Blue = '#2196F3',
  LightBlue = '#03A9F4',
  Cyan = '#00BCD4',
  Green = '#4CAF50',
  LightGreen = '#8BC34A',
  Lime = '#CDDC39',
  Yellow = '#FFEB3B',
  Amber = '#FFC107',
  Orange = '#FF9800',
  DeepOrange = '#FF5722',
  Brown = '#795548',
  Grey = '#9E9E9E',
  BlueGrey = '#607D8B',
}

export type ThemeFlagsKey = keyof typeof ThemeFlags;

const THEME_KEY = 'theme_key';

export async function getThemeFlag(): Promise<ThemeFlags> {
  try {
    const themeFlag = await AsyncStorage.getItem(THEME_KEY);
    if (themeFlag) {
      return themeFlag as ThemeFlags;
    } else {
      setThemeFlag(ThemeFlags.Default);
      return ThemeFlags.Default;
    }
  } catch (e) {
    console.log(e);
    return ThemeFlags.Default;
  }
}

export function setThemeFlag(themeFlag: ThemeFlags): Promise<void> {
  return AsyncStorage.setItem(THEME_KEY, themeFlag);
}

export const ThemeFlagsKeys = Object.keys(ThemeFlags) as Array<ThemeFlagsKey>;
