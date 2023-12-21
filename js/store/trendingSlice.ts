import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from './index';
import {GitHubTrending} from '@/dao/GitHubTrending';

type Items = GitHubTrendingRepo[] | null;

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

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
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

export const fetchTrendingData = createAsyncThunk<GitHubTrendingResult, {url: string; key: string}>(
  'trending/fetchTrendingData',
  arg => {
    return new GitHubTrending('fd82d1e882462e23b8e88aa82198f166')
      .fetchTrending<GitHubTrendingResult>(arg.url)
      .then(res => {
        if (!res) throw new Error('responseData is null');
        return res;
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  },
);

export const trendingReducer = trendingSlice.reducer;
export const selectTrending = (state: RootState) => state.trending;
