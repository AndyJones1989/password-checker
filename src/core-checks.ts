import { checkIfPasswordIsCompromised } from "./security-checks";

const checkPasswordIsValid = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_]).{8,}$/;
  return regex.test(password);
};

export const checkPassword = async (password: string): Promise<string> => {
  if (!checkPasswordIsValid(password)) {
    return "Password is invalid";
  }
  if (await checkIfPasswordIsCompromised(password)) {
    return "Password is compromised";
  }
  return "Password is secure";
};
