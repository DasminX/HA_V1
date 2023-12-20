import { INPUT_VALUES_ENUM } from "./enums";
import { generateInputValuesError } from "./error";
import { ActionType, InputType, RegisterHandlerType } from "./types";
import {
  arePasswordsSame,
  validateEmail,
  validatePassword,
} from "./validators";

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

export const registerHandler: RegisterHandlerType = (inputValues) => {
  if (!validateEmail(inputValues.email)) {
    return generateInputValuesError("EMAIL");
  }
  if (!validatePassword(inputValues.password)) {
    return generateInputValuesError("PASSWORD");
  }
  if (!arePasswordsSame(inputValues.password, inputValues.repeatPassword)) {
    return generateInputValuesError("REPEAT_PASSWORD");
  }
  if (!inputValues.privacyPolicy) {
    return generateInputValuesError("PRIVACY_POLICY");
  }

  return { status: "validated" };
  try {
  } catch (error) {}
};
