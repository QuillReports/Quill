<div align="center">

# Quill

**Protocol intelligence writer for the Solana ecosystem.**
Quill turns raw market and protocol data into memo-style research that reads like an actual analyst wrote it, not like a dashboard exported itself.

[![Build](https://img.shields.io/github/actions/workflow/status/QuillReports/Quill/ci.yml?branch=master&style=flat-square&label=Build)](https://github.com/QuillReports/Quill/actions)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
[![Built with Claude Agent SDK](https://img.shields.io/badge/Built%20with-Claude%20Agent%20SDK-2dd4bf?style=flat-square)](https://docs.anthropic.com/en/docs/agents-and-tools/claude-agent-sdk)

</div>

---

Crypto does not have a shortage of dashboards. It has a shortage of market writing that tells the reader what changed, why it matters, and what conclusion is actually worth carrying forward.

Quill is built for that missing layer. It pulls protocol and market inputs, organizes them into report sections, and produces memo-style output that feels publishable instead of machine-generated.

`FETCH DATA -> FRAME THE STORY -> WRITE SECTIONS -> COMPILE REPORT -> PUBLISH`

---

Why Quill Exists • At a Glance • What Quill Publishes • Editorial Workflow • What Makes A Memo Worth Reading • Example Output • Source Discipline • Risk Controls • Quick Start

## Why Quill Exists

Most automated research products fail in the same way. They confuse summarizing data with writing analysis.

The output is usually full of metrics, light on judgment, and impossible to remember five minutes later. It reads like the machine saw numbers and then tried to make those numbers sound important.

Quill is meant to solve that exact problem. It is not trying to replace human conviction with generic AI prose. It is trying to build a strong first draft that already understands how research should flow:

- what changed
- what stands out
- what is noise
- what conclusion deserves attention

That is why the repo is framed as a writer, not a dashboard.

## At a Glance

- `Use case`: writing recurring or on-demand Solana protocol research from live data
- `Primary input`: protocol TVL, category context, token prices, and writer-side narrative framing
- `Primary failure mode`: producing generic summaries that restate metrics without explaining them
- `Best for`: teams that want a repeatable research surface without manually assembling every memo

## What Quill Publishes

Quill is not locked to one report shape. The product is more useful when the operator can decide what kind of writing job needs to be done.

| Report type | Best used for | What the reader should get |
|-------------|---------------|----------------------------|
| `weekly_digest` | recurring ecosystem updates | a broad but readable market memo |
| `protocol_deep_dive` | one protocol under a microscope | a concentrated research note |
| `sector_overview` | comparing related protocols | a thematic comparison with a clear narrative |

Each report type exists because the writing task is different. A digest should synthesize. A deep dive should explain. A sector note should compare.

## The Editorial Workflow

Quill works best when it is treated like a publishing system rather than a text generator.

### 1. Gather The Facts

Protocol and token inputs are pulled from configured sources so the writer starts from actual market state.

### 2. Choose The Writing Job

The system should know whether it is writing a weekly digest, a protocol memo, or a sector comparison before it begins composing.

### 3. Build The Right Sections

A good report has structure. Quill fills named sections instead of generating one long undirected block.

### 4. Attach The Supporting Points

The narrative becomes more believable when it carries concrete datapoints and source-aware notes.

### 5. Compile Something Reviewable

The final output should feel like a memo a human would actually mark up, share, or publish.

That is the standard Quill should be judged against.

## How It Works

Quill runs through a research pipeline:

1. fetch protocol snapshots and market data from the configured sources
2. decide what kind of report is being written
3. build the right sections for that report type
4. attach source-aware datapoints and supporting notes
5. compile the sections into a finished markdown or JSON report

The value is not merely that it writes. The value is that it writes in a form that already respects how good market notes are assembled.

## What Makes A Memo Worth Reading

A useful Quill report should do more than summarize a table.

- it identifies what changed instead of repeating a static snapshot
- it frames standout protocols or sectors relative to the broader Solana backdrop
- it gives the reader one or two conclusions worth carrying forward
- it makes the supporting data visible enough that the argument can be checked

That is the line between research and content sludge.

## How Teams Actually Use Quill

### Publishing Engine

This is the obvious path. A team wants a recurring ecosystem note without manually assembling every section from scratch.

### Internal Memo Builder

A desk can also use Quill to turn fresh metrics into a first-pass memo before a human analyst tightens the conviction and edits the final tone.

### Research Accelerator

Sometimes the value is not publishing at all. Sometimes the value is simply reducing the blank-page problem by starting from a draft that already understands what story the numbers may be telling.

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

## Source Discipline

Quill gets more credible when the writing surface makes the evidence visible.

That is why the repo is built around provenance-aware sections:

- data-backed notes belong next to the claims they support
- report types stay bounded so the writer does not drift into filler
- the output can be reviewed in markdown or machine-consumed in JSON

This matters for launch too. A repo that says "AI writes reports" is weak. A repo that says "AI writes reviewable research with visible support" is much easier to trust.

## What Quill Refuses To Do

- pretend a metric list is the same as analysis
- write undirected prose blobs with no section job
- hide the data surface behind vague market language
- treat every report as if the same writing structure fits every job

Those limits are a strength. They make the product easier to understand and easier to ship.

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

## Support Docs

- [Runbook](docs/runbook.md)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)

## License

MIT

---

*good market writing starts where dashboards stop.*
