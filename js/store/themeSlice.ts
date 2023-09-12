import {createSlice} from '@reduxjs/toolkit';

import {RootState} from './index';

type ThemeState = {
  theme: 'light' | 'dark';
};

const initialState = {
  theme: 'light',
} as ThemeState;

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const {toggleTheme} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const selectTheme = (state: RootState) => state.theme.theme;
