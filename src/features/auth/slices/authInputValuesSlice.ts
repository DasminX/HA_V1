import { createSlice } from "@reduxjs/toolkit";
import { type InputType } from "../utils/types";
import { INPUT_VALUES_ENUM } from "../utils/enums";

const DEFAULT_INPUTS_VALUES: InputType = Object.freeze({
  email: "",
  password: "",
  repeatPassword: "",
  privacyPolicy: false,
});

// TODO OTYPOWAĆ
export const authInputValuesSlice = createSlice({
  name: "authInputValues",
  initialState: DEFAULT_INPUTS_VALUES,
  reducers: {
    setInputValues: (state, action) => {
      switch (action.payload.type) {
        case INPUT_VALUES_ENUM.EMAIL:
          state.email = action.payload;
          break;
        case INPUT_VALUES_ENUM.PASSWORD:
          state.password = action.payload;
          break;
        case INPUT_VALUES_ENUM.REPEAT_PASSWORD:
          state.repeatPassword = action.payload;
          break;
        case INPUT_VALUES_ENUM.PRIVACY_POLICY:
          state.privacyPolicy = action.payload;
          break;
      }
    },
    resetInputValues: (state) => {
      state = DEFAULT_INPUTS_VALUES;
    },
  },
});

export const { setInputValues, resetInputValues } = authInputValuesSlice.actions;

export default authInputValuesSlice.reducer;
