import { create } from "zustand";

type AuthCredentialsType = {
  token: string;
  expiresIn: number;
  setTokenCredentials: (payload: { token: string; expiresIn: number }) => void;
  resetTokenCredentials: () => void;
};

export const useAuthStore = create<AuthCredentialsType>((set) => ({
  token: "",
  expiresIn: -1,
  setTokenCredentials: ({ token, expiresIn }) => set(() => ({ token, expiresIn })),
  resetTokenCredentials: () => set(() => ({ token: "", expiresIn: -1 })),
}));
