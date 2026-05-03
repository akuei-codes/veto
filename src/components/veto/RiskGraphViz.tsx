import { useState } from "react";

/** Agent → decision → downstream blast — spatial, not dashboard metrics. */

const nodes: { id: string; label: string; short: string; x: number; y: number; kind: "agent" | "veto" | "system" }[] = [
  { id: "orch", label: "Orchestrator", short: "Agent", x: 12, y: 46, kind: "agent" },
  { id: "veto", label: "Veto ring", short: "Decision", x: 50, y: 46, kind: "veto" },
  { id: "pg", label: "Postgres", short: "DB", x: 78, y: 18, kind: "system" },
  { id: "ses", label: "Email (SES)", short: "Mail", x: 88, y: 52, kind: "system" },
  { id: "stripe", label: "Stripe", short: "$$", x: 78, y: 82, kind: "system" },
];

const edges: { from: string; to: string; risky?: boolean }[] = [
  { from: "orch", to: "veto" },
  { from: "veto", to: "pg", risky: true },
  { from: "veto", to: "ses" },
  { from: "veto", to: "stripe", risky: true },
];

export function RiskGraphViz() {
  const [hoverRisk, setHoverRisk] = useState(true);

  return (
    <div className="relative w-full">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-ice">Risk graph</div>
          <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
            See where one action would have landed
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Orchestrator → verdict ring → Postgres · mail · payments. Every edge is a system that would
            move if the action became real. Highlights show the blast envelope Veto resolves before wires
            run hot.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHoverRisk((v) => !v)}
          className="shrink-0 self-start rounded-full border border-border/70 bg-surface/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:border-ice/35 hover:text-ice"
        >
          {hoverRisk ? "Dim blast path" : "Highlight blast path"}
        </button>
      </div>

      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-border/60 bg-[#07090c]/92">
        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--ice) 28%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--ice) 22%, transparent) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <svg
          className="relative h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <filter id="glowLine" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map((e) => {
            const a = nodes.find((n) => n.id === e.from)!;
            const b = nodes.find((n) => n.id === e.to)!;
            const lit = hoverRisk && e.risky;
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={
                  lit
                    ? "color-mix(in oklab, var(--block) 75%, var(--warn))"
                    : "color-mix(in oklab, var(--foreground) 18%, transparent)"
                }
                strokeWidth={lit ? 0.55 : 0.28}
                strokeDasharray={lit ? "0" : "1.2 2"}
                filter={lit ? "url(#glowLine)" : undefined}
                className={lit ? "animate-pulse-dot" : ""}
              />
            );
          })}

          {nodes.map((n) => {
            const isVeto = n.kind === "veto";
            const isAgent = n.kind === "agent";
            return (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <circle
                  r={isVeto ? 6.2 : 4.8}
                  fill={
                    isVeto
                      ? "color-mix(in oklab, var(--ice) 25%, #0a0c10)"
                      : isAgent
                        ? "color-mix(in oklab, var(--signal) 22%, #0a0c10)"
                        : "#12161c"
                  }
                  stroke={
                    isVeto ? "var(--ice)" : isAgent ? "color-mix(in oklab, var(--signal) 65%, transparent)" : "color-mix(in oklab, var(--foreground) 28%, transparent)"
                  }
                  strokeWidth={0.45}
                />
                <text
                  y={isVeto ? 11 : 9.5}
                  textAnchor="middle"
                  fill="rgba(226, 232, 240, 0.55)"
                  style={{ fontSize: "2.4px", fontFamily: "var(--font-mono)" }}
                >
                  {n.short}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap justify-center gap-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/90 sm:justify-between">
          <span>
            <span className="text-block">●</span> High blast edges
          </span>
          <span>
            <span className="text-foreground/40">··</span> Normal dependencies
          </span>
        </div>
      </div>
    </div>
  );
}
