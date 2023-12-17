import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from './index';
import {CachedData, fetchData} from '@/dao/DataStore';

interface State {
  [key: string]: {
    loading: boolean;
    items: [{id: number}?] | null;
    error?: string;
  };
}

const initialState: State = {
  Java: {
    loading: false,
    items: null,
  },
};

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
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
        state[key].items = action.payload.data.items;
      })
      .addCase(fetchPopularData.rejected, (state, action) => {
        const key = action.meta.arg.key;
        state[key] = state[key] || {};
        state[key].loading = false;
        state[key].error = action.error.message;
      });
  },
});

export const fetchPopularData = createAsyncThunk<CachedData<{items: []}>, {url: string; key: string}>(
  'popular/fetchPopularData',
  arg => {
    return fetchData<{items: []}>(arg.url);
  },
);

export const popularReducer = popularSlice.reducer;
export const selectPopular = (state: RootState) => state.popular;
