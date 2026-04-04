import { logger } from "../lib/logger.js";

export interface TokenPrice {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  change7d: number;
  marketCapUsd: number;
  volumeUsd24h: number;
}

const TRACKED_TOKENS = [
  "solana",
  "jupiter-exchange-solana",
  "jito-governance-token",
  "marinade-staked-sol",
  "kamino",
];

export async function fetchTokenPrices(apiUrl: string): Promise<TokenPrice[]> {
  try {
    const ids = TRACKED_TOKENS.join(",");
    const url =
      `${apiUrl}/coins/markets` +
      `?vs_currency=usd` +
      `&ids=${ids}` +
      `&order=market_cap_desc` +
      `&price_change_percentage=24h,7d`;

    const res = await fetch(url);
    if (!res.ok) {
      logger.warn(`CoinGecko markets returned ${res.status}`);
      return [];
    }

    const data = (await res.json()) as Array<{
      id: string;
      symbol: string;
      name: string;
      current_price: number;
      price_change_percentage_24h: number;
      price_change_percentage_7d_in_currency: number;
      market_cap: number;
      total_volume: number;
    }>;

    return data.map((t) => ({
      id: t.id,
      symbol: t.symbol.toUpperCase(),
      name: t.name,
      priceUsd: t.current_price,
      change24h: t.price_change_percentage_24h,
      change7d: t.price_change_percentage_7d_in_currency,
      marketCapUsd: t.market_cap,
      volumeUsd24h: t.total_volume,
    }));
  } catch (err) {
    logger.error("Failed to fetch CoinGecko prices:", err);
    return [];
  }
}
