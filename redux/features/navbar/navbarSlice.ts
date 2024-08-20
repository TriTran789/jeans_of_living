import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    clickNavbar: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { clickNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
