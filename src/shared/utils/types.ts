export type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type AuthCredentialsType = {
  token: string;
  expiresIn: number;
  setTokenCredentials: (payload: { token: string; expiresIn: number }) => void;
  resetTokenCredentials: () => void;
};
