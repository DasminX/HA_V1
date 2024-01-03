import { type CamelCase } from "../../../shared/utils/types";
import {
  VALIDATION_STATUS_ENUM,
  type AUTH_MODE_ENUM,
  type INPUT_VALUES_ENUM,
  AUTH_RESPONSE_ENUM,
} from "./enums";

export type ActionType = Readonly<{
  type: INPUT_VALUES_ENUM;
  payload?: string;
}>;

export type InputType = Readonly<{
  [K in CamelCase<Lowercase<keyof typeof INPUT_VALUES_ENUM>>]: K extends "privacyPolicy"
    ? boolean
    : string;
}>;

export type AuthPathType = Readonly<Lowercase<keyof typeof AUTH_MODE_ENUM>>;

export type AuthFieldsValidatedError = Readonly<{
  readonly status: VALIDATION_STATUS_ENUM.ERROR;
  readonly cause: keyof typeof INPUT_VALUES_ENUM;
}>;

export type AuthFieldsValidatedSuccess = {
  readonly status: VALIDATION_STATUS_ENUM.SUCCESS;
};

export type RegisterHandlerType = (
  mode: keyof typeof AUTH_MODE_ENUM,
  inputValues: InputType,
) => Promise<unknown>;

export type FormValidityType = Readonly<{
  bool: boolean;
  cause: string;
}>;

export type FirebaseLoginSuccess = Readonly<{
  mode: (typeof AUTH_MODE_ENUM)["LOGIN"];
  status: AUTH_RESPONSE_ENUM.SUCCESS;
  message: `auth.successfulSignin`;
  token: string;
  expiresIn: number;
}>;

export type FirebaseRegisterSuccess = Readonly<{
  mode: (typeof AUTH_MODE_ENUM)["REGISTER"];
  status: AUTH_RESPONSE_ENUM.SUCCESS;
  message: `auth.successfulSignup`;
}>;

export type FirebaseAuthError = Readonly<{
  status: AUTH_RESPONSE_ENUM.ERROR;
  cause: string;
}>;
