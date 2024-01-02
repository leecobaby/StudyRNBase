import {Flag} from '@/types/enum';
import {toggleFavorite as toggleFavoriteInPopular} from '@/store/popularSlice';
import {toggleFavorite as toggleFavoriteInTrending} from '@/store/trendingSlice';
import {toggleFavorite as toggleFavoriteInFavorite} from '@/store/favoriteSlice';

export function isGitHubRepo(item: GitHubRepo | GitHubTrendingRepo): item is GitHubRepo {
  return (item as GitHubRepo).full_name !== undefined;
}

export function isGitHubTrendingRepo(item: GitHubRepo | GitHubTrendingRepo): item is GitHubTrendingRepo {
  return (item as GitHubTrendingRepo).fullName !== undefined;
}

const actionMap = {
  favorite: toggleFavoriteInFavorite,
  [Flag.popular]: toggleFavoriteInPopular,
  [Flag.trending]: toggleFavoriteInTrending,
};

export function getDispatchAction(flag: Flag, itemKey: string) {
  const isFavorite = itemKey.toLowerCase() === Flag.popular || itemKey.toLowerCase() === Flag.trending;
  const action = isFavorite ? actionMap.favorite : actionMap[flag];
  return action;
}
