export abstract class AuthServiceInstance {
  public authorize(_: string, __: string): Promise<unknown> {
    return new Promise((_, reject) => reject(new Error("Not implemented!")));
  }
}
