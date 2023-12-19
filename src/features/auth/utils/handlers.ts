import { Reducer } from "react";
import { INPUT_VALUES_ENUM } from "./enums";
import { ActionType, InputType } from "./types";
import {
  arePasswordsSame,
  validateEmailPassword,
  validateInputValues,
} from "./validators";

// TODO
export const reducerHandler = (state: InputType, action: ActionType) => {
  const defaultState = { ...state };
  switch (action.type) {
    case INPUT_VALUES_ENUM.EMAIL:
      if (!action.payload) return defaultState;
      return { ...state, email: action.payload };
    case INPUT_VALUES_ENUM.PASSWORD:
      if (!action.payload) return defaultState;
      return { ...state, password: action.payload };
    case INPUT_VALUES_ENUM.REPEAT_PASSWORD:
      if (!action.payload) return defaultState;
      return { ...state, repeatPassword: action.payload };
    case INPUT_VALUES_ENUM.PRIVACY_POLICY:
      return { ...state, privacyPolicy: !state.privacyPolicy };
    default:
      return defaultState;
  }
};

export const registerHandler = (inputValues: InputType) => {
  if (!validateInputValues(inputValues)) return;

  console.log("przeszlo");

  try {
  } catch (error) {}
};
