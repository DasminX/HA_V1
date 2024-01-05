import {
  type AuthFieldsValidatedSuccess,
  type InputType,
  type AuthFieldsValidatedError,
} from "../../utils/types";

export interface AuthValidator {
  validateInputs(inputValues: InputType): AuthFieldsValidatedError | AuthFieldsValidatedSuccess;
}
