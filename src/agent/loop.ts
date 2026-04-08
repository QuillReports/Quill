import Anthropic from "@anthropic-ai/sdk";
import type { Config } from "../lib/config.js";
import type { DeFiReport, ReportType } from "../lib/types.js";
import { buildSystemPrompt, buildUserPrompt } from "./prompts.js";
import { fetchProtocolSnapshots } from "../data/defillama.js";
import { fetchTokenPrices } from "../data/coingecko.js";
import { buildNarrativeSection, buildPriceSection, buildTvlSection, buildVolumeSection } from "../writer/sections.js";
import { finalizeReport } from "../writer/formatter.js";
import { printReport } from "../output/printer.js";
import { logger } from "../lib/logger.js";

const TOOLS: Anthropic.Tool[] = [
  {
    name: "fetch_protocol_data",
    description: "Fetch TVL and volume data from DefiLlama for tracked Solana protocols.",
    input_schema: { type: "object" as const, properties: {}, required: [] },
  },
  {
    name: "fetch_token_prices",
    description: "Fetch current price and market cap data for key Solana ecosystem tokens.",
    input_schema: { type: "object" as const, properties: {}, required: [] },
  },
  {
    name: "write_section",
    description: "Draft a specific section of the report.",
    input_schema: {
      type: "object" as const,
      properties: {
        section_type: {
          type: "string",
          enum: ["tvl_overview", "price_performance", "dex_volume", "narrative"],
        },
        notes: { type: "string" },
      },
      required: ["section_type"],
    },
  },
  {
    name: "compile_report",
    description: "Assemble all drafted sections into a final DeFi report.",
    input_schema: {
      type: "object" as const,
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        tldr: { type: "string" },
        format: { type: "string", enum: ["markdown", "json"] },
      },
      required: ["title", "subtitle", "tldr"],
    },
  },
];

export async function runAgentLoop(config: Config, reportType: ReportType = "weekly_digest"): Promise<void> {
  const client = new Anthropic({ apiKey: config.ANTHROPIC_API_KEY });

  logger.info(`Starting Quill - generating ${reportType}...`);

  const [protocols, prices] = await Promise.all([
    fetchProtocolSnapshots(config.DEFILLAMA_API_URL),
    fetchTokenPrices(config.COINGECKO_API_URL),
  ]);

  logger.info(`Loaded ${protocols.length} protocols, ${prices.length} token prices`);

  const sections: DeFiReport["sections"] = [];
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: buildUserPrompt(reportType, protocols, prices) },
  ];

  for (let iterations = 0; iterations < 12; iterations++) {
    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 6000,
      system: buildSystemPrompt(),
      tools: TOOLS,
      messages,
    });

    messages.push({ role: "assistant", content: response.content });

    if (response.stop_reason === "end_turn") {
      const textBlocks = response.content.filter((block): block is Anthropic.TextBlock => block.type === "text");
      const text = textBlocks.map((block) => block.text).join("\n");
      if (text) console.log("\n" + text);
      break;
    }

    if (response.stop_reason !== "tool_use") break;

    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    for (const block of response.content) {
      if (block.type !== "tool_use") continue;

      let result: string;

      if (block.name === "fetch_protocol_data") {
        const data = await fetchProtocolSnapshots(config.DEFILLAMA_API_URL);
        protocols.length = 0;
        protocols.push(...data);
        result = JSON.stringify(data);
      } else if (block.name === "fetch_token_prices") {
        const data = await fetchTokenPrices(config.COINGECKO_API_URL);
        prices.length = 0;
        prices.push(...data);
        result = JSON.stringify(data);
      } else if (block.name === "write_section") {
        const input = block.input as { section_type: string };
        const section =
          input.section_type === "tvl_overview" ? buildTvlSection(protocols) :
          input.section_type === "price_performance" ? buildPriceSection(prices) :
          input.section_type === "dex_volume" ? buildVolumeSection(protocols) :
          buildNarrativeSection(protocols, prices);
        sections.push(section);
        result = JSON.stringify(section);
      } else if (block.name === "compile_report") {
        const input = block.input as { title: string; subtitle: string; tldr: string; format?: string };
        const report = finalizeReport({
          id: `report-${Date.now()}`,
          type: reportType,
          title: input.title,
          subtitle: input.subtitle,
          date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          sections,
          tldr: input.tldr,
          generatedAt: Date.now(),
        });
        const format = (input.format ?? "markdown") as "markdown" | "json";
        printReport(report, format, config.OUTPUT_DIR);
        result = JSON.stringify({ success: true, wordCount: report.wordCount, sections: sections.length });
      } else {
        result = JSON.stringify({ error: `Unknown tool: ${block.name}` });
      }

      toolResults.push({ type: "tool_result", tool_use_id: block.id, content: result });
    }

    messages.push({ role: "user", content: toolResults });
  }
}
