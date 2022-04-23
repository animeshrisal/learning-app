import * as bcrypt from "bcryptjs";

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 8);
};

export const checkIfUnencryptedPasswordIsValid = (
  unencryptedPassword: string,
  password: string
): boolean => {
  return bcrypt.compareSync(unencryptedPassword, password);
};

