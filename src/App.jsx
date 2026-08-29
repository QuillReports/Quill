// QuillLanding.jsx — single React component. Renders the Quill landing page.
// ─── Inline SVG icon system ────────────────────────────────────────────────
const Icon = ({ size = 18, color = "currentColor", strokeWidth = 1.6, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

const BookOpen = (p) => <Icon {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Icon>;
const Link2 = (p) => <Icon {...p}><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></Icon>;
const Crop = (p) => <Icon {...p}><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></Icon>;
const UserCheck = (p) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></Icon>;
const Download = (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
const Filter = (p) => <Icon {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;
const GitBranch = (p) => <Icon {...p}><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></Icon>;
const Edit3 = (p) => <Icon {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></Icon>;
const ShieldCheck = (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></Icon>;
const FileText = (p) => <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></Icon>;
const ArrowDown = (p) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></Icon>;
const ArrowRight = (p) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Icon>;
// ─── Decision badge ────────────────────────────────────────────────────────
const Badge = ({ kind }) => {
  const styles = {
    PUBLISH:   { background: "#e2d2ad", color: "#070605", border: "1px solid #e2d2ad" },
    IMPORTANT: { background: "rgba(199,122,61,0.18)", color: "#c77a3d", border: "1px solid #c77a3d" },
    WATCH:     { background: "transparent", color: "#e2d2ad", border: "1px solid #e2d2ad" },
    SKIP:      { background: "#342f2a", color: "#a1a1aa", border: "1px solid transparent" },
  }[kind];
  return (
    <span className="font-mono inline-flex items-center justify-center" style={{ ...styles, fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", padding: "4px 9px", borderRadius: 3, minWidth: 78 }}>
      {kind}
    </span>
  );
};

// ─── Decision strip row (desktop grid + mobile card) ──────────────────────
const ROWS = [
  { report: "Weekly Digest",      sub: "Solana DeFi · 12 protocols",     pct: 92, type: "DIGEST", age: "0m",  badge: "PUBLISH" },
  { report: "Protocol Deep Dive", sub: "Kamino · lending evolution",     pct: 71, type: "DIVE",   age: "2m",  badge: "IMPORTANT" },
  { report: "Sector Overview",    sub: "Liquid staking · 6 protocols",   pct: 48, type: "SECTOR", age: "8m",  badge: "WATCH" },
  { report: "Protocol Deep Dive", sub: "Drift · perp dynamics",          pct: 18, type: "DIVE",   age: "24m", badge: "SKIP" },
];

const QUEUE_ROWS = [
  ...ROWS,
  { report: "Sector Overview",    sub: "DEX aggregation · 4 protocols",  pct: 64, type: "SECTOR", age: "14m", badge: "IMPORTANT" },
];

const DraftBar = ({ pct }) => (
  <div className="flex items-center gap-2.5 w-full">
    <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "#342f2a" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "#c77a3d" }} />
    </div>
    <span className="font-mono" style={{ fontSize: 11, color: "#e4e4e7", minWidth: 22, textAlign: "right" }}>{pct}</span>
  </div>
);

const DesktopRow = ({ r, isLast }) => (
  <div className="hidden lg:grid items-center" style={{ gridTemplateColumns: "180px 1fr 110px 100px 110px", gap: 24, padding: "18px 24px", borderTop: isLast ? "none" : "1px solid #342f2a" }}>
    <div>
      <div style={{ color: "#e4e4e7", fontSize: 14, fontWeight: 500 }}>{r.report}</div>
      <div className="font-mono" style={{ color: "#71717a", fontSize: 11, marginTop: 4, letterSpacing: "0.04em" }}>{r.sub}</div>
    </div>
    <DraftBar pct={r.pct} />
    <span className="font-mono" style={{ color: "#a1a1aa", fontSize: 11, letterSpacing: "0.12em" }}>{r.type}</span>
    <span className="font-mono" style={{ color: "#71717a", fontSize: 11 }}>{r.age}</span>
    <div className="flex justify-end"><Badge kind={r.badge} /></div>
  </div>
);

const MobileRow = ({ r }) => (
  <div className="rounded-lg p-4 flex flex-col gap-3" style={{ background: "#070605", border: "1px solid #342f2a" }}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <div style={{ color: "#e4e4e7", fontSize: 14, fontWeight: 500 }}>{r.report}</div>
        <div className="font-mono" style={{ color: "#71717a", fontSize: 11, marginTop: 4 }}>{r.sub}</div>
      </div>
      <Badge kind={r.badge} />
    </div>
    <DraftBar pct={r.pct} />
    <div className="flex items-center justify-between">
      <span className="font-mono" style={{ color: "#a1a1aa", fontSize: 11, letterSpacing: "0.12em" }}>{r.type}</span>
      <span className="font-mono" style={{ color: "#71717a", fontSize: 11 }}>{r.age}</span>
    </div>
  </div>
);

// ─── Section eyebrow ───────────────────────────────────────────────────────
const SectionEyebrow = ({ children }) => (
  <div className="font-mono" style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.14em", color: "#c77a3d", marginBottom: 16 }}>
    {children}
  </div>
);

const FaintEyebrow = ({ children, style }) => (
  <div className="font-mono" style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", color: "#71717a", ...style }}>
    {children}
  </div>
);

// ─── Card primitives ───────────────────────────────────────────────────────
const Card = ({ children, className = "", style }) => (
  <div className={`rounded-xl p-6 ${className}`} style={{ background: "#100e0c", border: "1px solid #342f2a", ...style }}>
    {children}
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────
const QuillLanding = () => {
  return (
    <div className="quill-shell" style={{ background: "#070605", color: "#e4e4e7", fontFamily: '"Söhne", "Inter", system-ui, -apple-system, sans-serif', minHeight: "100vh" }}>
      {/* ─── NAV ──────────────────────────────────────────────────────── */}
      <nav style={{ borderBottom: "1px solid #342f2a" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 64 }}>
          <div className="flex items-center gap-2">
            <img src="/quill-mark.webp" alt="Quill pen-nib mark" width={32} height={32} className="quill-brand-mark" />
            <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.02em", color: "#e4e4e7" }}>Quill</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#board" className="font-mono" style={{ fontSize: 12, color: "#a1a1aa", letterSpacing: "0.08em" }}>QUEUE</a>
            <a href="#doctrine" className="font-mono" style={{ fontSize: 12, color: "#a1a1aa", letterSpacing: "0.08em" }}>DOCTRINE</a>
            <a href="#loop" className="font-mono" style={{ fontSize: 12, color: "#a1a1aa", letterSpacing: "0.08em" }}>LOOP</a>
            <a href="#guardrails" className="font-mono" style={{ fontSize: 12, color: "#a1a1aa", letterSpacing: "0.08em" }}>GUARDRAILS</a>
            <a href="#launch" className="font-mono" style={{ fontSize: 12, color: "#a1a1aa", letterSpacing: "0.08em" }}>LAUNCH</a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-6 pt-24 pb-20 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10">
            <span className="font-mono inline-flex items-center gap-2" style={{ fontSize: 11, color: "#a1a1aa", letterSpacing: "0.12em" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c77a3d", display: "inline-block" }}></span>
              LIVE RESEARCH WRITER
            </span>
            <span className="font-mono" style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.12em" }}>3 REPORT TYPES</span>
            <span className="font-mono" style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.12em" }}>MEMO STRUCTURE</span>
          </div>

          <h1 className="text-4xl lg:text-6xl" style={{ fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            <span style={{ color: "#fff" }}>Crypto has too many dashboards.</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.32)" }}>Not enough writing.</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-8" style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.6 }}>
            Quill turns raw on-chain data into memo-style market analysis. Weekly digests of the ecosystem, deep dives on single protocols, sector overviews across themes. The output reads like a research note — claims attached to data, conclusions worth carrying.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
            <a href="#board" className="inline-flex items-center gap-2" style={{ background: "#c77a3d", color: "#070605", padding: "12px 22px", borderRadius: 4, fontSize: 14, fontWeight: 500, letterSpacing: "0.02em", transition: "background 0.15s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#dfa06a"} onMouseLeave={(e) => e.currentTarget.style.background = "#c77a3d"}>
              Open the queue <ArrowRight size={15} />
            </a>
            <a href="#doctrine" style={{ color: "#a1a1aa", fontSize: 14 }}>Read the doctrine →</a>
          </div>
        </div>

        {/* HERO PANEL */}
        <div className="relative max-w-5xl mx-auto mt-16">
          <div className="rounded-2xl p-8" style={{ background: "#100e0c", border: "1px solid #342f2a", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at center top, rgba(199,122,61,0.09), transparent 65%)", pointerEvents: "none" }}></div>

            <div style={{ position: "relative" }}>
              <FaintEyebrow>WHAT YOU TOLD QUILL</FaintEyebrow>
              <p className="text-xl lg:text-2xl text-left mt-4" style={{ color: "#fff", fontStyle: "italic", lineHeight: 1.4, borderLeft: "3px solid #e2d2ad", paddingLeft: 20, fontWeight: 400 }}>
                "Write me weekly memos on Solana DeFi. Don't just list TVL — tell me what changed and what it means. Skip the protocols where nothing happened."
              </p>

              <div className="flex justify-center my-6">
                <ArrowDown size={22} color="#c77a3d" />
              </div>

              <div className="flex items-center justify-between mb-5">
                <FaintEyebrow>QUILL DRAFTED</FaintEyebrow>
                <FaintEyebrow>14:32 UTC</FaintEyebrow>
              </div>

              {/* Desktop strip */}
              <div className="hidden lg:block rounded-lg" style={{ background: "#070605", border: "1px solid #342f2a" }}>
                {ROWS.map((r, i) => <DesktopRow key={i} r={r} isLast={i === 0} />)}
              </div>

              {/* Mobile strip */}
              <div className="lg:hidden flex flex-col gap-3">
                {ROWS.map((r, i) => <MobileRow key={i} r={r} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 01 LIVE QUEUE ────────────────────────────────────────────── */}
      <section id="board" className="px-6 py-24" style={{ borderTop: "1px solid #342f2a" }}>
        <div className="max-w-6xl mx-auto">
          <SectionEyebrow>01 · LIVE QUEUE</SectionEyebrow>
          <h2 className="text-3xl lg:text-5xl mb-6" style={{ fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 820 }}>
            <span style={{ color: "#fff" }}>The reports Quill is drafting</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.32)" }}>right now.</span>
          </h2>
          <p style={{ color: "#a1a1aa", fontSize: 16, maxWidth: 640, lineHeight: 1.6 }}>
            A snapshot of the active draft queue. Each row is a memo in progress — type, completion, age, and the editorial call attached to it.
          </p>

          {/* Status bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-10 rounded-lg overflow-hidden" style={{ background: "#342f2a" }}>
            {[
              { label: "TRACKED", value: "24" },
              { label: "DRAFTING", value: "6" },
              { label: "QUEUED", value: "18" },
              { label: "UPDATED", value: "06:14 AGO" },
            ].map((s, i) => (
              <div key={i} className="p-5" style={{ background: "#100e0c" }}>
                <FaintEyebrow>{s.label}</FaintEyebrow>
                <div style={{ color: "#e4e4e7", fontSize: 22, fontWeight: 500, marginTop: 8, letterSpacing: "-0.01em" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Queue */}
          <div className="hidden lg:block rounded-xl mt-6" style={{ background: "#100e0c", border: "1px solid #342f2a" }}>
            <div className="grid items-center" style={{ gridTemplateColumns: "180px 1fr 110px 100px 110px", gap: 24, padding: "14px 24px", borderBottom: "1px solid #342f2a" }}>
              <FaintEyebrow>REPORT</FaintEyebrow>
              <FaintEyebrow>DRAFT PROGRESS</FaintEyebrow>
              <FaintEyebrow>FORMAT</FaintEyebrow>
              <FaintEyebrow>AGE</FaintEyebrow>
              <div className="text-right"><FaintEyebrow>CALL</FaintEyebrow></div>
            </div>
            {QUEUE_ROWS.map((r, i) => <DesktopRow key={i} r={r} isLast={false} />)}
          </div>
          <div className="lg:hidden flex flex-col gap-3 mt-6">
            {QUEUE_ROWS.map((r, i) => <MobileRow key={i} r={r} />)}
          </div>
        </div>
      </section>

      {/* ─── 02 DOCTRINE ──────────────────────────────────────────────── */}
      <section id="doctrine" className="px-6 py-24" style={{ borderTop: "1px solid #342f2a" }}>
        <div className="max-w-6xl mx-auto">
          <SectionEyebrow>02 · DOCTRINE</SectionEyebrow>
          <h2 className="text-3xl lg:text-5xl mb-12" style={{ fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 900 }}>
            <span style={{ color: "#fff" }}>Four rules that make</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.32)" }}>the writing trustworthy.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: "01", Icon: BookOpen, title: "Editorial-first.", body: "Every report has structure — sections, claims, data — not undirected prose. The form is the discipline." },
              { num: "02", Icon: Link2, title: "Data-attached.", body: "Every claim points to specific numbers. No floating opinion that the underlying data doesn't support." },
              { num: "03", Icon: Crop, title: "Bounded formats.", body: "Three report types. Bounded scope keeps each output focused — no generic filler trying to be everything." },
              { num: "04", Icon: UserCheck, title: "Draft, not final.", body: "Quill produces credible drafts. The judgment to publish stays with the human reviewer, every time." },
            ].map((c, i) => (
              <Card key={i}>
                <c.Icon size={20} color="#c77a3d" />
                <div className="font-mono mt-5" style={{ fontSize: 11, color: "#c77a3d", letterSpacing: "0.12em" }}>{c.num}</div>
                <h3 className="mt-2" style={{ fontSize: 17, color: "#fff", fontWeight: 500, letterSpacing: "-0.01em" }}>{c.title}</h3>
                <p className="mt-3" style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.55 }}>{c.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03 LOOP ──────────────────────────────────────────────────── */}
      <section id="loop" className="px-6 py-24" style={{ borderTop: "1px solid #342f2a" }}>
        <div className="max-w-6xl mx-auto">
          <SectionEyebrow>03 · LOOP</SectionEyebrow>
          <h2 className="text-3xl lg:text-5xl mb-12" style={{ fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 900 }}>
            <span style={{ color: "#fff" }}>Six steps from raw chain</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.32)" }}>to finished memo.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", Icon: Download, title: "Fetch", body: "Pulls protocol metadata, on-chain activity, treasury balances, tokenomics, fee retention from supported sources." },
              { num: "02", Icon: Filter, title: "Filter", body: "Drops protocols where nothing meaningful changed in the window. Quiet protocols stay out of the report." },
              { num: "03", Icon: GitBranch, title: "Structure", body: "Maps the surviving signals into the report's named sections — what changed, why it matters, what conclusion follows." },
              { num: "04", Icon: Edit3, title: "Draft", body: "Writes the memo. Each section is short, scannable, and tied to specific data points it can cite." },
              { num: "05", Icon: ShieldCheck, title: "Verify", body: "Cross-checks every claim against the underlying data. Claims without supporting numbers are removed before the draft ships." },
              { num: "06", Icon: FileText, title: "Output", body: "Publishes the report — markdown for human review, JSON for downstream automation. Both formats, always." },
            ].map((c, i) => (
              <Card key={i}>
                <div className="flex items-center justify-between">
                  <c.Icon size={20} color="#c77a3d" />
                  <span className="font-mono" style={{ fontSize: 11, color: "#c77a3d", letterSpacing: "0.12em" }}>{c.num}</span>
                </div>
                <h3 className="mt-5" style={{ fontSize: 19, color: "#fff", fontWeight: 500, letterSpacing: "-0.01em" }}>{c.title}</h3>
                <p className="mt-3" style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.55 }}>{c.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04 GUARDRAILS ────────────────────────────────────────────── */}
      <section id="guardrails" className="px-6 py-24" style={{ borderTop: "1px solid #342f2a" }}>
        <div className="max-w-6xl mx-auto">
          <SectionEyebrow>04 · GUARDRAILS</SectionEyebrow>
          <h2 className="text-3xl lg:text-5xl mb-12" style={{ fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 900 }}>
            <span style={{ color: "#fff" }}>Constraints that keep</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.32)" }}>the output honest.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT */}
            <Card style={{ padding: 32 }}>
              <FaintEyebrow style={{ marginBottom: 24 }}>GUARDRAILS · IN ORDER</FaintEyebrow>
              <div className="flex flex-col gap-6">
                {[
                  { n: "1.", t: "Activity floor.", b: "Protocols below the activity threshold for the window don't enter the report. Quiet doesn't get manufactured into news." },
                  { n: "2.", t: "Source integrity.", b: "Every data point cites a specific source. Numbers without provenance are flagged for human review, not auto-published." },
                  { n: "3.", t: "Format bounds.", b: "Each report type has a fixed structure. Sections that try to fit themes outside the type's scope are dropped." },
                  { n: "4.", t: "Draft framing.", b: "Every output is labeled DRAFT. Quill never ships finished, publication-ready conviction — that's the operator's call." },
                ].map((g, i) => (
                  <div key={i} className="grid" style={{ gridTemplateColumns: "32px 1fr", gap: 12, paddingBottom: i < 3 ? 24 : 0, borderBottom: i < 3 ? "1px solid #342f2a" : "none" }}>
                    <span className="font-mono" style={{ fontSize: 13, color: "#c77a3d", fontWeight: 500 }}>{g.n}</span>
                    <div>
                      <div style={{ fontSize: 15, color: "#fff", fontWeight: 500, marginBottom: 6 }}>{g.t}</div>
                      <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.55 }}>{g.b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* RIGHT */}
            <Card style={{ padding: 32 }}>
              <FaintEyebrow style={{ marginBottom: 24 }}>STRUCTURE · THREE FORMATS</FaintEyebrow>
              <div className="flex flex-col gap-6">
                {[
                  { tag: "DIGEST", t: "Weekly Digest.", b: "Ecosystem-wide synthesis across all supported Solana protocols. Identifies what changed in the week, ranks by significance, frames each item against the broader trajectory." },
                  { tag: "DIVE", t: "Protocol Deep Dive.", b: "Single-protocol focus. Tokenomics, governance, treasury, fee retention, recent activity, and standout developments — assembled into a memo a capital allocator can actually use." },
                  { tag: "SECTOR", t: "Sector Overview.", b: "Thematic comparison across related protocols. Liquid staking, lending, DEX aggregation, etc. Same metrics, same questions, applied across the cohort for relative read." },
                ].map((g, i) => (
                  <div key={i} style={{ paddingBottom: i < 2 ? 24 : 0, borderBottom: i < 2 ? "1px solid #342f2a" : "none" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono" style={{ fontSize: 10, padding: "3px 8px", border: "1px solid #342f2a", color: "#c77a3d", letterSpacing: "0.12em", borderRadius: 3 }}>{g.tag}</span>
                      <span style={{ fontSize: 15, color: "#fff", fontWeight: 500 }}>{g.t}</span>
                    </div>
                    <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.55 }}>{g.b}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── 05 PRINCIPLES ────────────────────────────────────────────── */}
      <section id="principles" className="px-6 py-24" style={{ borderTop: "1px solid #342f2a" }}>
        <div className="max-w-6xl mx-auto">
          <SectionEyebrow>05 · PRINCIPLES</SectionEyebrow>
          <h2 className="text-3xl lg:text-5xl mb-12" style={{ fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 900 }}>
            <span style={{ color: "#fff" }}>The shape of writing</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.32)" }}>worth carrying.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: "01", Icon: BookOpen, title: "Editorial discipline", body: "Every report reads like a memo, not a profile. Structure carries the signal." },
              { num: "02", Icon: Link2, title: "Claim-data binding", body: "No claim ships without the data point it cites. Provenance is in every paragraph." },
              { num: "03", Icon: Crop, title: "Bounded scope", body: "Three formats only. Bounded scope is the design — generic outputs are the failure mode." },
              { num: "04", Icon: UserCheck, title: "Draft-only output", body: "Quill writes drafts. Conviction belongs to the reviewer." },
            ].map((c, i) => (
              <Card key={i}>
                <c.Icon size={20} color="#c77a3d" />
                <div className="font-mono mt-5" style={{ fontSize: 11, color: "#c77a3d", letterSpacing: "0.12em" }}>{c.num}</div>
                <h3 className="mt-2" style={{ fontSize: 17, color: "#fff", fontWeight: 500, letterSpacing: "-0.01em" }}>{c.title}</h3>
                <p className="mt-3" style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.55 }}>{c.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 06 LAUNCH ────────────────────────────────────────────────── */}
      <section id="launch" className="px-6 py-24" style={{ borderTop: "1px solid #342f2a" }}>
        <div className="max-w-6xl mx-auto">
          <SectionEyebrow>06 · LAUNCH</SectionEyebrow>
          <h2 className="text-3xl lg:text-5xl mb-12" style={{ fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#fff" }}>
            Quill launches on Pump.fun.
          </h2>

          <div className="rounded-xl overflow-hidden" style={{ background: "#100e0c", border: "1px solid #342f2a" }}>
            {[
              { eyebrow: "LIVE", title: "The writer is running", body: "Drafts are being produced on the published cadence — weekly digests, deep dives on request, sector overviews on the rotation." },
              { eyebrow: "OPEN", title: "Token available on Pump.fun", body: "$QUILL trades on the standard Pump.fun bonding curve. No private allocation, no preferential terms, no team supply locked behind anything." },
              { eyebrow: "OWNED", title: "Holders shape the rotation", body: "The protocol coverage list and the deep-dive queue are influenced by holder signal. The reports themselves remain editorially independent." },
            ].map((r, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-[160px_1fr] items-start gap-6 lg:gap-12" style={{ padding: "28px 32px", borderTop: i === 0 ? "none" : "1px solid #342f2a" }}>
                <FaintEyebrow style={{ paddingTop: 4 }}>{r.eyebrow}</FaintEyebrow>
                <div>
                  <div style={{ fontSize: 19, color: "#fff", fontWeight: 500, marginBottom: 8, letterSpacing: "-0.01em" }}>{r.title}</div>
                  <p style={{ fontSize: 15, color: "#a1a1aa", lineHeight: 1.6, maxWidth: 720 }}>{r.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href="#board" className="inline-flex items-center gap-2" style={{ background: "#c77a3d", color: "#070605", padding: "12px 22px", borderRadius: 4, fontSize: 14, fontWeight: 500 }} onMouseEnter={(e) => e.currentTarget.style.background = "#dfa06a"} onMouseLeave={(e) => e.currentTarget.style.background = "#c77a3d"}>
              Open the queue <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="px-6 py-32" style={{ borderTop: "1px solid #342f2a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <FaintEyebrow style={{ marginBottom: 20 }}>MARKET WRITING IS RARE</FaintEyebrow>
          <h2 className="text-3xl lg:text-5xl" style={{ fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            <span style={{ color: "#fff" }}>Dashboards are everywhere.</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.32)" }}>Memos that say what they mean are not.</span>
          </h2>
        </div>
      </section>

      {/* ─── FOOTER (golden standard: 2-col SITE | PROJECT + signature) ── */}
      <footer style={{ background: "#070605", borderTop: "1px solid #342f2a" }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <FaintEyebrow style={{ marginBottom: 14 }}>SITE</FaintEyebrow>
              <div className="flex flex-col gap-3">
                <a href="#doctrine" style={{ fontSize: 14, color: "#a1a1aa" }}>Doctrine</a>
                <a href="#loop" style={{ fontSize: 14, color: "#a1a1aa" }}>Loop</a>
                <a href="#guardrails" style={{ fontSize: 14, color: "#a1a1aa" }}>Guardrails</a>
                <a href="#launch" style={{ fontSize: 14, color: "#a1a1aa" }}>Launch</a>
              </div>
            </div>
            <div>
              <FaintEyebrow style={{ marginBottom: 14 }}>PROJECT</FaintEyebrow>
              <div className="flex flex-col gap-3">
                <a href="#" style={{ fontSize: 14, color: "#a1a1aa" }}>GitHub</a>
                <a href="#" style={{ fontSize: 14, color: "#a1a1aa" }}>Twitter</a>
                <a href="#" style={{ fontSize: 14, color: "#a1a1aa" }}>Pump.fun</a>
                <a href="#" style={{ fontSize: 14, color: "#a1a1aa" }}>Whitepaper</a>
              </div>
            </div>
          </div>
          <div className="mt-12 font-mono" style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.12em" }}>
            Quill · Solana protocol intelligence writer · MIT licensed · 2026
          </div>
        </div>
      </footer>
    </div>
  );
};

// ─── Mount ─────────────────────────────────────────────────────────────────
export default QuillLanding;
