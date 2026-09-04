import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const avatar = readFileSync(new URL("../assets/quill-avatar.png", import.meta.url));
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { description?: string; homepage?: string; keywords?: string[] };

describe("Robinhood and Pons launch presentation", () => {
  it("positions Quill as a current Robinhood crypto writer launching on Pons", () => {
    expect(readme).toContain("Market intelligence writer for Robinhood crypto");
    expect(readme).toContain('<img src="assets/quill-avatar.png"');
    expect(avatar.byteLength).toBeGreaterThan(1_024);
    expect(readme).toContain("[Website](https://quillalpha.com/)");
    expect(readme).toContain("[Launch venue](https://pons.family/)");
    expect(readme).toContain("Snapshot: September 4, 2026 · 12:27 UTC");
    expect(readme).not.toMatch(/\bSolana\b|Pump\.fun|Polymarket/i);
    expect(packageJson.description).toContain("Robinhood market intelligence");
    expect(packageJson.homepage).toBe("https://quillalpha.com/");
    expect(packageJson.keywords).toContain("robinhood");
    expect(packageJson.keywords).toContain("pons");
    expect(packageJson.keywords).not.toContain("solana");
  });
});
