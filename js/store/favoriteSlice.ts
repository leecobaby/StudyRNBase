import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from './index';
import {Flag} from '@/types/enum';
import {getFavoriteItems, wrapFavorite} from '@/dao/FavoriteDao';

export type FavoriteItemType = GitHubItem & {
  isFavorite: boolean;
};

type Items = FavoriteItemType[] | null;

interface State {
  [key: string]: {
    loading: boolean;
    items: Items;
    error?: string;
  };
}

const initialState: State = {
  popular: {
    loading: false,
    items: null,
  },
  trending: {
    loading: false,
    items: null,
  },
};

type ToggleFavoriteAction = {
  payload: {
    index: number;
    key: string;
    item: FavoriteItemType;
  };
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite(state, action: ToggleFavoriteAction) {
      const {index, item, key} = action.payload;
      const isFavorite = !item.isFavorite;
      state[key].items![index] = {
        ...item,
        isFavorite,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavoriteData.pending, (state, action) => {
        const key = action.meta.arg.flag;
        state[key] = state[key] || {};
        state[key].loading = true;
      })
      .addCase(fetchFavoriteData.fulfilled, (state, action) => {
        const key = action.meta.arg.flag;
        state[key] = state[key] || {};
        state[key].loading = false;
        state[key].items = action.payload;
      })
      .addCase(fetchFavoriteData.rejected, (state, action) => {
        const key = action.meta.arg.flag;
        state[key] = state[key] || {};
        state[key].loading = false;
        state[key].error = action.error.message;
      });
  },
});

export const fetchFavoriteData = createAsyncThunk<Items, {flag: Flag}>('favorite/fetchFavoriteData', arg => {
  const {flag} = arg;
  return getFavoriteItems(flag)
    .then(favoriteItems => {
      const items = Object.keys(favoriteItems).map(key => JSON.parse(favoriteItems[key]));
      return wrapFavorite(items, flag);
    })
    .catch(error => {
      console.error('Failed to get favorite items', error);
      return [];
    });
});

export const favoriteReducer = favoriteSlice.reducer;
export const selectFavorite = (state: RootState) => state.favorite;
export const {toggleFavorite} = favoriteSlice.actions;
