import {
  type ErrorRegisterHandlerResponse,
  type InputType,
  type SuccessRegisterHandlerResponse,
} from "../../utils/types";

export interface Validator {
  validateInputs(
    inputValues: InputType,
  ): SuccessRegisterHandlerResponse | ErrorRegisterHandlerResponse;
}

export abstract class BaseAuthValidator implements Validator {
  protected abstract _validateEmail(email: string): boolean;
  protected abstract _validatePassword(password: string): boolean;

  public abstract validateInputs(
    inputValues: InputType,
  ): SuccessRegisterHandlerResponse | ErrorRegisterHandlerResponse;
}
