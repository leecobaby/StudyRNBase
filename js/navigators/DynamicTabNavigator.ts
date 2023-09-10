import {FavoritePage} from '../pages/Favorite';
import {MyPage} from '../pages/Me';
import {PopularPage} from '../pages/Popular';
import {TrendingPage} from '../pages/Trending';

const tabs = [
  {name: 'Popular', component: PopularPage},
  {name: 'Trending', component: TrendingPage},
  {name: 'Favorite', component: FavoritePage},
  {name: 'My', component: MyPage},
];
