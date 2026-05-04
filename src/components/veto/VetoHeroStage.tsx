import { Cpu, Database, Globe, Mail, Terminal } from "lucide-react";

import { WaitlistForm } from "@/components/veto/WaitlistForm";
import { FOUNDERS_EMAIL, foundersMailto } from "@/constants/contact";

/** First fold: visual execution plane + structured tiles + HUD readout (copy preserved, not wall-of-text). */
export function VetoHeroStage() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-24 lg:pb-20">
      <div className="relative z-[1] mb-10 flex justify-center sm:justify-start">
        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-border/80 bg-gradient-to-r from-card/92 via-background/76 to-background/92 px-4 py-1.5 text-xs shadow-[0_0_0_1px_color-mix(in_oklab,var(--ice)_18%,transparent)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono tracking-wide text-muted-foreground">
            Live execution control · <span className="text-foreground/95">&lt;50ms</span> per envelope
          </span>
        </div>
      </div>

      <div className="relative z-[1] grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-16">
        <div className="min-w-0">
          <h1 className="font-bold leading-[1.05] tracking-[-0.04em] text-4xl sm:text-6xl lg:text-[4.25rem]">
            <span className="veto-heading-shimmer">Production agents already issue</span>
            <span className="mt-2 block text-2xl font-semibold tracking-tight text-muted-foreground sm:text-3xl lg:text-[2.35rem]">
              database deletes, payouts, outbound mail · ungated.
            </span>
          </h1>

          <div className="relative mt-8 overflow-hidden rounded-xl border border-ice/25 bg-[#06080c]/80 py-4 pl-5 pr-4 font-mono text-[11px] leading-relaxed text-ice/90 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--ice)_12%,transparent),0_0_40px_-12px_color-mix(in_oklab,var(--ice)_22%,transparent)] sm:text-xs">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,color-mix(in_oklab,var(--ice)_6%,transparent)_50%)] bg-[length:100%_4px] opacity-30" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Invariant</span>
            <p className="relative mt-2 text-[0.8125rem] font-medium tracking-tight text-foreground sm:text-sm">
              Every AI action must pass through a decision layer before it becomes reality.
            </p>
          </div>

          <p className="mt-8 text-base font-medium leading-relaxed text-foreground sm:text-lg">
            <span className="text-signal">Veto sits between every agent and every action.</span> It intercepts
            every database query, API call, shell invocation, and outbound message while it is still in
            flight.
          </p>
        </div>

        <HeroExecutionCanvas />
      </div>

      <HeroInterceptionBento />

      <HeroReadoutDeck />

      <div className="relative z-[1] mt-14" id="early-access">
        <WaitlistForm />
      </div>

      <p className="relative z-[1] mx-auto mt-10 max-w-xl text-center font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground/85">
        <a href="#moment" className="text-ice/90 underline-offset-4 hover:underline">
          Watch SQL halted mid-flight
        </a>{" "}
        · continuous evaluation · no silent bypass
        <span className="mt-3 block normal-case tracking-normal text-muted-foreground/90">
          <a href={foundersMailto} className="text-ice/90 underline-offset-4 hover:underline">
            {FOUNDERS_EMAIL}
          </a>{" "}
          — founders inbox
        </span>
      </p>
    </section>
  );
}

