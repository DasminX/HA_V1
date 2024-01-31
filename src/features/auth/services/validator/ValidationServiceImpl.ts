import {
  AuthFieldsValidatedError,
  AuthFieldsValidatedSuccess,
  InputType,
} from "./../../utils/types";
import { AUTH_MODE_ENUM, VALIDATION_STATUS_ENUM } from "../../utils/enums";
import { FormValidator } from "./ValidationService";

export class AuthValidatorFactory {
  public static initialize(mode: keyof typeof AUTH_MODE_ENUM) {
    switch (mode) {
      case AUTH_MODE_ENUM.LOGIN:
        return new FormValidatorLogin();
      case AUTH_MODE_ENUM.REGISTER:
        return new FormValidatorRegister();
      case AUTH_MODE_ENUM.FORGOT_PASSWORD:
        return new FormValidatorForgotPassword();
      case AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD:
        return new FormValidatorChangeForgottenPassword();
    }
  }
}

export class FormValidatorLogin extends FormValidator {
  public validateInputs({
    email,
    password,
  }: {
    email: InputType["email"];
    password: InputType["password"];
  }) {
    try {
      this._validateEmailOrThrow(email);
      this._validatePasswordOrThrow(password);
      return {
        status: VALIDATION_STATUS_ENUM.SUCCESS,
      } as AuthFieldsValidatedSuccess;
    } catch (e) {
      return {
        status: VALIDATION_STATUS_ENUM.ERROR,
        cause: e,
      } as AuthFieldsValidatedError;
    }
  }
}

export class FormValidatorRegister extends FormValidator {
  public validateInputs({
    email,
    password,
    repeatPassword,
    privacyPolicy,
  }: {
    email: InputType["email"];
    password: InputType["password"];
    repeatPassword: InputType["repeatPassword"];
    privacyPolicy: InputType["privacyPolicy"];
  }) {
    try {
      this._validateEmailOrThrow(email);
      this._validatePasswordOrThrow(password);
      this._passwordsAreSameOrThrow(password, repeatPassword);
      this._isPrivacyPolicyOrThrow(privacyPolicy);

      return {
        status: VALIDATION_STATUS_ENUM.SUCCESS,
      } as AuthFieldsValidatedSuccess;
    } catch (e) {
      return {
        status: VALIDATION_STATUS_ENUM.ERROR,
        cause: e,
      } as AuthFieldsValidatedError;
    }
  }
}

export class FormValidatorForgotPassword extends FormValidator {
  public validateInputs({ email }: { email: InputType["email"] }) {
    try {
      this._validateEmailOrThrow(email);

      return {
        status: VALIDATION_STATUS_ENUM.SUCCESS,
      } as AuthFieldsValidatedSuccess;
    } catch (e) {
      return {
        status: VALIDATION_STATUS_ENUM.ERROR,
        cause: e,
      } as AuthFieldsValidatedError;
    }
  }
}

export class FormValidatorChangeForgottenPassword extends FormValidator {
  public validateInputs({
    password,
    repeatPassword,
  }: {
    password: InputType["password"];
    repeatPassword: InputType["repeatPassword"];
  }) {
    try {
      this._validatePasswordOrThrow(password);
      this._passwordsAreSameOrThrow(password, repeatPassword);

      return {
        status: VALIDATION_STATUS_ENUM.SUCCESS,
      } as AuthFieldsValidatedSuccess;
    } catch (e) {
      return {
        status: VALIDATION_STATUS_ENUM.ERROR,
        cause: e,
      } as AuthFieldsValidatedError;
    }
  }
}
