export abstract class AuthServiceInstance {
  public authorize(email: string, password: string): Promise<unknown> {
    return new Promise((_, reject) => reject(new Error("Not implemented!")));
  }
}
