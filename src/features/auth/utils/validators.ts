import { AUTH_MODE_ENUM, INPUT_VALUES_ENUM } from "./enums";
import {
  ErrorRegisterHandlerResponse,
  InputType,
  SuccessRegisterHandlerResponse,
} from "./types";

class ValidationErrorGenerator {
  public static generate(
    entry: keyof typeof INPUT_VALUES_ENUM
  ): ErrorRegisterHandlerResponse {
    return {
      status: "error",
      cause: INPUT_VALUES_ENUM[entry],
    };
  }
}

interface Validator {
  validateInputs(
    inputValues: InputType
  ): SuccessRegisterHandlerResponse | ErrorRegisterHandlerResponse;
}

abstract class BaseAuthValidator implements Validator {
  protected abstract _validateEmail(email: string): boolean;
  protected abstract _validatePassword(password: string): boolean;

  public abstract validateInputs(
    inputValues: InputType
  ): SuccessRegisterHandlerResponse | ErrorRegisterHandlerResponse;
}

export class AuthValidatorFactory {
  static initialize(_mode: AUTH_MODE_ENUM): Validator {
    switch (_mode) {
      case "LOGIN":
        return new AuthValidatorLogin();
      case "REGISTER":
        return new AuthValidatorRegister();
      default:
        throw new Error("Invalid authentication mode");
    }
  }
}

class AuthValidatorLogin extends BaseAuthValidator {
  protected _validateEmail(email: string) {
    return new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "gi").test(email);
  }

  protected _validatePassword(password: string) {
    return new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "gi"
    ).test(password);
  }

  public validateInputs(
    inputValues: InputType
  ): SuccessRegisterHandlerResponse | ErrorRegisterHandlerResponse {
    if (!this._validateEmail(inputValues.email))
      return ValidationErrorGenerator.generate("EMAIL");
    if (!this._validatePassword(inputValues.password))
      return ValidationErrorGenerator.generate("PASSWORD");

    return { status: "validated" } as SuccessRegisterHandlerResponse;
  }
}

class AuthValidatorRegister extends AuthValidatorLogin {
  protected _arePasswordsSame(password: string, repeatPassword: string) {
    return password === repeatPassword;
  }

  protected _isPrivacyPolicy(privacyPolicy: boolean) {
    return !!privacyPolicy;
  }

  public validateInputs(inputValues: InputType) {
    const baseValidationResult = super.validateInputs(inputValues);
    if (baseValidationResult.status === "error") return baseValidationResult;

    if (
      !this._arePasswordsSame(inputValues.password, inputValues.repeatPassword)
    )
      return ValidationErrorGenerator.generate("REPEAT_PASSWORD");
    if (!this._isPrivacyPolicy(inputValues.privacyPolicy))
      return ValidationErrorGenerator.generate("PRIVACY_POLICY");

    return baseValidationResult;
  }
}
