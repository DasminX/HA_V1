import { AUTH_MODE_ENUM } from "../utils/enums";
import { HttpMethod } from "../utils/types";

const API_AUTH_PATH = "http://localhost:3001/api/auth/";

export class API_AUTH {
  private static _instance: API_AUTH;

  private constructor(private _path: keyof typeof AUTH_MODE_ENUM) {}

  public static getInstance(_path: keyof typeof AUTH_MODE_ENUM): API_AUTH {
    if (!API_AUTH._instance?._path) {
      API_AUTH._instance = new API_AUTH(_path);
    }

    return API_AUTH._instance;
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
