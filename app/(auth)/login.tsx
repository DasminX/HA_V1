import { useSelector } from "react-redux";
import { AuthContainer } from "../../src/features/auth/containers/AuthContainer";
import { AUTH_MODE_ENUM } from "../../src/features/auth/utils/enums";

export default function Login() {
  return <AuthContainer mode={AUTH_MODE_ENUM.LOGIN} />;
}
