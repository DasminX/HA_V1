import { type InputType } from "./../utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_INPUTS_VALUES: InputType = Object.freeze({
  email: "",
  password: "",
  repeatPassword: "",
  privacyPolicy: false,
});

export const authInputValuesSlice = createSlice({
  name: "authInputValues",
  initialState: DEFAULT_INPUTS_VALUES,
  reducers: {
    setEmail: (state, action: PayloadAction<InputType["email"]>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<InputType["password"]>) => {
      state.password = action.payload;
    },
    setRepeatPassword: (state, action: PayloadAction<InputType["repeatPassword"]>) => {
      state.repeatPassword = action.payload;
    },
    setPrivacyPolicy: (state, action: PayloadAction<InputType["privacyPolicy"]>) => {
      state.privacyPolicy = action.payload;
    },
    resetInputs: (state) => {
      state.email = DEFAULT_INPUTS_VALUES.email;
      state.password = DEFAULT_INPUTS_VALUES.password;
      state.repeatPassword = DEFAULT_INPUTS_VALUES.repeatPassword;
      state.privacyPolicy = DEFAULT_INPUTS_VALUES.privacyPolicy;
    },
  },
});

export const { setEmail, setPassword, setRepeatPassword, setPrivacyPolicy, resetInputs } =
  authInputValuesSlice.actions;

export default authInputValuesSlice.reducer;
