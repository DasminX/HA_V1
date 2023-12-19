import { InputType } from "./types";

export const validateEmailPassword = (email: string, password: string) => {
  const EMAIL_REGEXP = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "gi");
  const PASSWORD_REGEXP = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "gi"
  );

  return EMAIL_REGEXP.test(email) && PASSWORD_REGEXP.test(password);
};

export const arePasswordsSame = (passw1: string, passw2: string) =>
  passw1 === passw2;

export const validateInputValues = (inputValues: InputType) =>
  !validateEmailPassword(inputValues.email, inputValues.password) ||
  !arePasswordsSame(inputValues.password, inputValues.repeatPassword) ||
  !inputValues.privacyPolicy;
