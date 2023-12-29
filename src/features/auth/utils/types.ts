import { type CamelCase } from "../../../shared/utils/types";
import { type AUTH_MODE_ENUM, type INPUT_VALUES_ENUM } from "./enums";

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

export type ErrorRegisterHandlerResponse = Readonly<{
  readonly status: "error";
  readonly cause: keyof typeof INPUT_VALUES_ENUM;
}>;

export type SuccessRegisterHandlerResponse = {
  readonly status: "validated";
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
  status: "success";
  message: `auth.successfulSignin`;
  token: string;
  expiresIn: number;
}>;

export type FirebaseRegisterSuccess = Readonly<{
  mode: (typeof AUTH_MODE_ENUM)["REGISTER"];
  status: "success";
  message: `auth.successfulSignup`;
}>;

export type FirebaseAuthError = Readonly<{
  status: "error";
  cause: string;
}>;
