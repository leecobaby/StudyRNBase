import {Flag} from '@/types/enum';
import {fetchData} from './DataStore';
import {wrapFavorite} from './FavoriteDao';

export function searchPopularData(url: string) {
  return fetchData<GitHubSearchResult>(url)
    .then(res => {
      if (!res) throw new Error('responseData is null');
      if (!res.data.items) return null;
      return wrapFavorite(res.data.items, Flag.popular);
    })
    .catch((error: any) => {
      throw new Error(error);
    });
}
