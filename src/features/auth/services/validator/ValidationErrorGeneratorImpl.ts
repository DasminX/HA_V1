import { INPUT_VALUES_ENUM, VALIDATION_STATUS_ENUM } from "../../utils/enums";
import { AuthFieldsValidatedError } from "../../utils/types";

export class ValidationErrorGenerator {
  public static generate(entry: keyof typeof INPUT_VALUES_ENUM): AuthFieldsValidatedError {
    return {
      status: VALIDATION_STATUS_ENUM.ERROR,
      cause: INPUT_VALUES_ENUM[entry],
    };
  }
}
