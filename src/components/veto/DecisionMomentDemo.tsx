import { useCallback, useEffect, useState } from "react";
import { Crosshair, Play, Radar, Skull } from "lucide-react";

type Phase = "idle" | "in_flight" | "intercepted" | "verdict";

const ACTION_RAW = `DELETE FROM users WHERE last_seen_at < NOW() - INTERVAL '400 days';`;
const INTENT_LABEL = '"clean dormant accounts"';

const UNDERSTOOD =
  "This removes 12,481 user rows — including 2,104 with active subscriptions and Stripe billing primitives. Postgres MVCC blocks concurrent reads briefly; cascading deletes propagate to audits and sessions. Estimated blast radius 8 systems.";

/** Signature “holy shit” narrative: lethal action intercepted mid-flight, consequence surfaced, verdict. */
export function DecisionMomentDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [run, setRun] = useState(0);

  const kick = useCallback(() => {
    setPhase("idle");
    setRun((r) => r + 1);
  }, []);

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("in_flight"), 400);
    const t2 = window.setTimeout(() => setPhase("intercepted"), 2200);
    const t3 = window.setTimeout(() => setPhase("verdict"), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [run]);

  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.1] bg-gradient-to-b from-[#0f1419]/95 via-[#0a0d11]/92 to-[#080a0e]/96 shadow-[0_0_120px_-30px_color-mix(in_oklab,var(--signal)_22%,transparent),inset_0_1px_0_0_color-mix(in_oklab,var(--ice)_14%,transparent)]">
      {/* Ambient scan */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_42%,white_48%,transparent_54%)] bg-[length:200%_100%] opacity-[0.04] animate-infra-pan-slow" />

      <div className="relative grid gap-0 lg:grid-cols-[1fr,min(460px,44%)] border-b border-border/50">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-block/55 bg-block/14 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-block">
              <Radar className="size-3.5" aria-hidden />
              Live interception
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/90">
              sub-50ms · pre-execution
            </span>
          </div>

          <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
            The moment an action either{" "}
            <span className="text-signal">exists</span> — or{" "}
            <span className="text-block">never does</span>.
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
            Not a filter on text. A semantic read on{" "}
            <span className="text-foreground/95">intent, consequence, and blast radius</span> before
            bytes hit your systems.
          </p>

          {/* Pipeline */}
          <div className="relative mt-10 min-h-[168px]">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="relative flex items-center justify-between gap-2 sm:gap-4">
              <NodePill label="Agent" sub="orchestrator" active={phase !== "idle"} />
              <div className="relative flex-1 min-h-[140px] min-w-0 flex items-center justify-center">
                <FlightBeam phase={phase} />
                <VetoGate phase={phase} />
              </div>
              <NodePill
                label="Postgres"
                sub="production"
                active={phase === "idle"}
                muted={phase !== "idle" && phase !== "verdict"}
              />
            </div>

            <div
              className={`mt-5 rounded-xl border px-4 py-3 font-mono text-[11px] leading-relaxed backdrop-blur-sm transition-all duration-700 sm:text-xs ${
                phase === "in_flight"
                  ? "border-warn/50 bg-warn/[0.08] text-foreground shadow-[0_0_48px_-12px_color-mix(in_oklab,var(--warn)_45%,transparent)]"
                  : phase === "intercepted" || phase === "verdict"
                    ? "border-ice/40 bg-ice/[0.06]"
                    : "border-border/60 bg-surface/50 text-muted-foreground"
              }`}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Raw action stream
              </span>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all text-foreground/95">
                {ACTION_RAW}
              </pre>
            </div>
          </div>

          <button
            type="button"
            onClick={kick}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/75 bg-surface/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-ice/40 hover:bg-surface hover:text-ice"
          >
            <Play className="size-3.5" aria-hidden />
            Replay interception
          </button>
        </div>

        {/* Decision column */}
        <div
          className={`relative border-t border-border/50 lg:border-l lg:border-t-0 bg-gradient-to-b from-surface/40 to-transparent transition-[opacity,transform] duration-700 ${
            phase === "verdict" ? "opacity-100" : "opacity-95"
          }`}
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent opacity-70" />

          <div className="p-6 sm:p-8 lg:p-10 lg:pt-12 space-y-6">
            {(phase === "intercepted" || phase === "verdict") && (
              <div className="animate-action-in space-y-5">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-warn/55 bg-warn/[0.12] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-warn">
                    Intent deviation
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Stated {INTENT_LABEL} · execution pattern matches mass deletion of{" "}
                    <span className="text-foreground">active</span> cohorts
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ice">
                    <Crosshair className="size-3.5" aria-hidden />
                    Understood consequence
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/92 sm:text-[0.9375rem]">
                    {UNDERSTOOD}
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-background/50 px-3 py-2.5 font-mono text-[11px] text-muted-foreground">
                  <span className="text-signal/90">Learning layer · </span>
                  Similar to <span className="text-foreground">37</span> previously blocked destructive
                  SQL patterns across orgs (avg human override 4.2%)
                </div>
              </div>
            )}

            {phase === "verdict" && (
              <div className="animate-action-in rounded-xl border-2 border-block/60 bg-gradient-to-br from-block/[0.18] via-block/[0.06] to-transparent p-5 shadow-[0_0_64px_-14px_color-mix(in_oklab,var(--block)_55%,transparent)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-block/55 bg-block/25">
                    <Skull className="size-6 text-block" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-block">
                      Verdict · Blocked
                    </div>
                    <div className="mt-2 text-xl font-bold tracking-tight text-foreground">
                      Action halted before execution
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-muted-foreground">
                      <span>
                        Risk score{" "}
                        <span className="tabular-nums text-block font-semibold text-base">94</span>
                        /100
                      </span>
                      <span>
                        Estimated rows{" "}
                        <span className="tabular-nums text-foreground">12,481</span>
                      </span>
                      <span className="text-warn">
                        Cascades predicted → billing, audits, IAM sessions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {phase === "idle" || phase === "in_flight" ? (
              <div className="rounded-xl border border-dashed border-border/70 bg-surface/30 p-8 text-center text-sm text-muted-foreground">
                {phase === "idle" ? "Initializing trace…" : "Packet inbound — interception armed…"}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <p className="px-6 py-4 text-center font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground/85 sm:px-10">
        This is not budget enforcement · not input filtering · not post-hoc logging
      </p>
    </div>
  );
}

function NodePill({
  label,
  sub,
  active,
  muted,
}: {
  label: string;
  sub: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`relative z-[2] w-[86px] shrink-0 rounded-lg border px-2.5 py-2 text-center transition-all duration-500 sm:w-[100px] ${
        muted
          ? "border-border/40 bg-surface/30 opacity-45"
          : active
            ? "border-signal/50 bg-signal/[0.1] shadow-[0_0_28px_-8px_color-mix(in_oklab,var(--signal)_40%,transparent)]"
            : "border-border/60 bg-surface/55"
      }`}
    >
      <div className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-[11px] font-semibold leading-tight mt-0.5">{sub}</div>
    </div>
  );
}

function VetoGate({ phase }: { phase: Phase }) {
  const armed = phase === "in_flight" || phase === "intercepted" || phase === "verdict";
  const flash = phase === "intercepted" || phase === "verdict";

  return (
    <div className="absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2">
      <div
        className={`relative flex h-[88px] w-[88px] items-center justify-center rounded-full border-2 transition-all duration-500 ${
          flash
            ? "border-ice bg-[#0c1218]/95 shadow-[0_0_48px_-6px_var(--ice),0_0_80px_-20px_color-mix(in_oklab,var(--block)_35%,transparent)] scale-105"
            : armed
              ? "border-signal/60 bg-surface-elevated/90 shadow-[0_0_36px_-8px_color-mix(in_oklab,var(--signal)_45%,transparent)]"
              : "border-border/60 bg-surface/80"
        }`}
      >
        {flash && (
          <span className="pointer-events-none absolute inset-0 rounded-full border border-ice/50 animate-scan-ring" />
        )}
        <div className="text-center">
          <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
            Veto
          </div>
          <div className="text-lg font-bold text-ice leading-none mt-1">⌖</div>
          <div className="mt-1 font-mono text-[9px] text-signal">semantic</div>
        </div>
      </div>
    </div>
  );
}

function FlightBeam({ phase }: { phase: Phase }) {
  return (
    <div className="relative h-3 w-full max-w-[min(100%,320px)] overflow-hidden rounded-full bg-surface-elevated/80 ring-1 ring-border/50">
      <div
        className={`absolute left-0 top-0 h-full w-[38%] rounded-full bg-gradient-to-r from-warn/20 via-warn to-block transition-[transform,opacity] duration-[1.7s] ease-out ${
          phase === "idle"
            ? "translate-x-[-120%] opacity-0"
            : phase === "in_flight"
              ? "translate-x-[165%] opacity-100"
              : "translate-x-[52%] opacity-100"
        }`}
        style={{
          boxShadow: "0 0 24px 2px color-mix(in oklab, var(--warn) 55%, transparent)",
        }}
      />
      {phase === "intercepted" || phase === "verdict" ? (
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-block shadow-[0_0_20px_color-mix(in_oklab,var(--block)_70%,transparent)] animate-pulse-dot" />
      ) : null}
    </div>
  );
}
