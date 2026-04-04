import type { ProtocolSnapshot, ReportSection } from "../lib/types.js";
import type { TokenPrice } from "../data/coingecko.js";
import { formatUsd, formatPct } from "./formatter.js";

export function buildTvlSection(protocols: ProtocolSnapshot[]): ReportSection {
  const sorted = [...protocols].sort((a, b) => b.tvlUsd - a.tvlUsd);
  const totalTvl = protocols.reduce((s, p) => s + p.tvlUsd, 0);

  const rows = sorted
    .map(
      (p) =>
        `- **${p.name}**: ${formatUsd(p.tvlUsd)} TVL (${formatPct(p.tvl7dChangePct)} 7d)`
    )
    .join("\n");

  const gainers = sorted.filter((p) => p.tvl7dChangePct > 5);
  const losers = sorted.filter((p) => p.tvl7dChangePct < -5);

  let commentary = `Total tracked TVL: **${formatUsd(totalTvl)}**.\n\n${rows}`;
  if (gainers.length > 0) {
    commentary += `\n\nTop gainers: ${gainers.map((p) => p.name).join(", ")}.`;
  }
  if (losers.length > 0) {
    commentary += ` Notable outflows: ${losers.map((p) => p.name).join(", ")}.`;
  }

  return {
    title: "TVL Overview",
    content: commentary,
    dataPoints: {
      "Total TVL": formatUsd(totalTvl),
      "Protocols Tracked": protocols.length,
      "7d Gainers": gainers.length,
      "7d Losers": losers.length,
    },
  };
}

export function buildPriceSection(prices: TokenPrice[]): ReportSection {
  const sorted = [...prices].sort((a, b) => b.marketCapUsd - a.marketCapUsd);

  const rows = sorted
    .map(
      (t) =>
        `- **${t.symbol}**: ${formatUsd(t.priceUsd)} (24h: ${formatPct(t.change24h)}, 7d: ${formatPct(t.change7d)})`
    )
    .join("\n");

  const bullish = sorted.filter((t) => t.change7d > 10);
  const bearish = sorted.filter((t) => t.change7d < -10);

  const commentary = `Price performance for key Solana ecosystem tokens:\n\n${rows}${
    bullish.length > 0 ? `\n\nStrong performers: ${bullish.map((t) => t.symbol).join(", ")}.` : ""
  }${
    bearish.length > 0 ? ` Underperformers: ${bearish.map((t) => t.symbol).join(", ")}.` : ""
  }`;

  return {
    title: "Token Performance",
    content: commentary,
    dataPoints: Object.fromEntries(
      sorted.map((t) => [t.symbol, `${formatUsd(t.priceUsd)} (${formatPct(t.change24h)} 24h)`])
    ),
  };
}

export function buildVolumeSection(protocols: ProtocolSnapshot[]): ReportSection {
  const withVolume = protocols.filter((p) => p.volumeUsd24h > 0);
  const sorted = [...withVolume].sort((a, b) => b.volumeUsd24h - a.volumeUsd24h);
  const totalVolume = withVolume.reduce((s, p) => s + p.volumeUsd24h, 0);

  const rows = sorted
    .map((p) => `- **${p.name}**: ${formatUsd(p.volumeUsd24h)} 24h volume`)
    .join("\n");

  return {
    title: "DEX Volume",
    content: `24-hour trading volume across tracked protocols:\n\n${rows}`,
    dataPoints: {
      "Total 24h Volume": formatUsd(totalVolume),
      "Top Protocol": sorted[0]?.name ?? "N/A",
      "Top Protocol Volume": sorted[0] ? formatUsd(sorted[0].volumeUsd24h) : "N/A",
    },
  };
}
