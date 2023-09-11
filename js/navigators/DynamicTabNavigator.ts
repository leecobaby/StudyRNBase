import {MyPage} from '@/pages/Me';
import {PopularPage} from '@/pages/Popular';
import {FavoritePage} from '@/pages/Favorite';
import {TrendingPage} from '@/pages/Trending';

const tabs = [
  {name: 'Popular', component: PopularPage},
  {name: 'Trending', component: TrendingPage},
  {name: 'Favorite', component: FavoritePage},
  {name: 'My', component: MyPage},
];
