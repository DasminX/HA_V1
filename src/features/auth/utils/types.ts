import { type CamelCase } from "../../../shared/utils/types";
import {
  VALIDATION_STATUS_ENUM,
  INPUT_VALUES_ENUM,
  AUTH_RESPONSE_ENUM,
  AUTH_MODE_ENUM,
} from "./enums";

export type InputType = Readonly<{
  [K in CamelCase<Lowercase<keyof typeof INPUT_VALUES_ENUM>>]: K extends "privacyPolicy"
    ? boolean
    : string;
}>;

export type AuthFieldsValidatedError = Readonly<{
  readonly status: VALIDATION_STATUS_ENUM.ERROR;
  readonly cause: keyof typeof INPUT_VALUES_ENUM;
}>;

export type AuthFieldsValidatedSuccess = {
  readonly status: VALIDATION_STATUS_ENUM.SUCCESS;
};

export type FirebaseAuthError = Readonly<{
  status: AUTH_RESPONSE_ENUM.ERROR;
  mode: keyof typeof AUTH_MODE_ENUM;
  message: string;
}>;
