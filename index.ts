import { createHash } from "crypto";

// > 8 chars
// a capital
// a lowercase
// a number
// an underscore

const checkPasswordIsValid = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_]).{8,}$/;
  return regex.test(password);
};

const getSHA1Prefix = (password: string): string => {
  const sha1Hash = createHash("sha1").update(password).digest("hex");
  return sha1Hash.substring(0, 5);
};

const checkIfPasswordIsCompromised = async (
  password: string
): Promise<boolean> => {
  const fullSHA1Hash = createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase(); // Ensure uppercase to match API response
  const prefix = fullSHA1Hash.substring(0, 5);
  const suffix = fullSHA1Hash.substring(5);
  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`
  );
  if (response.ok) {
    const data = await response.text();
    const hashes = data.split("\n").map((line) => line.split(":")[0]);
    return compareHashes(suffix, hashes); // Pass the suffix for comparison
  }
  throw new Error("Failed to fetch compromised passwords");
};

const compareHashes = (
  userHashSuffix: string,
  apiHashes: string[]
): boolean => {
  return apiHashes.includes(userHashSuffix);
};

const checkPassword = async (password: string): Promise<string> => {
  // if (!checkPasswordIsValid(password)) {
  //     return 'Password is invalid';
  // }
  if (await checkIfPasswordIsCompromised(password)) {
    return "Password is compromised";
  }
  return "Password is secure";
};

checkPassword("gYfds233£asQQQsriosW12!").then((res) => console.log(res));
