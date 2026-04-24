import { describe, it, expect } from "vitest";
import { formatUsd, formatPct, renderMarkdown, finalizeReport } from "../src/writer/formatter.js";
import type { DeFiReport } from "../src/lib/types.js";

describe("formatUsd", () => {
  it("formats billions", () => {
    expect(formatUsd(2_500_000_000)).toBe("$2.50B");
  });

  it("formats millions", () => {
    expect(formatUsd(45_200_000)).toBe("$45.20M");
  });

  it("formats thousands", () => {
    expect(formatUsd(12_500)).toBe("$12.5K");
  });

  it("formats negative values with the sign before currency", () => {
    expect(formatUsd(-12_500)).toBe("-$12.5K");
  });

  it("formats small amounts", () => {
    expect(formatUsd(99.5)).toBe("$99.50");
  });
});

describe("formatPct", () => {
  it("adds plus sign for positive numbers", () => {
    expect(formatPct(5.25)).toBe("+5.25%");
  });

  it("keeps minus sign for negative numbers", () => {
    expect(formatPct(-3.1)).toBe("-3.10%");
  });
});

describe("finalizeReport", () => {
  it("adds wordCount to the report", () => {
    const partial: Omit<DeFiReport, "wordCount"> = {
      id: "test-1",
      type: "weekly_digest",
      title: "Solana DeFi Weekly",
      subtitle: "April 2026 Edition",
      date: "April 4, 2026",
      sections: [
        { title: "TVL Overview", content: "Total value locked increased by five percent this week." },
      ],
      tldr: "Good week for Solana DeFi.",
      generatedAt: Date.now(),
    };

    const report = finalizeReport(partial);
    expect(report.wordCount).toBeGreaterThan(0);
    expect(typeof report.wordCount).toBe("number");
  });
});

describe("renderMarkdown", () => {
  it("produces a string containing the title", () => {
    const report: DeFiReport = {
      id: "test-2",
      type: "weekly_digest",
      title: "Weekly Digest",
      subtitle: "Test edition",
      date: "April 4, 2026",
      sections: [],
      tldr: "Short summary.",
      generatedAt: Date.now(),
      wordCount: 42,
    };

    const md = renderMarkdown(report);
    expect(md).toContain("# Weekly Digest");
    expect(md).toContain("Short summary.");
  });

  it("includes data points as a markdown table", () => {
    const report: DeFiReport = {
      id: "test-3",
      type: "weekly_digest",
      title: "Report",
      subtitle: "Sub",
      date: "April 4, 2026",
      sections: [
        {
          title: "TVL",
          content: "TVL went up.",
          dataPoints: { "Total TVL": "$1.2B", Protocols: 10 },
        },
      ],
      tldr: "Summary.",
      generatedAt: Date.now(),
      wordCount: 10,
    };

    const md = renderMarkdown(report);
    expect(md).toContain("| Metric | Value |");
    expect(md).toContain("Total TVL");
  });
});
