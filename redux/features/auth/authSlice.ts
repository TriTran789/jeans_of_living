import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: string }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userEdit: (state, action) => {
      state.user = action.payload.user;
    },
    userForgotPassword: (state, action) => {
      state.token = action.payload.confirmedToken;
    },
    userConfirmed: (state, action) => {
      state.user = action.payload.user;
    },
    userResetPassword: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  userEdit,
  userForgotPassword,
  userConfirmed,
  userResetPassword,
} = authSlice.actions;

export default authSlice.reducer;
