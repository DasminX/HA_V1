import { create } from "zustand";
import { InputType } from "../utils/types";

type AuthFormCredentialsType = InputType & {
  setEmail: (value: InputType["email"]) => void;
  setPassword: (value: InputType["password"]) => void;
  setRepeatPassword: (value: InputType["repeatPassword"]) => void;
  setPrivacyPolicy: (value: InputType["privacyPolicy"]) => void;
  resetInputValues: () => void;
};

const DEFAULT_AUTH_FORM_FIELDS: InputType = {
  email: "",
  password: "",
  repeatPassword: "",
  privacyPolicy: false,
};

export const useAuthFormStore = create<AuthFormCredentialsType>((set) => ({
  ...DEFAULT_AUTH_FORM_FIELDS,
  setEmail: (value: string) => set((state: InputType) => ({ ...state, email: value })),
  setPassword: (value: string) => set((state: InputType) => ({ ...state, password: value })),
  setRepeatPassword: (value: string) =>
    set((state: InputType) => ({ ...state, repeatPassword: value })),
  setPrivacyPolicy: (value: boolean) =>
    set((state: InputType) => ({ ...state, privacyPolicy: value })),
  resetInputValues: () => set(() => DEFAULT_AUTH_FORM_FIELDS),
}));
