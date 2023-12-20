import { CamelCase } from "../../../shared/utils/types";
import { AUTH_MODE_ENUM, INPUT_VALUES_ENUM } from "./enums";

export type ActionType = {
  readonly type: INPUT_VALUES_ENUM;
  readonly payload?: string;
};

export type InputType = {
  readonly [K in CamelCase<
    Lowercase<keyof typeof INPUT_VALUES_ENUM>
  >]: K extends "privacyPolicy" ? boolean : string;
};

export type AuthPathType = Lowercase<keyof typeof AUTH_MODE_ENUM>;

export type ErrorRegisterHandlerResponse = {
  readonly status: "error";
  readonly cause: keyof typeof INPUT_VALUES_ENUM;
};

export type SuccessRegisterHandlerResponse = {
  readonly status: "validated";
};

export type RegisterHandlerType = (
  inputValues: InputType
) => ErrorRegisterHandlerResponse | SuccessRegisterHandlerResponse;
