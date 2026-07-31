import { describe, expect, it } from "vitest";
import { calculateCountdown } from "./countdown";

const ceremonyDate = new Date("2026-08-11T10:30:00+03:00");

describe("calculateCountdown", () => {
  it("is active immediately before the ceremony", () => {
    const result = calculateCountdown(
      ceremonyDate,
      new Date("2026-08-11T10:29:59+03:00"),
    );

    expect(result.isComplete).toBe(false);
    expect(result.seconds).toBe(1);
  });

  it("completes exactly at the ceremony time", () => {
    const result = calculateCountdown(ceremonyDate, ceremonyDate);

    expect(result).toEqual({
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    });
  });

  it("stays complete after the ceremony", () => {
    const result = calculateCountdown(
      ceremonyDate,
      new Date("2026-08-11T10:30:01+03:00"),
    );

    expect(result.isComplete).toBe(true);
  });
});
