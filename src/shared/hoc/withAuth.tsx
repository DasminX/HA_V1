import { type ElementType } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { type RootState } from "../../store/rootStore";
import { validateAuth } from "../utils/validate-auth";
import { resetToken } from "../../features/auth/slices/authSlice";

export const withAuth = (BaseComponent: ElementType) => {
  return function authenticateHOC() {
    const router = useRouter();
    const { token, expiresIn } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    if (!validateAuth({ token: token, expiresIn: expiresIn })) {
      dispatch(resetToken());
      return router.replace("/(auth)/login");
    }

    return <BaseComponent />;
  };
};