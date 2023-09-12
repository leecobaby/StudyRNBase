import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './index';

interface State {
  value: number;
}

const initialState: State = {
  value: 0,
};

export const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
  },
});

export const {increment} = demoSlice.actions;
export const demoReducer = demoSlice.reducer;
export const selectValue = (state: RootState) => state.demo1.value;
