export const isGreaterThanEightChars = (password: string): boolean => {
  return password.length > 8;
};

export const hasACapital = (password: string): boolean => {
  return /[A-Z]/.test(password);
};

export const hasALowercase = (password: string): boolean => {
  return /[a-z]/.test(password);
};

export const hasANumber = (password: string): boolean => {
  return /[0-9]/.test(password);
};

export const hasAnUnderscore = (password: string): boolean => {
  return /[_]/.test(password);
};

export default {
  isGreaterThanEightChars,
  hasACapital,
  hasALowercase,
  hasANumber,
  hasAnUnderscore,
};
