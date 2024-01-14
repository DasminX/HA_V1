import { AuthForgotPasswordContainer } from "../../src/features/auth/containers/AuthForgotPasswordContainer";
import { AUTH_MODE_ENUM } from "../../src/features/auth/utils/enums";

export default function ForgotPassword() {
  return <AuthForgotPasswordContainer mode={AUTH_MODE_ENUM.FORGOT_PASSWORD} />;
}
