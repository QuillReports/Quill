import { loadConfig } from "./lib/config.js";
import { setLogLevel } from "./lib/logger.js";
import { runAgentLoop } from "./agent/loop.js";
import { logger } from "./lib/logger.js";

async function main(): Promise<void> {
  const config = loadConfig();
  setLogLevel(config.LOG_LEVEL);

  const reportType = (process.env.REPORT_TYPE ?? "weekly_digest") as
    | "weekly_digest"
    | "protocol_deep_dive"
    | "sector_overview";

  logger.info(`Quill starting - report type: ${reportType}`);

  async function generate(): Promise<void> {
    const startedAt = Date.now();

    try {
      await runAgentLoop(config, reportType);
    } catch (err) {
      logger.error("Report generation error:", err);
    } finally {
      const durationMs = Date.now() - startedAt;
      logger.info("Report generation complete", { durationMs, reportType });

      if (config.REPORT_INTERVAL_MS > 0 && durationMs > config.REPORT_INTERVAL_MS) {
        logger.warn("Report generation exceeded configured interval", {
          durationMs,
          intervalMs: config.REPORT_INTERVAL_MS,
        });
      }
    }
  }

  await generate();

  if (config.REPORT_INTERVAL_MS > 0) {
    const runLoop = async (): Promise<void> => {
      await generate();
      setTimeout(() => {
        void runLoop();
      }, config.REPORT_INTERVAL_MS);
    };

    setTimeout(() => {
      void runLoop();
    }, config.REPORT_INTERVAL_MS);

    const days = config.REPORT_INTERVAL_MS / 86_400_000;
    logger.info(`Next report in ${days} day${days !== 1 ? "s" : ""}...`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
