export const validateAuth = ({
  token,
  expiresIn,
}: {
  token: string;
  expiresIn: number;
}) => token.trim() !== "" && expiresIn > Date.now();
