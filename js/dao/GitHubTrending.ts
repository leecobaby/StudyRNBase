const FILTER_URLS = [
  {
    from: 'https://github.com/trending/All Language?',
    to: 'https://github.com/trending?',
  },
];
const URL = 'https://api.devio.org/as/trending?sourceUrl=';

export class GitHubTrending {
  private authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  fetchTrending<T>(url: string): Promise<T> {
    url = this.filterUrl(url);
    url = `${URL}${url}`;
    return new Promise((resolve, reject) => {
      fetch(url, {headers: {'auth-token': this.authToken}})
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData['code'] === 0) {
            resolve(responseData['data']['list']);
          } else {
            throw new Error(JSON.stringify(responseData));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  filterUrl(url: string) {
    for (let i = 0; i < FILTER_URLS.length; i++) {
      let val = FILTER_URLS[i];
      if (url.startsWith(val.from)) {
        return url.replace(val.from, val.to);
      }
    }
    return url;
  }
}
