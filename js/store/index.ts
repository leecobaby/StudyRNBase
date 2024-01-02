import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import {demoReducer} from './demoSlice';
import {themeReducer} from './themeSlice';
import {popularReducer} from './popularSlice';
import {trendingReducer} from './trendingSlice';
import {logger} from './middlewares/logger';
import {favoriteReducer} from './favoriteSlice';

export const store = configureStore({
  reducer: {
    demo: demoReducer,
    theme: themeReducer,
    popular: popularReducer,
    trending: trendingReducer,
    favorite: favoriteReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
