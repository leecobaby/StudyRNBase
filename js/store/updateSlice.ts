import {createSlice} from '@reduxjs/toolkit';

import {RootState} from './index';

const initialState = {
  popular: 0,
  trending: 0,
  favorite: 0,
};

type StateKey = keyof typeof initialState;
type UpdateAction = {
  payload: StateKey;
};

const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    updateFavoriteCounter(state, action: UpdateAction) {
      state[action.payload] += 1;
    },
  },
});

export const updateReducer = updateSlice.reducer;
export const selectUpdatePopular = (state: RootState) => state.update.popular;
export const selectUpdateTrending = (state: RootState) => state.update.trending;
export const selectUpdateFavorite = (state: RootState) => state.update.favorite;
export const {updateFavoriteCounter} = updateSlice.actions;
