export function ArchitectureDiagram() {
  return (
    <div className="w-full rounded-xl border bg-surface/60 backdrop-blur-sm p-6 sm:p-10 font-mono text-sm">
      {/* WITHOUT */}
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Without Veto
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Node label="Agent Brain" />
          <Arrow label="decision" />
          <Node label="Production DB" tone="danger" />
          <span className="text-block text-xl ml-1">💥</span>
        </div>
      </div>

      <div className="my-8 h-px bg-border" />

      {/* WITH */}
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-signal mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
          With Veto
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Node label="Agent Brain" />
          <Arrow label="decision" />
          <Node label="VETO" tone="signal" emphasized />
          <div className="flex flex-col gap-2 ml-1">
            <Verdict icon="✅" tone="signal" label="ALLOW" target="Production DB" />
            <Verdict icon="⚠️" tone="warn" label="ESCALATE" target="Human Review" />
            <Verdict icon="🚫" tone="block" label="BLOCK" target="Stopped permanently" />
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground">Three lines of code. Fully instrumented.</span>
        <span className="text-signal">&lt; 50ms overhead</span>
      </div>
    </div>
  );
}

function Node({
  label,
  tone = "default",
  emphasized = false,
}: {
  label: string;
  tone?: "default" | "signal" | "danger";
  emphasized?: boolean;
}) {
  const toneClass =
    tone === "signal"
      ? "border-signal text-signal glow-signal bg-surface-elevated"
      : tone === "danger"
        ? "border-block/50 text-foreground bg-surface-elevated"
        : "border-border text-foreground bg-surface-elevated";

  return (
    <div
      className={`px-3.5 py-2 rounded-md border ${toneClass} ${
        emphasized ? "tracking-[0.25em] font-semibold" : ""
      }`}
    >
      {label}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center text-muted-foreground">
      {label && <span className="text-[10px] mb-1 uppercase tracking-wider">{label}</span>}
      <svg width="44" height="10" viewBox="0 0 44 10" fill="none" aria-hidden>
        <path
          d="M0 5 H38"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          className="animate-flow"
        />
        <path d="M36 1 L42 5 L36 9" stroke="currentColor" strokeWidth="1.25" fill="none" />
      </svg>
    </div>
  );
}

function Verdict({
  icon,
  tone,
  label,
  target,
}: {
  icon: string;
  tone: "signal" | "warn" | "block";
  label: string;
  target: string;
}) {
  const toneClass =
    tone === "signal"
      ? "text-signal border-signal/40"
      : tone === "warn"
        ? "text-warn border-warn/40"
        : "text-block border-block/40";

  return (
    <div className={`flex items-center gap-2 text-xs border-l-2 pl-3 ${toneClass}`}>
      <span>{icon}</span>
      <span className="font-semibold tracking-wider">{label}</span>
      <span className="text-muted-foreground">→ {target}</span>
    </div>
  );
}
