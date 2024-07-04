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
): Promise<{ status: boolean; message: string }> => {
  if (!checkPasswordIsValid(password)) {
    return { status: true, message: "invalid" };
  }

  if (await checkIfPasswordIsCompromised(password)) {
    return { status: true, message: "compromised" };
  }

  return { status: true, message: "valid & secure" };
};
