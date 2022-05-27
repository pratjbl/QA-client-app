import { createSlice } from "@reduxjs/toolkit";

export const counterSomeThing = createSlice({
  name: "counter",
  initialState: {
    value: {},
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    addNewKeyValuePair: (state, action) => {
      const { key, value } = action.payload;
      state.value = { ...state.value, [key]: value };
    },
  },
});

export const { increment, decrement, incrementByAmount, addNewKeyValuePair } =
  counterSomeThing.actions;

export default counterSomeThing.reducer;
