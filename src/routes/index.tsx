import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { DecisionMomentDemo } from "@/components/veto/DecisionMomentDemo";
import { LiveInterceptor } from "@/components/veto/LiveInterceptor";
import { IncidentsSection } from "@/components/veto/Incidents";
import { RiskGraphViz } from "@/components/veto/RiskGraphViz";
import {
  ActionIntelligenceStrip,
  DifferentiationMatrix,
  GhostExecutionPreview,
  MemoryMoatPanel,
} from "@/components/veto/VetoPillars";
import { WaitlistForm } from "@/components/veto/WaitlistForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none mask-[linear-gradient(to_bottom,black_58%,transparent_100%)]" />

      <AmbientPacketField />

      {/* Layered ambience */}
      <div className="pointer-events-none absolute -top-[34%] left-1/2 h-[min(88vh,800px)] w-[min(128vw,1280px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ice)_22%,transparent),transparent_64%)] opacity-90 blur-[100px]" />
      <div className="pointer-events-none absolute top-[22%] -right-[20%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_28%,transparent),transparent_70%)] blur-3xl opacity-75" />
      <div className="pointer-events-none absolute bottom-[-12%] left-[-14%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_12%,transparent),transparent_68%)] blur-3xl opacity-55" />

      <div className="relative">
        <Header />
        <Hero />
        <section className="relative mx-auto max-w-6xl px-6 pb-6 sm:pb-10" id="moment">
          <DecisionMomentDemo />
        </section>
        <IncidentsSection />
        <SimulationAndIntelligenceSection />
        <RiskGraphSection />
        <DifferentiationSection />
        <MemoryMoatSection />
        <AmbientInterceptorSection />
        <EnginesSection />
        <TrustLine />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}

