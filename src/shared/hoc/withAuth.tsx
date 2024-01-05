import { type ElementType } from "react";
import { Redirect } from "expo-router";
import { validateAuth } from "../utils/validate-auth";
import { useAuthStore } from "../slices/authStore";

export const withAuth = (BaseComponent: ElementType) => {
  return function authenticateHOC() {
    const token = useAuthStore((state) => state.token);
    const expiresIn = useAuthStore((state) => state.expiresIn);
    const resetTokenCredentials = useAuthStore((state) => state.resetTokenCredentials);

    if (!validateAuth(token, expiresIn)) {
      resetTokenCredentials();
      return <Redirect href={"/auth/login"} />;
    }

    return <BaseComponent />;
  };
};
