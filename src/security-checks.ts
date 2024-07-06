import { createHash } from "crypto";

interface SHA1HashObject {
  prefix: string;
  suffix: string;
}

export const getSHA1Prefix = (password: string): SHA1HashObject => {
  const sha1Hash = createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase();

  return { prefix: sha1Hash.substring(0, 5), suffix: sha1Hash.substring(5) };
};

export const checkIfPasswordIsCompromised = async (
  password: string
): Promise<boolean> => {
  const { prefix, suffix } = getSHA1Prefix(password);

  // realistically you would just maintain a DB of the hashes and check against that, but for demo purposes...:
  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`
  );

  if (response.ok) {
    const data = await response.text();

    // this is needed because the api returns a number of occurences at the end of the hash.
    const hashes = data.split("\n").map((line) => line.split(":")[0]);

    return compareHashes(suffix, hashes);
  }

  throw new Error("Failed to fetch compromised passwords");
};

const compareHashes = (
  userHashSuffix: string,
  apiHashes: string[]
): boolean => {
  return apiHashes.includes(userHashSuffix);
};
