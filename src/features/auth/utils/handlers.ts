import { ApiAuth } from "../services/api";
import { INPUT_VALUES_ENUM } from "./enums";
import { ActionType, InputType, RegisterHandlerType } from "./types";

export const reducerHandler = (state: InputType, action: ActionType) => {
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

export const authorize: RegisterHandlerType = async (mode, inputValues) => {
  const api = ApiAuth.getInstance(mode);
  const response = await api.call(mode, { method: "POST", data: inputValues });
  return response;
};
