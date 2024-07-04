import { checkIfPasswordIsCompromised } from "./security-checks";
import checkerUtils from "./checker-utils";

const checkPasswordIsValid = (password: string): boolean => {
  //   The simple answer...
  //   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_]).{8,}$/;
  //   return regex.test(password);
  if (
    checkerUtils.isGreaterThanEightChars(password) &&
    checkerUtils.hasACapital(password) &&
    checkerUtils.hasALowercase(password) &&
    checkerUtils.hasANumber(password) &&
    checkerUtils.hasAnUnderscore(password)
  ) {
    return true;
  }

  return false;
};

export const checkPasswordEnhanced = async (
  password: string
): Promise<string> => {
  if (!checkPasswordIsValid(password)) {
    return "Password is invalid";
  }

  if (await checkIfPasswordIsCompromised(password)) {
    return "Password is compromised";
  }

  return "Password is secure";
};
