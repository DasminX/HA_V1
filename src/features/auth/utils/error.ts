import { INPUT_VALUES_ENUM } from "./enums";
import { ErrorRegisterHandlerResponse } from "./types";

export const generateInputValuesError = (
  entry: keyof typeof INPUT_VALUES_ENUM
): ErrorRegisterHandlerResponse => ({
  status: "error",
  cause: INPUT_VALUES_ENUM[entry],
});
