import {getFavoriteItems, saveFavoriteItem} from '@/dao/FavoriteDao';
import {isGitHubRepo, isGitHubTrendingRepo} from '@/utils';
import {Flag} from '@/types/enum';

// 包装 item 和 isFavorite
export function wrapFavorite<T extends GitHubItem>(items: T[] | null, flag: Flag): Promise<any> {
  return getFavoriteItems(flag).then(favoriteItems => {
    const newItems: any[] = [];
    if (!items || !items.length) {
      return newItems;
    }
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

export function onFavorite<T extends GitHubItem>(item: T, isFavorite: boolean, flag: Flag): Promise<any> {
  const key = isGitHubRepo(item) ? item.full_name : item.fullName;
  const value = JSON.stringify(item);
  return saveFavoriteItem(flag, key, value, isFavorite);
}
