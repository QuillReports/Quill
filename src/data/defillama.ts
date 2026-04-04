import type { ProtocolSnapshot } from "../lib/types.js";
import { logger } from "../lib/logger.js";

interface DefiLlamaProtocol {
  name: string;
  tvl: number;
  change_7d: number;
  volume24h?: number;
  chains: string[];
  category: string;
}

const TRACKED_PROTOCOLS = [
  "Marinade Finance",
  "Kamino Finance",
  "MarginFi",
  "Drift Protocol",
  "Jupiter",
  "Meteora",
  "Orca",
  "Raydium",
  "Phoenix",
  "Lifinity",
];

export async function fetchProtocolSnapshots(
  apiUrl: string
): Promise<ProtocolSnapshot[]> {
  try {
    const res = await fetch(`${apiUrl}/protocols`);
    if (!res.ok) {
      logger.warn(`DefiLlama /protocols returned ${res.status}`);
      return [];
    }

    const all = (await res.json()) as DefiLlamaProtocol[];

    return all
      .filter((p) => TRACKED_PROTOCOLS.includes(p.name))
      .map((p): ProtocolSnapshot => ({
        name: p.name,
        tvlUsd: p.tvl,
        tvl7dChangePct: p.change_7d ?? 0,
        volumeUsd24h: p.volume24h ?? 0,
        chain: p.chains[0] ?? "Unknown",
        category: p.category,
      }));
  } catch (err) {
    logger.error("Failed to fetch DefiLlama protocols:", err);
    return [];
  }
}

export async function fetchTvlHistory(
  apiUrl: string,
  protocol: string
): Promise<Array<{ date: number; tvl: number }>> {
  const slug = protocol.toLowerCase().replace(/\s+/g, "-");
  try {
    const res = await fetch(`${apiUrl}/protocol/${slug}`);
    if (!res.ok) return [];
    const data = (await res.json()) as {
      tvl?: Array<{ date: number; totalLiquidityUSD: number }>;
    };
    return (data.tvl ?? []).map((p) => ({ date: p.date, tvl: p.totalLiquidityUSD }));
  } catch {
    return [];
  }
}
