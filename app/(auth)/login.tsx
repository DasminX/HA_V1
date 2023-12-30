import { AuthContainer } from "../../src/features/auth/containers/AuthContainer";
import { AUTH_MODE_ENUM } from "../../src/features/auth/utils/enums";

export default function Login() {
  console.log("AUTH LOGIN");

  return <AuthContainer mode={AUTH_MODE_ENUM.LOGIN} />;
}
