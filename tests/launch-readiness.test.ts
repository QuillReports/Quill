import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { homepage?: string };

describe("launch links", () => {
  it("uses the Quill custom domain everywhere", () => {
    expect(readme).toContain("[Website](https://quillalpha.com/)");
    expect(packageJson.homepage).toBe("https://quillalpha.com/");
    expect(readme).not.toContain("quill-launch.vercel.app");
    expect(JSON.stringify(packageJson)).not.toContain("quill-launch.vercel.app");
  });
});
