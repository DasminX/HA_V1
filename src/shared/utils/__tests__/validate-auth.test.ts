import { validateAuth } from "../validate-auth";

const MOCK_10_SECONDS_AHEAD = Date.now() + 10000;

describe("validateAuth function", () => {
  it("should be truthy if trimmed string is empty", () => {
    const t = "";
    const t2 = "        ";

    const tIsValid = validateAuth(t, MOCK_10_SECONDS_AHEAD);
    const t2IsValid = validateAuth(t2, MOCK_10_SECONDS_AHEAD);

    expect(tIsValid).toBeFalsy();
    expect(t2IsValid).toBeFalsy();
  });

  it("should be truthy if token is not empty", () => {
    const t = "abc";

    const tIsValid = validateAuth(t, MOCK_10_SECONDS_AHEAD);

    expect(tIsValid).toBeTruthy();
  });

  it("should be falsy if expiresIn yields NaN", () => {
    const validToken = "abc";
    const mockNaN = NaN;

    const tIsValid = validateAuth(validToken, mockNaN);

    expect(tIsValid).toBeFalsy();
  });

  it("should be falsy if expiresIn is a number bot is not greater than current timestamp", () => {
    const validToken = "abc";
    const validExpiresIn = 1;

    const isValid = validateAuth(validToken, validExpiresIn);

    expect(isValid).toBeFalsy();
  });
});