/** Subtle vertical “packet” motion — always-on infrastructure feel. */
function AmbientPacketField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.55]" aria-hidden>
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 h-4 w-px animate-packet-rise rounded-full bg-gradient-to-t from-transparent via-signal/40 to-transparent"
          style={{
            left: `${4 + (i * 4.3) % 92}%`,
            animationDelay: `${i * 0.62}s`,
            animationDuration: `${12 + (i % 5) * 2.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/72 backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <Logo />
          <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground/95">
            Veto
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/80 sm:inline">
            Decision layer
          </span>
        </Link>
        <a
          href="#early-access"
          className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface/50 px-3.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-ice/35 hover:bg-surface hover:text-ice"
        >
          early access
          <ArrowUpRight
            className="size-3.5 opacity-75 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
            aria-hidden
          />
        </a>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-signal/45 bg-gradient-to-br from-signal/[0.22] via-signal/[0.08] to-transparent shadow-[0_0_24px_-4px_color-mix(in_oklab,var(--signal)_55%,transparent)]">
      <span className="font-mono text-sm font-bold text-signal">V</span>
      <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-45" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-ice ring-2 ring-background shadow-[0_0_12px_color-mix(in_oklab,var(--ice)_85%,transparent)]" />
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-12 pt-20 sm:pb-16 sm:pt-28 lg:pb-20">
      <div className="relative z-[1] flex justify-center pb-10">
        <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-gradient-to-r from-card/92 via-background/76 to-background/92 px-4 py-1.5 text-xs shadow-[0_0_0_1px_color-mix(in_oklab,var(--ice)_18%,transparent)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono tracking-wide text-muted-foreground">
            Semantic interception ·{" "}
            <span className="text-foreground/95">&lt;50ms</span> verdict plane
          </span>
        </div>
      </div>

      <div className="relative z-[1] mx-auto max-w-[1180px] text-center">
        <h1 className="font-bold leading-[1.02] tracking-[-0.045em] text-5xl sm:text-7xl lg:text-[5.125rem]">
          Decide{" "}
          <span className="veto-heading-shimmer pb-1">whether an AI action exists</span>
          <br className="hidden sm:block" />
          <span className="text-muted-foreground sm:whitespace-nowrap">before it touches your systems.</span>
        </h1>

        <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Veto is the{" "}
          <span className="font-medium text-foreground">real-time semantic decision engine</span> that
          reads intent, simulates downstream consequence, and blocks execution when the blast radius does
          not belong in production.
        </p>

        <p className="mx-auto mt-6 max-w-2xl border-y border-white/[0.06] py-6 text-[0.95rem] leading-relaxed text-muted-foreground/95">
          Infrastructure, not tooling.{" "}
          <span className="text-foreground">
            Not budget caps. Not brittle filters after the thought.{" "}
          </span>
          Pre-execution understanding of what{' '}
          <span className="italic text-ice/95">would</span> happen — wired into the action path itself.
        </p>
      </div>

      <div className="relative z-[1] mt-14" id="early-access">
        <WaitlistForm />
      </div>

      <p className="relative z-[1] mx-auto mt-10 max-w-lg text-center font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground/85">
        <a href="#moment" className="text-ice/90 underline-offset-4 hover:underline">
          See the interception
        </a>{" "}
        · deterministic halt · lineage export
      </p>
    </section>
  );
}

function SimulationAndIntelligenceSection() {
  return (
    <section className="border-t border-border/55 bg-surface/[0.12]">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.35em] text-ice mb-6">
            Simulation layer
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-[3.125rem]">
            Predictive substrate.
            <span className="text-muted-foreground"> Not reactive dashboarding.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Ghost system state deltas, divergence from stated intent, and historical parallels — then sit
            in the narrow window between autonomous proposal and immutable execution.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          <ActionIntelligenceStrip />
          <GhostExecutionPreview />
        </div>
      </div>
    </section>
  );
}

function RiskGraphSection() {
  return (
    <section className="border-t border-border/55">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <RiskGraphViz />
      </div>
    </section>
  );
}

function DifferentiationSection() {
  return (
    <section className="border-t border-border/55 bg-surface/[0.08]">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.85rem]">
            No confusion with controllers that only ration work.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Agents need an inevitable layer that answers a different question:{" "}
            <span className="text-foreground font-medium">
              should this action be allowed to exist at all?
            </span>
          </p>
        </div>
        <DifferentiationMatrix />
      </div>
    </section>
  );
}

function MemoryMoatSection() {
  return (
    <section className="border-t border-border/55">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <MemoryMoatPanel />
      </div>
    </section>
  );
}

function AmbientInterceptorSection() {
  return (
    <section className="border-t border-border/55">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="max-w-3xl mb-14">
          <div className="font-mono text-xs uppercase tracking-[0.34em] text-signal mb-5">
            Always-on plane
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Watching the seams where agents touch reality.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Thousands of microscopic decisions per hour — surfaced as ambient traffic across your stack.
            The goal is parity with how packet switches feel invisible until they aren’t.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-3 rounded-[1.85rem] bg-gradient-to-b from-signal/[0.14] via-transparent to-ice/[0.08] blur-2xl opacity-85" />
          <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.14] via-transparent to-ice/[0.22] p-px">
            <LiveInterceptor />
          </div>
        </div>
      </div>
    </section>
  );
}

function EnginesSection() {
  const axes = [
    {
      title: "Consequence depth",
      body: "What breaks, forks, bills, or erases if this succeeds verbatim.",
    },
    {
      title: "Historical twins",
      body: "Match against corpus of verdicts across orgs — not generic internet priors.",
    },
    {
      title: "Intent coherence",
      body: "Stated operator goal versus observed execution morphology.",
    },
    {
      title: "Irreversibility horizon",
      body: "Time-to-recover envelopes with dependency graph amplification.",
    },
    {
      title: "Propagated blast",
      body: "Multi-hop causal edges through DB, payouts, egress, IAM, telemetry.",
    },
  ];

  return (
    <section className="border-t border-border/55 bg-surface/[0.1]">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="font-mono text-xs uppercase tracking-[0.34em] text-ice mb-6">Engines</div>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-[3.125rem]">
          Everything routes through verdict before commit.
        </h2>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {axes.map((a, i) => (
            <li
              key={a.title}
              className="group relative rounded-2xl border border-border/60 bg-gradient-to-b from-card/90 to-background/80 p-6 shadow-[0_42px_100px_-58px_color-mix(in_oklab,var(--signal)_38%,transparent)] transition-colors hover:border-ice/30"
            >
              <span className="font-mono text-[10px] text-ice/85 tabular-nums">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <div className="mt-4 text-lg font-semibold tracking-tight">{a.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrustLine() {
  const frameworks = ["LangChain", "AutoGen", "CrewAI", "OpenAI Assistants"];
  return (
    <section className="relative border-y border-border/55 bg-surface/25">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--ice)_14%,transparent),transparent,color-mix(in_oklab,var(--signal)_13%,transparent))] opacity-[0.13]" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
        <div className="font-mono text-xs uppercase tracking-[0.34em] text-muted-foreground">
          Drops into any orchestration substrate
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {frameworks.map((f) => (
            <span
              key={f}
              className="bg-gradient-to-b from-foreground/95 to-muted-foreground bg-clip-text text-xl font-semibold text-transparent hover:from-white hover:to-foreground/82 sm:text-2xl"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-9 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          HTTP-native decision plane · your autonomy graph stays untouched · wire once, inherit cross-runtime
          protection.
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-border/45">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--signal)_22%,transparent),transparent_62%)]" />
      <div className="pointer-events-none absolute -bottom-[36%] left-1/2 h-[460px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ice)_34%,transparent),transparent_74%)] opacity-80 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
        <h2 className="text-4xl font-bold tracking-tight sm:text-[3.75rem] sm:leading-[1.05]">
          How teams ship agents{" "}
          <span className="text-muted-foreground">without</span>
          <br />
          this layer is shrinking.
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          We onboard design partners deliberately — runtime guarantees without trading away velocity. If your
          production agents execute anything irreversible, you already know why this belongs in the substrate.
        </p>
        <div className="mt-14">
          <a
            href="#early-access"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-transparent bg-gradient-to-r from-signal via-emerald-300 to-ice px-11 py-4 text-[0.9375rem] font-semibold uppercase tracking-[0.14em] text-signal-foreground shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--foreground)_24%,transparent),0_0_48px_-10px_color-mix(in_oklab,var(--signal)_58%,transparent)] transition-[transform,box-shadow] hover:scale-[1.03] hover:shadow-[0_0_60px_-6px_color-mix(in_oklab,var(--signal)_68%,transparent)] active:scale-[0.985]"
          >
            <span className="relative z-[1]">Request foundational access</span>
            <span className="absolute inset-x-[-40%] h-full skew-x-12 bg-gradient-to-r from-transparent via-white/22 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </a>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/90">
            Direct founders · prioritized queue
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-11 text-sm text-muted-foreground sm:flex-row">
        <Link to="/" className="group flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
          <Logo />
          <span className="font-semibold text-foreground transition-colors group-hover:text-foreground/90">
            Veto
          </span>
          <span className="font-mono text-xs text-center sm:text-start">
            Semantic decision substrate for autonomous execution
          </span>
        </Link>
        <span className="font-mono text-[11px] tracking-wide">© {new Date().getFullYear()} veto.ink</span>
      </div>
    </footer>
  );
}
