import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Wishes } from "./Wishes";

describe("Wishes", () => {
  it("renders a flowers subscription CTA through the stable route", () => {
    const markup = renderToStaticMarkup(<Wishes />);

    expect(markup).toContain("Цветы");
    expect(markup).toContain("Оформить подписку на цветы");
    expect(markup).toContain('href="/flowers"');
    expect(markup).toContain('target="_blank"');
  });
});
