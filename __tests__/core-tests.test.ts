import { checkPasswordEnhanced } from "../src/core-checks";
import * as securityChecks from "../src/security-checks";

const failingPasswords = [
  { value: "Pass_1", reason: "Less than 8 characters" },
  { value: "password123_", reason: "No capital letter" },
  { value: "PASSWORD123_", reason: "No lowercase letter" },
  { value: "Password____", reason: "No number" },
  { value: "Password123", reason: "No underscore" },
];

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      ok: true,
      text: () =>
        Promise.resolve(
          "ABCDEFGHIJKLMNOP:1\n0BEED049624F19195ACF9429DDD13FC7932:2\n"
        ),
    }) as Promise<Response>
);

describe("Password checker", () => {
  it("should return invalid for failing passwords", async () => {
    for (const password of failingPasswords) {
      expect(await checkPasswordEnhanced(password.value)).toEqual({
        status: true,
        message: "invalid",
      });
    }
  });
  it("should return valid for a valid password", async () => {
    expect(await checkPasswordEnhanced("Password_123")).toEqual({
      status: true,
      message: "valid & secure",
    });
  });
  it("should return compromised for a compromised password", async () => {
    expect(await checkPasswordEnhanced("Password_1")).toEqual({
      status: true,
      message: "compromised",
    });

    jest.restoreAllMocks();
  });
});
