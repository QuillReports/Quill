import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { description?: string; homepage?: string; keywords?: string[] };

describe("Solana rollback", () => {
  it("restores the final Solana repository presentation", () => {
    expect(readme).toContain("Protocol intelligence writer for the Solana ecosystem.");
    expect(readme).toContain("title: Solana DeFi Weekly Digest");
    expect(readme).not.toMatch(/Robinhood|quillalpha\.com/i);

    expect(packageJson.description).toBe(
      "Protocol intelligence writer that turns market data into memo-style weekly reports with clear provenance.",
    );
    expect(packageJson.homepage).toBe("https://github.com/QuillReports/Quill#readme");
    expect(packageJson.keywords).toContain("solana");
    expect(JSON.stringify(packageJson)).not.toMatch(/robinhood|quillalpha\.com/i);
  });
});
