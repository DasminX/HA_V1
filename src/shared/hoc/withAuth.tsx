import { type ElementType } from "react";
import { Redirect } from "expo-router";
import { validateAuth } from "../utils/validate-auth";
import { useAuthStore } from "../slices/authStore";

export const withAuth = (BaseComponent: ElementType) => {
  return function authenticateHOC() {
    const authStore = useAuthStore((state) => ({
      token: state.token,
      expiresIn: state.expiresIn,
      resetTokenCredentials: state.resetTokenCredentials,
    }));

    if (!validateAuth({ token: authStore.token, expiresIn: authStore.expiresIn })) {
      authStore.resetTokenCredentials();
      return <Redirect href={"/auth/login"} />;
    }

    return <BaseComponent />;
  };
};
