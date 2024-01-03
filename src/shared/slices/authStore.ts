import { create } from "zustand";
import { AuthCredentialsType } from "../utils/types";

export const useAuthStore = create<AuthCredentialsType>((set) => ({
  token: "",
  expiresIn: -1,
  setTokenCredentials: ({ token, expiresIn }) => set(() => ({ token, expiresIn })),
  resetTokenCredentials: () => set(() => ({ token: "", expiresIn: -1 })),
}));
