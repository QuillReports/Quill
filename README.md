<div align="center">

# Quill

**Protocol intelligence writer for the Solana ecosystem.**
Quill turns raw market and protocol data into memo-style research that reads like an actual analyst wrote it, not like a dashboard exported itself.

[![Build](https://img.shields.io/github/actions/workflow/status/QuillReports/Quill/ci.yml?branch=master&style=flat-square&label=Build)](https://github.com/QuillReports/Quill/actions)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
[![Built with Claude Agent SDK](https://img.shields.io/badge/Built%20with-Claude%20Agent%20SDK-2dd4bf?style=flat-square)](https://docs.anthropic.com/en/docs/agents-and-tools/claude-agent-sdk)

</div>

---

Crypto has plenty of dashboards and not enough synthesis. There is always one more table showing TVL, volume, or token performance, but the hard part is turning those numbers into a report that explains what changed, why it matters, and what deserves attention next. Quill is built for that layer.

It pulls structured protocol data, price data, and market context, then compiles those inputs into readable reports such as weekly ecosystem digests, single-protocol deep dives, and sector snapshots. The output is meant to look like research, not analytics exhaust.

`FETCH DATA -> FRAME THE STORY -> WRITE SECTIONS -> COMPILE REPORT -> PUBLISH`

---

Sample Report - Report Pipeline - At a Glance - Operating Surfaces - How It Works - Example Output - Report Types - Risk Controls - Quick Start

## At a Glance

- `Use case`: writing recurring or on-demand Solana protocol research from live data
- `Primary input`: protocol TVL, category context, token prices, and writer-side narrative framing
- `Primary failure mode`: producing generic summaries that restate metrics without explaining them
- `Best for`: teams that want a repeatable research surface without manually assembling every memo

## Sample Report

![Quill Report](assets/preview-report.svg)

## Report Pipeline

![Quill Pipeline](assets/preview-pipeline.svg)

## Operating Surfaces

- `Data Layer`: pulls protocol and token inputs from tracked external sources
- `Section Writer`: converts those inputs into structured report sections with supporting datapoints
- `Formatter`: compiles the final report into markdown or JSON output
- `Narrative Layer`: keeps the writing factual, readable, and opinionated only where the data supports it

## Why Quill Exists

The problem with many automated market reports is that they feel automated in the worst way. They list numbers, rename those numbers as "insights," and never build a real argument. That is not enough if the goal is to produce content someone would actually read, share, or use to form an opinion.

Quill exists to bridge the gap between structured data and readable protocol intelligence. It is not trying to replace human judgment with hype. It is trying to give a research workflow a reliable first draft that already understands the difference between a datapoint and a story.

## How It Works

Quill runs through a research pipeline:

1. fetch protocol snapshots and market data from the configured sources
2. decide what kind of report is being written
3. build the right sections for that report type
4. attach source-aware datapoints and supporting notes
5. compile the sections into a finished markdown or JSON report

The value of the system is not just that it writes. The value is that it writes with enough structure that the final output can be reviewed like a real memo.

## What Makes A Quill Report Worth Reading

A good Quill report does more than summarize.

- it identifies what changed instead of repeating a static metric snapshot
- it frames standout protocols or sectors relative to the broader Solana backdrop
- it gives the reader one or two conclusions worth carrying forward
- it makes its data surface visible enough that the argument can be checked

That is the line between report generation and content sludge.

## Example Output

```text
QUILL // WEEKLY DIGEST

title: Solana DeFi Weekly Digest
focus: DEX activity expanded while lending TVL stayed more selective

key takeaways:
- TVL growth was uneven and concentrated in a small number of venues
- token performance outpaced underlying protocol traction in several cases
- the strongest reportable narrative this week was rotation, not broad expansion
```

## Report Types

| Type | Best used for | Output style |
|------|---------------|--------------|
| `weekly_digest` | recurring ecosystem updates | broad market memo |
| `protocol_deep_dive` | single protocol analysis | focused research note |
| `sector_overview` | comparing related protocols | thematic comparison |

Each report type has a different writing job. A weekly digest should synthesize. A deep dive should explain. A sector overview should compare.

## How Teams Usually Use Quill

Quill works well in two modes:

1. as a recurring publishing engine for ecosystem updates
2. as a rapid drafting tool for internal or public protocol memos

In both cases, the point is the same: move faster from raw metrics to something publishable without falling into generic AI prose.

## Risk Controls

- `structured sections`: the writer has to fill named report sections instead of generating an undirected blob
- `data-backed notes`: sections can carry datapoints and source notes so the narrative stays grounded
- `bounded report types`: each mode has a clear output job, which reduces generic filler
- `explicit output formats`: reports can be compiled into markdown for publishing or JSON for downstream systems

Quill should be judged on whether the resulting report feels reviewable and useful, not on whether it can produce the maximum amount of text.

## Quick Start

```bash
git clone https://github.com/QuillReports/Quill
cd Quill
bun install
cp .env.example .env
bun run dev
```

## Configuration

```bash
ANTHROPIC_API_KEY=sk-ant-...
DEFILLAMA_API_URL=https://api.llama.fi
COINGECKO_API_URL=https://api.coingecko.com/api/v3
REPORT_INTERVAL_MS=604800000
OUTPUT_DIR=./reports
LOG_LEVEL=info
```

Set `REPORT_TYPE=protocol_deep_dive` or `REPORT_TYPE=sector_overview` when you want a narrower output than the weekly digest flow.

## License

MIT

---

*good market writing starts where dashboards stop.*
