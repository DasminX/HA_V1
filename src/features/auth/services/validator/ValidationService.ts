import { INPUT_VALUES_ENUM } from "../../utils/enums";
import { AuthFieldsValidatedError, AuthFieldsValidatedSuccess, InputType } from "../../utils/types";

export abstract class FormValidator {
  protected _validateEmailOrThrow(email: string) {
    const result = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "gi").test(email);
    if (!result) {
      throw INPUT_VALUES_ENUM.EMAIL;
    }
    return true;
  }

  protected _validatePasswordOrThrow(password: InputType["password"]) {
    const result = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "gi",
    ).test(password);
    if (!result) {
      throw INPUT_VALUES_ENUM.PASSWORD;
    }
    return true;
  }

  protected _passwordsAreSameOrThrow(
    password: InputType["password"],
    repeatPassword: InputType["repeatPassword"],
  ) {
    if (password !== repeatPassword) {
      throw INPUT_VALUES_ENUM.REPEAT_PASSWORD;
    }
    return true;
  }

  protected _isPrivacyPolicyOrThrow(privacyPolicy: InputType["privacyPolicy"]) {
    if (!!privacyPolicy === false) {
      throw INPUT_VALUES_ENUM.PRIVACY_POLICY;
    }
    return true;
  }

  public abstract validateInputs(
    inputs: Partial<InputType>,
  ): AuthFieldsValidatedError | AuthFieldsValidatedSuccess;
}
