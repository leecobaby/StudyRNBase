const POPULAR_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export function genPopularFetchUrl(key: string) {
  return POPULAR_URL + encodeURIComponent(key) + QUERY_STR;
}

const TRENDING_URL = 'https://github.com/trending';

export function genTrendingFetchUrl(key: string, timespan: string) {
  const path = key === 'All' ? '' : '/' + key;
  return TRENDING_URL + path + '?since=' + timespan;
}
