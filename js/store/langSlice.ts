import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from './index';
import {CachedData, fetchData} from '@/dao/DataStore';
import {Flag} from '@/types/enum';
import {wrapFavorite} from '@/dao/FavoriteDao';
import {FlagLang, LanguageDao} from '@/dao/LanguageDao';

interface State {
  popular: Lang[];
  trending: Lang[];
}

const initialState: State = {
  popular: [],
  trending: [],
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLangData.fulfilled, (state, action) => {
      const {flagLang} = action.meta.arg;
      const data = action.payload;
      if (flagLang === FlagLang.Popular) {
        state.popular = data;
      } else {
        state.trending = data;
      }
    });
  },
});

export const fetchLangData = createAsyncThunk<Lang[], {flagLang: FlagLang}>('lang/fetchLangData', arg => {
  return LanguageDao.fetch(arg.flagLang)
    .then(res => {
      if (!res) throw new Error('responseData is null');
      return res;
    })
    .catch((error: any) => {
      throw new Error(error);
    });
});

export const langReducer = langSlice.reducer;
export const selectLang = (state: RootState) => state.lang;
