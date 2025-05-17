import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIsVisible: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  // The reducers are functions that represent the different cases, the different actions that can be dispatched
  reducers: {
    toggleUi(state) {
      // We can write mutating code here, because Redux Toolkit uses Immer under the hood
      // Immer allows us to write code that "mutates" the state, but it actually creates a new state
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      const { title, message, status } = action.payload;
      state.notification = {
        title,
        message,
        status,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
