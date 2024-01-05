import { AUTH_MODE_ENUM, AUTH_RESPONSE_ENUM } from "../../utils/enums";
import { FirebaseAuthError } from "../../utils/types";

export abstract class AuthServiceInstance {
  public abstract authorize(_: string, __: string): Promise<unknown>;

  protected _sendError(error: unknown, mode: keyof typeof AUTH_MODE_ENUM): FirebaseAuthError {
    let errorMsg = "auth.unknownError";
    if (typeof error === "string") {
      errorMsg = error;
    }
    return {
      mode: mode,
      status: AUTH_RESPONSE_ENUM.ERROR,
      message: errorMsg,
    };
  }
}
