import { createSlice } from '@reduxjs/toolkit';

type ICounterState = {
  counter: number;
};

const initialState: ICounterState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented: (state: ICounterState) => {
      state.counter += 1;
    },

    decremented: (state: ICounterState) => {
      state.counter -= 1;
    },
  },
});

export const { incremented, decremented } = counterSlice.actions;
export default counterSlice;
