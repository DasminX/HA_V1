export const validateAuth = (token: string, expiresIn: number) =>
  token.trim() !== "" && !isNaN(expiresIn) && expiresIn > Date.now();
