export type ReportType = "weekly_digest" | "protocol_deep_dive" | "sector_overview";
export type OutputFormat = "markdown" | "json";

export interface ReportSection {
  title: string;
  content: string;
  dataPoints?: Record<string, string | number>;
}

export interface DeFiReport {
  id: string;
  type: ReportType;
  title: string;
  subtitle: string;
  date: string;
  sections: ReportSection[];
  tldr: string;
  generatedAt: number;
  wordCount: number;
}

export interface ProtocolSnapshot {
  name: string;
  tvlUsd: number;
  tvl7dChangePct: number;
  volumeUsd24h: number;
  chain: string;
  category: string;
}
