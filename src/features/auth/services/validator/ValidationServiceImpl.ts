import { INPUT_VALUES_ENUM, AUTH_MODE_ENUM, VALIDATION_STATUS_ENUM } from "../../utils/enums";
import {
  type InputType,
  type AuthFieldsValidatedError,
  AuthFieldsValidatedSuccess,
} from "../../utils/types";
import { ValidationErrorGenerator } from "./ValidationErrorGeneratorImpl";
import { AuthValidator } from "./ValidationService";

export class AuthValidatorFactory {
  static initialize(_mode: AUTH_MODE_ENUM): AuthValidator {
    switch (_mode) {
      case AUTH_MODE_ENUM.LOGIN:
        return new AuthValidatorLogin();
      case AUTH_MODE_ENUM.REGISTER:
        return new AuthValidatorRegister();
      // default: // TODO
      //   throw new Error("Invalid authentication mode");
    }
  }
}

class AuthValidatorLogin implements AuthValidator {
  protected _validateEmail(email: InputType["email"]) {
    return new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "gi").test(email);
  }

  protected _validatePassword(password: InputType["password"]) {
    return new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "gi").test(
      password,
    );
  }

  public validateInputs(
    inputValues: InputType,
  ): AuthFieldsValidatedError | AuthFieldsValidatedSuccess {
    if (!this._validateEmail(inputValues.email))
      return ValidationErrorGenerator.generate(INPUT_VALUES_ENUM.EMAIL);
    if (!this._validatePassword(inputValues.password))
      return ValidationErrorGenerator.generate(INPUT_VALUES_ENUM.PASSWORD);

    return { status: VALIDATION_STATUS_ENUM.SUCCESS };
  }
}

class AuthValidatorRegister extends AuthValidatorLogin {
  protected _arePasswordsSame(
    password: InputType["password"],
    repeatPassword: InputType["repeatPassword"],
  ) {
    return password === repeatPassword;
  }

  protected _isPrivacyPolicy(privacyPolicy: InputType["privacyPolicy"]) {
    return !!privacyPolicy;
  }

  public validateInputs(inputValues: InputType) {
    const baseValidationResult = super.validateInputs(inputValues);
    if (baseValidationResult.status === VALIDATION_STATUS_ENUM.ERROR) return baseValidationResult;

    if (!this._arePasswordsSame(inputValues.password, inputValues.repeatPassword))
      return ValidationErrorGenerator.generate(INPUT_VALUES_ENUM.REPEAT_PASSWORD);
    if (!this._isPrivacyPolicy(inputValues.privacyPolicy))
      return ValidationErrorGenerator.generate(INPUT_VALUES_ENUM.PRIVACY_POLICY);

    return baseValidationResult;
  }
}
