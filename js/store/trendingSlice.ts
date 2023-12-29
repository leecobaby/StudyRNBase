import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from './index';
import {GitHubTrending} from '@/dao/GitHubTrending';
import {Flag} from '@/types/enum';
import {wrapFavorite} from './util';

export interface TrendingItemType extends GitHubTrendingRepo {
  isFavorite: boolean;
}

type Items = TrendingItemType[] | null;

interface State {
  [key: string]: {
    loading: boolean;
    items: Items;
    error?: string;
  };
}

const flag = Flag.trending;

const initialState: State = {
  Java: {
    loading: false,
    items: null,
  },
};

type ToggleFavoriteAction = {
  payload: {
    index: number;
    key: string;
    item: TrendingItemType;
  };
};

const trendingSlice = createSlice({
  name: 'trending',
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
      .addCase(fetchTrendingData.pending, (state, action) => {
        const key = action.meta.arg.key;
        state[key] = state[key] || {};
        state[key].loading = true;
      })
      .addCase(fetchTrendingData.fulfilled, (state, action) => {
        const key = action.meta.arg.key;
        state[key] = state[key] || {};
        state[key].loading = false;
        state[key].items = action.payload;
      })
      .addCase(fetchTrendingData.rejected, (state, action) => {
        const key = action.meta.arg.key;
        state[key] = state[key] || {};
        state[key].loading = false;
        state[key].error = action.error.message;
      });
  },
});

export const fetchTrendingData = createAsyncThunk<TrendingItemType[], {url: string; key: string}>(
  'trending/fetchTrendingData',
  arg => {
    return new GitHubTrending('fd82d1e882462e23b8e88aa82198f166')
      .fetchTrending<GitHubTrendingResult>(arg.url)
      .then(res => {
        if (!res) throw new Error('responseData is null');
        return wrapFavorite(res, flag);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  },
);

export const trendingReducer = trendingSlice.reducer;
export const selectTrending = (state: RootState) => state.trending;
export const {toggleFavorite} = trendingSlice.actions;
