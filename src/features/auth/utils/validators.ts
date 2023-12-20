export const validateEmail = (email: string) =>
  new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "gi").test(email);

export const validatePassword = (password: string) =>
  new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "gi"
  ).test(password);

export const arePasswordsSame = (passw: string, passw2: string) =>
  passw === passw2;
