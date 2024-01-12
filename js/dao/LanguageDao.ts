import AsyncStorage from '@react-native-async-storage/async-storage';

import popular from '@/assets/popular-keys.json';
import trending from '@/assets/trending-keys.json';

export enum FlagLang {
  Popular = 'language_popular',
  Trending = 'language_trending',
}

async function save(flag: FlagLang, data: Lang[]) {
  try {
    await AsyncStorage.setItem(flag, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data store', error);
  }
}

async function fetch(flag: FlagLang): Promise<Lang[] | undefined> {
  try {
    const result = await AsyncStorage.getItem(flag);
    if (result) {
      return JSON.parse(result);
    } else {
      // save
      const data = flag === FlagLang.Popular ? popular : trending;
      save(flag, data);
    }
  } catch (error) {
    console.error('Failed to get data store', error);
  }
}

export const LanguageDao = {
  save,
  fetch,
};
