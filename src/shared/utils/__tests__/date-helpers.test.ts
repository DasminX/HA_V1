import { toTimestamp } from "../date-helpers";

describe("toTimestamp function", () => {
  it("should return current timestamp if Date object provided", () => {
    const now = Date.now();

    const date = new Date();
    const date2 = new Date(now);
    const date3 = new Date(now - 1000 * 60 * 60 * 24 * 90);
    const date4 = new Date(now + 1000 * 60 * 60 * 24 * 89);

    const timestamp = toTimestamp(date);
    const timestamp2 = toTimestamp(date2);
    const timestamp3 = toTimestamp(date3);
    const timestamp4 = toTimestamp(date4);

    expect(timestamp).toBe(date.getTime());
    expect(timestamp2).toBe(date2.getTime());
    expect(now).toBeGreaterThan(timestamp3);
    expect(timestamp3).not.toBe(-1);
    expect(timestamp4).not.toBe(-1);
  });

  it("should return timestamp if correct date as string is provided", () => {
    const date = new Date("2022-01-01T12:00:00");
    const timestamp = toTimestamp(date);
    expect(timestamp).toBe(date.getTime());
  });

  it("should return -1 if invalid date is provided", () => {
    const date = new Date("test");
    const timestamp = toTimestamp(date);
    expect(timestamp).toEqual(-1);
  });

  it("should return -1 if number if incoming date is greater than 90 days", () => {
    const date = new Date("1 18 2038 23:59");
    const timestamp = toTimestamp(date);
    expect(timestamp).toEqual(-1);
  });
});
