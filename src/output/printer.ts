import type { DeFiReport } from "../lib/types.js";
import { renderMarkdown, renderJson } from "../writer/formatter.js";
import { logger } from "../lib/logger.js";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

export function printReport(
  report: DeFiReport,
  format: "markdown" | "json",
  outputDir: string
): void {
  const content = format === "markdown" ? renderMarkdown(report) : renderJson(report);
  const ext = format === "markdown" ? "md" : "json";
  const filename = `${report.type}-${new Date(report.generatedAt).toISOString().split("T")[0]}.${ext}`;

  try {
    mkdirSync(outputDir, { recursive: true });
    const filepath = join(outputDir, filename);
    writeFileSync(filepath, content, "utf8");
    logger.info(`Report saved: ${filepath} (${report.wordCount} words)`);
  } catch (err) {
    logger.warn("Could not write report to disk:", err);
  }

  console.log("\n" + "═".repeat(64));
  console.log(`  QUILL REPORT`);
  console.log(`  ${report.title}`);
  console.log(`  ${report.subtitle}`);
  console.log("─".repeat(64));
  console.log(`  ${report.tldr}`);
  console.log("─".repeat(64));
  console.log(`  Sections: ${report.sections.length}  |  Words: ${report.wordCount}  |  Format: ${format}`);
  console.log("═".repeat(64));
  console.log();
  console.log(content);
}
