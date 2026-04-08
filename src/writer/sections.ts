import type { ProtocolSnapshot, ReportSection } from "../lib/types.js";
import type { TokenPrice } from "../data/coingecko.js";
import { formatPct, formatUsd } from "./formatter.js";

export function buildTvlSection(protocols: ProtocolSnapshot[]): ReportSection {
  const sorted = [...protocols].sort((left, right) => right.tvlUsd - left.tvlUsd);
  const totalTvl = protocols.reduce((sum, protocol) => sum + protocol.tvlUsd, 0);
  const rows = sorted
    .map((protocol) => `- **${protocol.name}**: ${formatUsd(protocol.tvlUsd)} TVL (${formatPct(protocol.tvl7dChangePct)} 7d)`)
    .join("\n");
  const gainers = sorted.filter((protocol) => protocol.tvl7dChangePct > 5);
  const losers = sorted.filter((protocol) => protocol.tvl7dChangePct < -5);

  let commentary = `Total tracked TVL: **${formatUsd(totalTvl)}**.\n\n${rows}`;
  if (gainers.length > 0) commentary += `\n\nTop gainers: ${gainers.map((protocol) => protocol.name).join(", ")}.`;
  if (losers.length > 0) commentary += ` Notable outflows: ${losers.map((protocol) => protocol.name).join(", ")}.`;

  return {
    title: "TVL Overview",
    content: commentary,
    sourceNotes: ["Observed TVL and 7d change from DefiLlama /protocols"],
    dataPoints: {
      "Total TVL": formatUsd(totalTvl),
      "Protocols Tracked": protocols.length,
      "7d Gainers": gainers.length,
      "7d Losers": losers.length,
    },
  };
}

export function buildPriceSection(prices: TokenPrice[]): ReportSection {
  const sorted = [...prices].sort((left, right) => right.marketCapUsd - left.marketCapUsd);
  const rows = sorted
    .map((token) => `- **${token.symbol}**: ${formatUsd(token.priceUsd)} (24h: ${formatPct(token.change24h)}, 7d: ${formatPct(token.change7d)})`)
    .join("\n");
  const bullish = sorted.filter((token) => token.change7d > 10);
  const bearish = sorted.filter((token) => token.change7d < -10);

  return {
    title: "Token Performance",
    content:
      `Price performance for key Solana ecosystem tokens:\n\n${rows}` +
      (bullish.length > 0 ? `\n\nStrong performers: ${bullish.map((token) => token.symbol).join(", ")}.` : "") +
      (bearish.length > 0 ? ` Underperformers: ${bearish.map((token) => token.symbol).join(", ")}.` : ""),
    sourceNotes: ["Observed spot price, market cap, and trailing returns from CoinGecko /coins/markets"],
    dataPoints: Object.fromEntries(
      sorted.map((token) => [token.symbol, `${formatUsd(token.priceUsd)} (${formatPct(token.change24h)} 24h)`])
    ),
  };
}

export function buildVolumeSection(protocols: ProtocolSnapshot[]): ReportSection {
  const withVolume = protocols.filter((protocol) => protocol.volumeUsd24h > 0);
  const sorted = [...withVolume].sort((left, right) => right.volumeUsd24h - left.volumeUsd24h);
  const totalVolume = withVolume.reduce((sum, protocol) => sum + protocol.volumeUsd24h, 0);
  const rows = sorted.map((protocol) => `- **${protocol.name}**: ${formatUsd(protocol.volumeUsd24h)} 24h volume`).join("\n");

  return {
    title: "DEX Volume",
    content: `24-hour trading volume across tracked protocols:\n\n${rows}`,
    sourceNotes: ["Observed 24h protocol volume from DefiLlama /protocols where available"],
    dataPoints: {
      "Total 24h Volume": formatUsd(totalVolume),
      "Top Protocol": sorted[0]?.name ?? "N/A",
      "Top Protocol Volume": sorted[0] ? formatUsd(sorted[0].volumeUsd24h) : "N/A",
    },
  };
}

export function buildNarrativeSection(protocols: ProtocolSnapshot[], prices: TokenPrice[]): ReportSection {
  const topTvl = [...protocols].sort((left, right) => right.tvl7dChangePct - left.tvl7dChangePct)[0];
  const weakestTvl = [...protocols].sort((left, right) => left.tvl7dChangePct - right.tvl7dChangePct)[0];
  const strongestToken = [...prices].sort((left, right) => right.change7d - left.change7d)[0];
  const weakestToken = [...prices].sort((left, right) => left.change7d - right.change7d)[0];

  const narrative = [
    topTvl ? `${topTvl.name} is leading protocol momentum on tracked TVL with ${formatPct(topTvl.tvl7dChangePct)} over seven days.` : null,
    weakestTvl ? `${weakestTvl.name} is the weakest protocol on the board, with ${formatPct(weakestTvl.tvl7dChangePct)} across the same window.` : null,
    strongestToken ? `${strongestToken.symbol} is the strongest token in the tracked basket at ${formatPct(strongestToken.change7d)} on the week.` : null,
    weakestToken ? `${weakestToken.symbol} is lagging at ${formatPct(weakestToken.change7d)}, which matters if protocol flows do not confirm.` : null,
  ].filter(Boolean).join(" ");

  return {
    title: "Market Narrative",
    content: narrative,
    sourceNotes: ["Narrative generated from observed TVL deltas and token performance, not from external news feeds"],
    dataPoints: {
      "Protocol Leader": topTvl?.name ?? "N/A",
      "Protocol Laggard": weakestTvl?.name ?? "N/A",
      "Token Leader": strongestToken?.symbol ?? "N/A",
      "Token Laggard": weakestToken?.symbol ?? "N/A",
    },
  };
}
