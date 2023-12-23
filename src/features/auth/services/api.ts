import { AUTH_MODE_ENUM } from "../utils/enums";
import { HttpMethod } from "../utils/types";

const API_AUTH_PATH = "http://localhost:3001/api/auth/";

export class ApiAuth {
  private static _instance: ApiAuth;

  private constructor(private _path: keyof typeof AUTH_MODE_ENUM) {}

  public static getInstance(_path: keyof typeof AUTH_MODE_ENUM): ApiAuth {
    if (!ApiAuth._instance?._path) {
      ApiAuth._instance = new ApiAuth(_path);
    }

    return ApiAuth._instance;
  }

  public async call(
    mode: keyof typeof AUTH_MODE_ENUM,
    opts: { method: HttpMethod; data: unknown }
  ) {
    return await fetch(`${API_AUTH_PATH}${mode}`, {
      method: opts.method,
      body: JSON.stringify(opts.data),
    });
  }
}
