import { INPUT_VALUES_ENUM } from "./enums";
import { type ActionType, type InputType } from "./types";

export const inputValuesReducer = (state: InputType, action: ActionType) => {
  switch (action.type) {
    case INPUT_VALUES_ENUM.EMAIL:
      if (!action.payload) return { ...state };
      return { ...state, email: action.payload };
    case INPUT_VALUES_ENUM.PASSWORD:
      if (!action.payload) return { ...state };
      return { ...state, password: action.payload };
    case INPUT_VALUES_ENUM.REPEAT_PASSWORD:
      if (!action.payload) return { ...state };
      return { ...state, repeatPassword: action.payload };
    case INPUT_VALUES_ENUM.PRIVACY_POLICY:
      return { ...state, privacyPolicy: !state.privacyPolicy };
    default:
      return { ...state };
  }
};
