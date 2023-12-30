import { type ElementType } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/rootStore";
import { validateAuth } from "../utils/validate-auth";
import { resetToken } from "../../features/auth/slices/authSlice";
import { Redirect } from "expo-router";

export const withAuth = (BaseComponent: ElementType) => {
  return function authenticateHOC() {
    const { token, expiresIn } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    if (!validateAuth({ token: token, expiresIn: expiresIn })) {
      dispatch(resetToken());
      return <Redirect href={"/(auth)/login"} />;
    }

    return <BaseComponent />;
  };
};
