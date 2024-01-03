import { create } from "zustand";
import { AuthFormCredentialsType, InputType } from "../utils/types";

export const useAuthFormStore = create<AuthFormCredentialsType>((set) => ({
  email: "",
  password: "",
  repeatPassword: "",
  privacyPolicy: false,
  setEmail: (value: string) => set((state: InputType) => ({ ...state, email: value })),
  setPassword: (value: string) => set((state: InputType) => ({ ...state, password: value })),
  setRepeatPassword: (value: string) =>
    set((state: InputType) => ({ ...state, repeatPassword: value })),
  setPrivacyPolicy: (value: boolean) =>
    set((state: InputType) => ({ ...state, privacyPolicy: value })),
  resetInputValues: () =>
    set(() => ({ email: "", password: "", repeatPassword: "", privacyPolicy: false })),
}));
