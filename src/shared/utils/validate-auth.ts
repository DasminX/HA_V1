export const validateAuth = ({ token, expiresIn }: { token: string; expiresIn: number }) =>
  token.trim() !== "" && !isNaN(expiresIn) && expiresIn > Date.now();
