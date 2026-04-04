import { z } from "zod";

const ConfigSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1),
  DEFILLAMA_API_URL: z.string().url().default("https://api.llama.fi"),
  COINGECKO_API_URL: z.string().url().default("https://api.coingecko.com/api/v3"),
  REPORT_INTERVAL_MS: z.coerce.number().default(604_800_000),
  OUTPUT_DIR: z.string().default("./reports"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(): Config {
  const result = ConfigSchema.safeParse(process.env);
  if (!result.success) {
    console.error("Invalid configuration:", result.error.flatten().fieldErrors);
    process.exit(1);
  }
  return result.data;
}
