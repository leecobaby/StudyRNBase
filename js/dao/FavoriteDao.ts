import AsyncStorage from '@react-native-async-storage/async-storage';

import {isGitHubRepo, isGitHubTrendingRepo} from '@/utils';
import {Flag} from '@/types/enum';

const FAVORITE_KEY_PREFIX = 'favorite_';

export function getFavoriteKey(flag: string) {
  return FAVORITE_KEY_PREFIX + flag;
}

export async function saveFavoriteItem(flag: string, key: string, value: string, isAdd: boolean) {
  const favoriteKey = getFavoriteKey(flag);
  let favoriteItems: {[key: string]: string} = {};
  try {
    const result = await AsyncStorage.getItem(favoriteKey);
    favoriteItems = result ? JSON.parse(result) : {};
    if (isAdd) {
      favoriteItems[key] = value;
    } else {
      delete favoriteItems[key];
    }
    await AsyncStorage.setItem(favoriteKey, JSON.stringify(favoriteItems));
  } catch (error) {
    console.error('Failed to save favorite item', error);
  }
}

export async function getFavoriteItems(flag: string): Promise<{[key: string]: string}> {
  const favoriteKey = getFavoriteKey(flag);
  try {
    const result = await AsyncStorage.getItem(favoriteKey);
    return result ? JSON.parse(result) : {};
  } catch (error) {
    console.error('Failed to get favorite items', error);
    return {};
  }
}

// 包装 item 和 isFavorite
export function wrapFavorite<T extends GitHubItem>(items: T[], flag: Flag): Promise<any> {
  return getFavoriteItems(flag).then(favoriteItems => {
    const newItems = [];
    for (const item of items) {
      let isFavorite = false;
      if (isGitHubRepo(item)) {
        isFavorite = favoriteItems[item.full_name] !== undefined;
      } else if (isGitHubTrendingRepo(item)) {
        isFavorite = favoriteItems[item.fullName] !== undefined;
      }
      newItems.push({
        ...item,
        isFavorite,
      });
    }
    return newItems;
  });
}

export function onFavorite<T extends GitHubItem>(flag: Flag, item: T, isAdd: boolean): Promise<any> {
  const key = isGitHubRepo(item) ? item.full_name : item.fullName;
  const value = JSON.stringify(item);
  return saveFavoriteItem(flag, key, value, isAdd);
}
