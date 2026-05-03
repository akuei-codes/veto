/** Spatial story blocks: simulation, differentiation vs “tools”, learning moat. */

export function DifferentiationMatrix() {
  const rows = [
    {
      label: "Budget runners",
      theirs: "Throttle how much runs",
      veto: "Whether the run should exist at all",
    },
    {
      label: "Guardrails",
      theirs: "Filter inputs & outputs",
      veto: "Model consequence of real actions on real systems",
    },
    {
      label: "Observability",
      theirs: "Explain what already happened",
      veto: "Ghost the future state, then intercept",
    },
  ];
  return (
    <div className="rounded-2xl border border-border/55 bg-gradient-to-b from-surface/65 to-background/40 overflow-hidden">
      <div className="grid grid-cols-1 divide-y divide-border/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="p-6 sm:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">They sell</div>
          <p className="mt-4 text-lg font-semibold tracking-tight text-muted-foreground">
            Control surfaces for agents
          </p>
        </div>
        <div className="p-6 sm:p-8 bg-signal/[0.04] sm:col-span-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">Veto is</div>
          <p className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Real-time semantic infrastructure —
            <span className="text-ice"> a decision substrate</span>, not a feature toggle.
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
  );
}

export function GhostExecutionPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-2xl border border-border/55 bg-[#090c10]/94 p-6 sm:p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ice">Ghost execution · before</div>
        <ul className="mt-6 space-y-3 font-mono text-[13px] text-muted-foreground">
          <li>
            • <span className="text-foreground/85">users</span> rows · 892,041
          </li>
          <li>
            • active_subscribers · <span className="text-warn font-semibold">12,481</span> matching filter
          </li>
          <li>• FK: billing_customers CASCADE pending</li>
          <li>• audit_log partitions · hot write path</li>
        </ul>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-signal/35 bg-gradient-to-br from-signal/[0.08] to-transparent p-6 sm:p-8 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--signal)_22%,transparent)]">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
          Predicted consequence · after
        </div>
        <div className="mt-6 space-y-4 text-sm leading-relaxed">
          <p className="text-foreground">
            Cascade removes <span className="font-semibold tabular-nums text-block">218,942</span> dependent
            records across Stripe mirror, SES prefs, IAM session store.
          </p>
          <p className="text-muted-foreground">
            Recovery window estimates <span className="text-warn font-medium">≈72h</span> with manual
            billing reconciliation · <span className="text-foreground/95">Irreversible for 9.8k invoices</span>
            in-flight.
          </p>
          <div className="rounded-lg border border-warn/40 bg-warn/[0.08] px-3 py-2 font-mono text-[11px] text-warn">
            historical: same pattern failed human review 4× in last 90d
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
          Every action is parsed, understood, and{" "}
          <span className="text-ice">simulated</span> — not pattern-matched away.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-background/40 p-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Instead of
            </div>
            <p className="mt-3 font-mono text-sm text-muted-foreground line-through decoration-block/50">
              DELETE FROM users
            </p>
          </div>
          <div className="rounded-xl border border-ice/35 bg-ice/[0.05] p-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ice">You see</div>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              “Removes <span className="font-semibold text-block">12,481</span> live accounts with billing
              entanglement — violates stated intent to prune dormants only.”
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
            The memory of safe vs unsafe actions across your stack
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Veto compounds: every verdict, override, and near-miss trains a shared model of what
            “almost happened” means for <span className="text-foreground">your</span> systems — not generic
            internet scale noise.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 font-mono text-[12px] text-muted-foreground">
          <div className="rounded-lg border border-border/60 bg-surface/60 px-4 py-3">
            <span className="text-signal">●</span> Similar to 37 blocked destructive SQL patterns
          </div>
          <div className="rounded-lg border border-warn/45 bg-warn/[0.07] px-4 py-3">
            <span className="text-warn">●</span> Previously approved under human override (policy #4)
          </div>
        </div>
      </div>
    </div>
  );
}
