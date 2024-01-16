import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ThemeFlags, getThemeFlag} from '@/dao/ThemeDao';

const initialState = {
  theme: ThemeFlags.Default,
  onShowCustomThemeView: false,
};

type toggleThemeAction = {
  payload: ThemeFlags;
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state, action: toggleThemeAction) {
      state.theme = action.payload;
      state.onShowCustomThemeView = !state.onShowCustomThemeView;
    },
    toggleCustomThemeView(state) {
      state.onShowCustomThemeView = !state.onShowCustomThemeView;
    },
    onThemeChange(state, action: toggleThemeAction) {
      state.theme = action.payload;
    },
  },
});

export const fetchTheme = createAsyncThunk('theme/fetchTheme', (_, {dispatch}) => {
  return getThemeFlag().then(res => {
    dispatch(onThemeChange(res));
  });
});

export const themeReducer = themeSlice.reducer;
export const {toggleTheme, toggleCustomThemeView, onThemeChange} = themeSlice.actions;
