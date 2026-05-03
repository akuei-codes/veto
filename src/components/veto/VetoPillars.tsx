/** Spatial story blocks: simulation, differentiation vs “tools”, learning moat. */

const DEFINING_LINE =
  "Every AI action must pass through a decision layer before it becomes reality.";

export function DefiningLineStrip() {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.07] bg-surface/40 px-6 py-5 text-center sm:px-10">
      <p className="text-[0.95rem] font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
        {DEFINING_LINE}
      </p>
    </div>
  );
}

export { DEFINING_LINE };

export function DifferentiationMatrix() {
  const rows = [
    {
      label: "Budget runners",
      theirs: "Cap how often agents run",
      veto: "Stops irreversible commits before they touch your stack",
    },
    {
      label: "Guardrails",
      theirs: "Filter prompts and completions",
      veto: "Intercepts database queries, API calls, outbound mail, shell — at execution boundary",
    },
    {
      label: "Monitoring",
      theirs: "Agents run; dashboards explain wreckage afterward",
      veto: "Controls execution · nothing proceeds without verdict",
    },
  ];
  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-base font-semibold leading-relaxed text-foreground sm:text-lg">
        Veto does not monitor agents in the passive sense.{" "}
        <span className="text-ice">It controls whether their actions become real.</span>
      </p>
      <div className="rounded-2xl border border-border/55 bg-gradient-to-b from-surface/65 to-background/40 overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-border/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="p-6 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              They sell
            </div>
            <p className="mt-4 text-lg font-semibold tracking-tight text-muted-foreground">
              Knobs on top of execution
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-signal/[0.04] sm:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">Veto is</div>
            <p className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              The layer that answers one question:{" "}
              <span className="text-ice">should this action exist at all?</span>
            </p>
          </div>
        </div>
        <div className="border-t border-border/50">
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-1 gap-3 border-b border-border/40 px-6 py-5 last:border-b-0 sm:grid-cols-[minmax(0,0.95fr)_1fr_1fr] sm:items-center sm:gap-8 sm:px-10"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {r.label}
              </div>
              <div className="text-sm text-muted-foreground">{r.theirs}</div>
              <div className="text-sm font-medium text-foreground">{r.veto}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GhostExecutionPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-2xl border border-border/55 bg-[#090c10]/94 p-6 sm:p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ice">
          System state · pre-commit (simulated)
        </div>
        <ul className="mt-6 space-y-3 font-mono text-[13px] text-muted-foreground">
          <li>
            • <span className="text-foreground/85">users</span> rows · 892,041
          </li>
          <li>
            • active_subscribers · <span className="text-warn font-semibold">12,481</span> would match WHERE
          </li>
          <li>• billing_customers · CASCADE delete pending</li>
          <li>• audit_log hot partitions · concurrent writers</li>
        </ul>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-signal/35 bg-gradient-to-br from-signal/[0.08] to-transparent p-6 sm:p-8 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--signal)_22%,transparent)]">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
          What would have happened
        </div>
        <div className="mt-6 space-y-4 text-sm leading-relaxed">
          <p className="text-foreground font-medium">
            This query would have deleted <span className="tabular-nums text-block">12,481</span> user
            rows and cascaded{" "}
            <span className="tabular-nums font-semibold">218,942</span> dependents across Stripe mirror,
            email prefs, and IAM sessions.
          </p>
          <p className="text-muted-foreground">
            Billing artifacts for <span className="text-foreground/95">9,800+</span> invoices would hit an
            irreversible state · recovery commonly measured in multi-day outages, not rollback windows.
          </p>
          <div className="rounded-lg border border-warn/40 bg-warn/[0.08] px-3 py-2 font-mono text-[11px] text-warn">
            This envelope matches destructive SQL verdicts already in your org history
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActionIntelligenceStrip() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/45 p-8 sm:p-10">
      <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ice)_22%,transparent),transparent_68%)] blur-3xl" />
      <div className="relative max-w-4xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-ice">Action intelligence</div>
        <p className="mt-5 text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-[2.15rem]">
          Veto parses every proposed action, models what it does to live systems, and surfaces the exact
          blast before a byte commits.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-background/40 p-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Tool output
            </div>
            <p className="mt-3 font-mono text-sm text-muted-foreground line-through decoration-block/50">
              DELETE FROM users …
            </p>
          </div>
          <div className="rounded-xl border border-ice/35 bg-ice/[0.05] p-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ice">Verdict copy</div>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              “This would remove <span className="font-semibold text-block">12,481</span> live accounts
              with active billing — not dormant users. Halting before Postgres receives the statement.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MemoryMoatPanel() {
  return (
    <div className="rounded-2xl border border-border/55 bg-gradient-to-r from-surface/80 via-background/50 to-surface/80 p-8 sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-signal">Learning layer</div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Veto retains the institutional memory of what “almost happened”
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every halt, override, and near-miss sharpens the envelope for your stack. Small miss rates
            compound across multi-step workflows — Veto tracks the patterns that actually touch your
            production graph.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 font-mono text-[12px] text-muted-foreground">
          <div className="rounded-lg border border-border/60 bg-surface/60 px-4 py-3">
            <span className="text-signal">●</span> Envelope matches prior blocked destructive SQL
          </div>
          <div className="rounded-lg border border-warn/45 bg-warn/[0.07] px-4 py-3">
            <span className="text-warn">●</span> Same shape previously approved on human override
          </div>
        </div>
      </div>
    </div>
  );
}
