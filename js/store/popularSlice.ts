import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from './index';
import {CachedData, fetchData} from '@/dao/DataStore';
import {Flag} from '@/types/enum';
import {wrapFavorite} from '@/dao/FavoriteDao';

export interface PopularItemType extends GitHubRepo {
  isFavorite: boolean;
}

type Items = PopularItemType[] | null;

interface State {
  [key: string]: {
    loading: boolean;
    items: Items;
    error?: string;
  };
}

const initialState: State = {
  Java: {
    loading: false,
    items: null,
  },
};

const flag = Flag.popular;

type ToggleFavoriteAction = {
  payload: {
    index: number;
    key: string;
    item: PopularItemType;
  };
};

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    toggleFavorite(state, action: ToggleFavoriteAction) {
      const {index, item} = action.payload;
      const key = action.payload.key;
      const isFavorite = !item.isFavorite;
      state[key].items![index] = {
        ...item,
        isFavorite,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPopularData.pending, (state, action) => {
        const key = action.meta.arg.key;
        state[key] = state[key] || {};
        state[key].loading = true;
      })
      .addCase(fetchPopularData.fulfilled, (state, action) => {
        const key = action.meta.arg.key;
        state[key] = state[key] || {};
        state[key].loading = false;
        state[key].items = action.payload;
      })
      .addCase(fetchPopularData.rejected, (state, action) => {
        const key = action.meta.arg.key;
        state[key] = state[key] || {};
        state[key].loading = false;
        state[key].error = action.error.message;
      });
  },
});

export const fetchPopularData = createAsyncThunk<PopularItemType[], {url: string; key: string}>(
  'popular/fetchPopularData',
  arg => {
    return fetchData<GitHubSearchResult>(arg.url)
      .then(res => {
        if (!res) throw new Error('responseData is null');
        return wrapFavorite(res.data.items, flag);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  },
);

export const popularReducer = popularSlice.reducer;
export const selectPopular = (state: RootState) => state.popular;
export const {toggleFavorite} = popularSlice.actions;
