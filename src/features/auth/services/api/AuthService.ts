import { FirebaseAuthCallReturntype } from "../../utils/types";
export abstract class AuthServiceInstance {
  public authorize(
    email: string,
    password: string
  ): Promise<FirebaseAuthCallReturntype> {
    return new Promise((_, reject) => reject(new Error("Not implemented!")));
  }
}
