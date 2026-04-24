import type { DeFiReport, ReportSection } from "../lib/types.js";

export function formatUsd(n: number): string {
  const sign = n < 0 ? "-" : "";
  const value = Math.abs(n);
  if (value >= 1_000_000_000) return `${sign}$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${sign}$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${sign}$${(value / 1_000).toFixed(1)}K`;
  return `${sign}$${value.toFixed(2)}`;
}

export function formatPct(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function renderMarkdown(report: DeFiReport): string {
  const lines: string[] = [];

  lines.push(`# ${report.title}`);
  lines.push(`*${report.subtitle}*`);
  lines.push(`*${report.date}*`);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## TL;DR");
  lines.push(report.tldr);
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const section of report.sections) {
    lines.push(`## ${section.title}`);
    lines.push("");
    lines.push(section.content);
    lines.push("");

    if (section.dataPoints && Object.keys(section.dataPoints).length > 0) {
      lines.push("| Metric | Value |");
      lines.push("|--------|-------|");
      for (const [key, value] of Object.entries(section.dataPoints)) {
        lines.push(`| ${key} | ${value} |`);
      }
      lines.push("");
    }

    if (section.sourceNotes && section.sourceNotes.length > 0) {
      lines.push("**Sources**");
      for (const note of section.sourceNotes) lines.push(`- ${note}`);
      lines.push("");
    }

    lines.push("---");
    lines.push("");
  }

  return lines.join("\n");
}

export function renderJson(report: DeFiReport): string {
  return JSON.stringify(report, null, 2);
}

export function finalizeReport(report: Omit<DeFiReport, "wordCount">): DeFiReport {
  const allText = [
    report.title,
    report.subtitle,
    report.tldr,
    ...report.sections.map((section: ReportSection) => section.title + " " + section.content),
  ].join(" ");

  return {
    ...report,
    wordCount: countWords(allText),
  };
}
