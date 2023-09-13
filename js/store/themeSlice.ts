import {createSlice} from '@reduxjs/toolkit';

import {RootState} from './index';

type ThemeState = {
  dark: boolean;
};

const initialState = {
  dark: false,
} as ThemeState;

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.dark = !state.dark;
    },
  },
});

export const {toggleTheme} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const selectDark = (state: RootState) => state.theme.dark;
