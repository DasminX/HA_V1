import {
  type AuthFieldsValidatedSuccess,
  type InputType,
  type AuthFieldsValidatedError,
} from "../../utils/types";

export interface Validator {
  validateInputs(inputValues: InputType): AuthFieldsValidatedError | AuthFieldsValidatedSuccess;
}

export abstract class BaseAuthValidator implements Validator {
  protected abstract _validateEmail(email: string): boolean;
  protected abstract _validatePassword(password: string): boolean;

  public abstract validateInputs(
    inputValues: InputType,
  ): AuthFieldsValidatedError | AuthFieldsValidatedSuccess;
}
