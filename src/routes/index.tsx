import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { LiveInterceptor } from "@/components/veto/LiveInterceptor";
import { IncidentsSection } from "@/components/veto/Incidents";
import { WaitlistForm } from "@/components/veto/WaitlistForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none mask-[linear-gradient(to_bottom,black_62%,transparent_100%)]" />

      {/* Layered ambience */}
      <div className="pointer-events-none absolute -top-[34%] left-1/2 h-[min(88vh,800px)] w-[min(128vw,1280px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ice)_26%,transparent),transparent_64%)] opacity-95 blur-[100px]" />
      <div className="pointer-events-none absolute top-[22%] -right-[20%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_32%,transparent),transparent_70%)] blur-3xl opacity-80" />
      <div className="pointer-events-none absolute bottom-[-12%] left-[-14%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_14%,transparent),transparent_68%)] blur-3xl opacity-65" />

      <div className="relative">
        <Header />
        <Hero />
        <IncidentsSection />
        <ProductSection />
        <TrustLine />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/68 backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <Logo />
          <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground/95">
            Veto
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/80 sm:inline">
            Firewall
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
    <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 sm:pb-20 sm:pt-32 lg:pb-28">
      <div className="relative z-[1] flex justify-center pb-10">
        <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-gradient-to-r from-card/92 via-background/76 to-background/92 px-4 py-1.5 text-xs shadow-[0_0_0_1px_color-mix(in_oklab,var(--ice)_18%,transparent)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono tracking-wide text-muted-foreground">
            Live runtime firewall · <span className="text-foreground/95">&lt;50ms</span> verdicts
          </span>
        </div>
      </div>

      <div className="relative z-[1] mx-auto max-w-[1100px] text-center">
        <h1 className="font-bold leading-[1.02] tracking-[-0.045em] text-5xl sm:text-7xl lg:text-[5.125rem]">
          The firewall{" "}
          <span className="sm:whitespace-nowrap">
            <br className="sm:hidden" />
            <span className="relative inline-flex flex-col items-center gap-3 sm:inline-flex sm:flex-row sm:items-end sm:gap-4">
              <span className="veto-heading-shimmer pb-1">for AI agents.</span>
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Observability tells you what went wrong.{" "}
          <span className="font-medium text-foreground">
            Veto stops it before the damage lands.
          </span>
        </p>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground/95">
          A precision layer between autonomous decisions and real infrastructure, intercepting tool
          calls, scoring irreversible blast radius, and blocking the ones that shouldn't execute.
        </p>
      </div>

      <div className="relative z-[1] mt-14" id="early-access">
        <WaitlistForm />
      </div>

      <div className="relative z-[1] mt-[5.5rem] sm:mt-28 lg:mt-32">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-3 rounded-[1.85rem] bg-gradient-to-b from-signal/[0.15] via-transparent to-ice/[0.08] blur-2xl opacity-90" />
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/18 via-transparent to-ice/[0.22]">
            <LiveInterceptor />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSection() {
  const dimensions = [
    "Destructiveness",
    "Blast radius",
    "Reversibility",
    "Behavioral deviation",
    "Chain coherence",
  ];

  const card =
    "relative overflow-hidden rounded-2xl border border-border/65 bg-gradient-to-br from-card/94 via-background/74 to-background/96 p-[1px] shadow-[0_42px_100px_-48px_color-mix(in_oklab,var(--signal)_52%,transparent)]";

  const cardInner = "h-full rounded-[calc(1rem-1px)] bg-surface/55 p-7 backdrop-blur-sm sm:p-8";

  return (
    <section className="border-t border-border/55">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="font-mono text-xs uppercase tracking-[0.35em] text-ice mb-8">
          Architecture
        </div>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-[3.125rem]">
          Intercept every tool call.
          <span className="text-muted-foreground">
            {" "}
            Decide before it's too  late.
          </span>
        </h2>

        <div className="mt-16 grid gap-6 lg:grid-cols-5">
          <div className={card + " lg:col-span-3"}>
            <div className={cardInner}>
              <div className="pointer-events-none absolute right-[-18%] top-[-32%] h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_38%,transparent),transparent_74%)] opacity-65 blur-3xl" />
              <div className="relative text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Risk scored across five dimensions
              </div>
              <ul className="relative mt-7 space-y-4">
                {dimensions.map((d, i) => (
                  <li key={d} className="flex items-center gap-5">
                    <span className="w-10 font-mono text-xs text-ice">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl font-semibold tracking-tight sm:text-[1.35rem]">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={card + " lg:col-span-2"}>
            <div className={cardInner}>
              <div className="pointer-events-none absolute -bottom-28 left-[-20%] h-52 w-[130%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ice)_26%,transparent),transparent_74%)] opacity-55 blur-[90px]" />
              <div className="relative text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Structured verdict
              </div>
              <div className="relative mt-7 space-y-3 font-mono text-sm">
                <VerdictRow tone="signal" label="ALLOW" desc="instant execution path" />
                <VerdictRow tone="warn" label="ESCALATE" desc="human-in-the-loop" />
                <VerdictRow tone="block" label="BLOCK" desc="immutable halt" />
              </div>
            </div>
          </div>

          <div className={card + " lg:col-span-5"}>
            <div className={cardInner + " sm:p-10"}>
              <div className="relative max-w-none">
                <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                  Risky executions surface as a distilled incident card with chain-of-thought
                  lineage, target systems, and blast radius deltas. Humans approve once; Veto
                  learns the pattern protects the rest.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Structured audit trails stay export-ready{" "}
                  <span className="font-semibold text-foreground">
                    without slowing shipping velocity.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VerdictRow({
  tone,
  label,
  desc,
}: {
  tone: "signal" | "warn" | "block";
  label: string;
  desc: string;
}) {
  const cls =
    tone === "signal"
      ? "border-signal/45 bg-gradient-to-br from-signal/[0.12] to-transparent text-signal"
      : tone === "warn"
        ? "border-warn/45 bg-gradient-to-br from-warn/[0.12] to-transparent text-warn"
        : "border-block/45 bg-gradient-to-br from-block/[0.12] to-transparent text-block";
  return (
    <div
      className={`flex flex-col gap-1 rounded-xl border px-4 py-3 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between ${cls}`}
    >
      <span className="font-semibold tracking-[0.2em]">{label}</span>
      <span className="text-xs text-muted-foreground">{desc}</span>
    </div>
  );
}

function TrustLine() {
  const frameworks = ["LangChain", "AutoGen", "CrewAI", "OpenAI Assistants"];
  return (
    <section className="relative border-y border-border/55 bg-surface/25">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--ice)_14%,transparent),transparent,color-mix(in_oklab,var(--signal)_13%,transparent))] opacity-[0.13]" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
        <div className="font-mono text-xs uppercase tracking-[0.34em] text-muted-foreground">
          Framework-agnostic
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
          Drop-in guards for whichever orchestration runtime you shipped last quarter. Pure HTTP
          edge; your agents stay exactly where they are.
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-border/45">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--signal)_26%,transparent),transparent_62%)]" />
      <div className="pointer-events-none absolute -bottom-[36%] left-1/2 h-[460px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ice)_38%,transparent),transparent_74%)] opacity-85 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
        <h2 className="text-4xl font-bold tracking-tight sm:text-[3.95rem] sm:leading-[1.04]">
          One autonomous slip
          <br />
          <span className="text-signal drop-shadow-[0_0_50px_color-mix(in_oklab,var(--signal)_48%,transparent)]">
            Away from outage.
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          We&apos;re onboarding design partners who want ruthless runtime guarantees without trading
          away agent velocity, say hello and we&apos;ll slot you intentionally.
        </p>
        <div className="mt-14">
          <a
            href="#early-access"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-transparent bg-gradient-to-r from-signal via-emerald-300 to-ice px-12 py-4 text-[0.9375rem] font-semibold uppercase tracking-[0.14em] text-signal-foreground shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--foreground)_24%,transparent),0_0_48px_-10px_color-mix(in_oklab,var(--signal)_58%,transparent)] transition-[transform,box-shadow] hover:scale-[1.03] hover:shadow-[0_0_60px_-6px_color-mix(in_oklab,var(--signal)_68%,transparent)] active:scale-[0.985]"
          >
            <span className="relative z-[1]">Join the firewall waitlist</span>
            <span className="absolute inset-x-[-40%] h-full skew-x-12 bg-gradient-to-r from-transparent via-white/22 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </a>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/90">
            Direct line to founders · No automated nurture noise
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
        <Link to="/" className="group flex items-center gap-2.5">
          <Logo />
          <span className="font-semibold text-foreground transition-colors group-hover:text-foreground/90">
            Veto
          </span>
          <span className="font-mono text-xs">production AI runtime shield</span>
        </Link>
        <span className="font-mono text-[11px] tracking-wide">
          © {new Date().getFullYear()} Veto
        </span>
      </div>
    </footer>
  );
}