function HeroInterceptionBento() {
  const tiles = [
    {
      icon: Database,
      label: "SQL / ORM",
      sub: "writes & destructive DDL",
      tone: "from-block/20 to-transparent border-block/35 text-block",
    },
    {
      icon: Globe,
      label: "HTTP / gRPC",
      sub: "payments · IAM · internal APIs",
      tone: "from-warn/15 to-transparent border-warn/35 text-warn",
    },
    {
      icon: Terminal,
      label: "Shell / runner",
      sub: "CI agents · remote exec",
      tone: "from-ice/12 to-transparent border-ice/35 text-ice",
    },
    {
      icon: Mail,
      label: "SES / SMTP",
      sub: "customer-wide blast risk",
      tone: "from-signal/15 to-transparent border-signal/40 text-signal",
    },
  ];
  return (
    <div className="relative z-[1] mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-14">
      {tiles.map((t) => (
        <div
          key={t.label}
          className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:-translate-y-0.5 ${t.tone}`}
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/[0.04] blur-2xl transition-opacity group-hover:opacity-100" />
          <t.icon className="relative size-5 opacity-90" strokeWidth={1.75} aria-hidden />
          <div className="relative mt-3 font-mono text-[11px] font-semibold uppercase tracking-wider">{t.label}</div>
          <div className="relative mt-1 text-[11px] leading-snug text-muted-foreground">{t.sub}</div>
        </div>
      ))}
    </div>
  );
}

function HeroReadoutDeck() {
  return (
    <div className="relative z-[1] mt-10 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
      <div className="flex flex-wrap items-start gap-3 rounded-2xl border border-white/[0.07] bg-surface/40 p-5 backdrop-blur-sm">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-signal/40 bg-signal/10">
          <Cpu className="size-7 text-signal" strokeWidth={1.35} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Timing · consequence
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Under <span className="font-semibold text-ice">50ms</span>, Veto models what would happen if the
            action became real, then <span className="text-signal">allows</span>,{" "}
            <span className="text-warn">escalates</span>, or{" "}
            <span className="text-block font-medium">hard-stops</span> the commit.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/55 bg-[#07090d]/75 p-5 shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--foreground)_6%,transparent)]">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-block animate-pulse-dot" />
          Production posture
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Mandatory infrastructure · not optional tooling.</span>{" "}
          If an action never passes the decision layer, it never touches production.
        </p>
        <p className="mt-3 border-l-2 border-block/55 pl-4 text-xs leading-relaxed text-muted-foreground">
          Logs don&apos;t rewind deleted rows · guardrails don&apos;t undelete Stripe objects · budgets
          don&apos;t resurrect dropped tables.
        </p>
      </div>
    </div>
  );
}

function HeroExecutionCanvas() {
  return (
    <div
      className="relative isolate w-full overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-br from-[#0a1018] via-[#060910] to-[#040508] shadow-[0_0_80px_-20px_color-mix(in_oklab,var(--signal)_35%,transparent),inset_0_1px_0_0_color-mix(in_oklab,var(--ice)_14%,transparent)]"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] hero-grid-mini" />

      {/* Rotating veto core */}
      <div className="absolute left-[46%] top-1/2 z-20 flex h-[5.75rem] w-[5.75rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-[7rem] sm:w-[7rem]">
        <div className="absolute inset-0 animate-veto-core-spin rounded-full blur-sm opacity-80 [background:conic-gradient(from_0deg,var(--ice),transparent_40%,var(--signal),transparent_70%,var(--block),transparent)]" />
        <div className="relative flex h-[84%] w-[84%] flex-col items-center justify-center rounded-full border border-white/15 bg-[#070b10]/98 shadow-[0_0_44px_-8px_var(--ice)] backdrop-blur-sm">
          <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-muted-foreground">Veto</span>
          <span className="text-xl font-bold text-ice tabular-nums sm:text-2xl">⌖</span>
          <span className="mt-0.5 font-mono text-[9px] text-signal">&lt;50ms</span>
        </div>
      </div>

      <HeroHudOverlay />

      <svg
        className="relative z-10 w-full translate-y-[2%]"
        viewBox="0 0 520 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hvFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--signal), transparent)" />
            <stop offset="45%" stopColor="var(--ice)" />
            <stop offset="100%" stopColor="color-mix(in oklab, var(--signal), transparent)" />
          </linearGradient>
          <radialGradient id="hvGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--ice), transparent)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="hvBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Agent pillar */}
        <rect
          x="24"
          y="118"
          width="76"
          height="64"
          rx="12"
          className="fill-surface stroke-signal/40"
          strokeWidth="1"
        />
        <text x="62" y="148" textAnchor="middle" className="fill-muted-foreground font-mono text-[9px]" style={{ letterSpacing: "0.28em" }}>
          AGNT
        </text>
        <text x="62" y="168" textAnchor="middle" className="fill-foreground font-mono text-[11px]" style={{ fontWeight: 700 }}>
          ORCH
        </text>

        {/* Converging lanes */}
        {[
          { d: "M 112 138 C 175 138, 205 148, 240 154", dash: "4 8" },
          { d: "M 112 162 C 180 164, 210 154, 240 154", dash: "3 10" },
          { d: "M 112 174 C 185 180, 218 164, 240 154", dash: "5 9" },
        ].map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke="url(#hvFlow)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeDasharray={p.dash}
            className="animate-hero-path-flow opacity-85"
          />
        ))}

        {/* Exit rays to production */}
        {[58, 78, 98].map((y, i) => (
          <path
            key={`out-${i}`}
            d={`M 310 154 C 352 ${130 + i * 12}, 380 ${120 + i * 16}, ${410 + i * 6} ${95 + i * 28}`}
            stroke={
              i === 0 ? "color-mix(in oklab, var(--block) 72%, transparent)" : "color-mix(in oklab, var(--foreground) 28%, transparent)"
            }
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray={i === 0 ? "2 10" : "4 14"}
            className={i === 0 ? "animate-hero-path-flow" : "opacity-50"}
          />
        ))}

        {/* Target docks */}
        {[
          { x: 416, y: 52, lab: "DB", c: "var(--block)" },
          { x: 446, y: 118, lab: "API", c: "color-mix(in oklab, var(--warn) 72%, transparent)" },
          { x: 442, y: 186, lab: "$$", c: "color-mix(in oklab, var(--signal) 62%, transparent)" },
          { x: 396, y: 232, lab: "SES", c: "color-mix(in oklab, var(--ice) 55%, transparent)" },
        ].map((t) => (
          <g key={t.lab}>
            <circle cx={t.x} cy={t.y} r="18" fill="#0c1016" stroke={t.c} strokeWidth="1.2" opacity="0.95" />
            <text
              x={t.x}
              y={t.y + 4}
              textAnchor="middle"
              style={{ fill: "rgba(248,250,252,0.88)", fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700 }}
            >
              {t.lab}
            </text>
          </g>
        ))}

        <circle cx="240" cy="154" r="32" fill="url(#hvGlow)" filter="url(#hvBlur)" className="opacity-70" />
      </svg>
    </div>
  );
}

function HeroHudOverlay() {
  return (
    <>
      <div className="absolute bottom-4 left-4 z-30 max-w-[46%] rounded-lg border border-white/10 bg-black/58 px-3 py-2 font-mono text-[9px] leading-relaxed text-signal backdrop-blur-sm sm:bottom-5 sm:left-5 sm:max-w-none sm:text-[10px]">
        <div className="text-muted-foreground">exec.envelope</div>
        <div className="mt-1 text-[10px] text-foreground sm:text-[11px]">
          verdict:<span className="mx-1 text-warn animate-pulse-dot">EVAL</span>→
          <span className="text-block"> STOP</span>
        </div>
      </div>
      <div className="absolute right-4 top-4 z-30 rounded border border-ice/20 bg-black/55 px-2.5 py-1 font-mono text-[9px] text-ice/90 backdrop-blur-sm tabular-nums sm:right-5 sm:text-[10px]">
        LATENCY_GATE · 41ms
      </div>
    </>
  );
}
