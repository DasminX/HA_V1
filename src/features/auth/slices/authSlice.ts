import { createSlice } from "@reduxjs/toolkit";

export const AUTH_INITIAL_STATE = {
  token: "",
  expiresIn: -1,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.expiresIn = action.payload.expiresIn;
    },
    resetToken: (state) => {
      state = AUTH_INITIAL_STATE;
    },
  },
});

export const { setToken, resetToken } = authSlice.actions;

export default authSlice.reducer;
