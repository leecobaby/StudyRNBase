import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import {demoReducer} from './demoSlice';
import {themeReducer} from './themeSlice';
import {popularReducer} from './popularSlice';
import {trendingReducer} from './trendingSlice';
import {logger} from './middlewares/logger';

export const store = configureStore({
  reducer: {
    demo1: demoReducer,
    theme: themeReducer,
    popular: popularReducer,
    trending: trendingReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
