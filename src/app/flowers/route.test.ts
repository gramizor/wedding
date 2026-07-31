import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /flowers", () => {
  it("temporarily redirects to the configured flowers page", () => {
    const response = GET();

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://mate-wedding.ru/mikhail-and-varvara",
    );
  });
});
