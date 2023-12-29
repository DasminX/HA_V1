import { INPUT_VALUES_ENUM } from "../../utils/enums";
import { type ErrorRegisterHandlerResponse } from "../../utils/types";

export class ValidationErrorGenerator {
  public static generate(entry: keyof typeof INPUT_VALUES_ENUM): ErrorRegisterHandlerResponse {
    return {
      status: "error",
      cause: INPUT_VALUES_ENUM[entry],
    };
  }
}
