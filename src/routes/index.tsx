import { createFileRoute } from "@tanstack/react-router";
import { LiveInterceptor } from "@/components/veto/LiveInterceptor";
import { IncidentsSection } from "@/components/veto/Incidents";
import { SignupForm } from "@/components/veto/SignupForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* subtle grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

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
    <header className="border-b border-border/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-semibold tracking-tight text-lg">Veto</span>
        </a>
        <a
          href="#early-access"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
        >
          early access →
        </a>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative h-7 w-7 rounded-md bg-signal/10 border border-signal/40 flex items-center justify-center">
      <span className="text-signal font-mono text-xs font-bold">V</span>
      <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
    </div>
  );
}

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-mono text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
          Runtime defense for production AI agents
        </div>
      </div>

      <h1 className="text-center text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02]">
        The firewall <br className="sm:hidden" />
        <span className="text-signal">for AI agents.</span>
      </h1>

      <p className="mt-8 text-center text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Observability tells you what went wrong.{" "}
        <span className="text-foreground font-medium">Veto stops it from happening.</span>
      </p>

      <p className="mt-6 text-center text-base text-muted-foreground/90 max-w-2xl mx-auto">
        Veto sits between every AI agent decision and every real-world action — intercepting,
        scoring, and blocking risky behavior <span className="text-foreground italic">before</span>{" "}
        it executes.
      </p>

      <div className="mt-12" id="early-access">
        <SignupForm />
      </div>

      <div className="mt-20">
        <LiveInterceptor />
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

  return (
    <section className="border-t border-border/60">
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-signal mb-6">
          How it works
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
          Intercept every tool call.{" "}
          <span className="text-muted-foreground">Decide in under 50ms.</span>
        </h2>

        <div className="mt-14 grid lg:grid-cols-5 gap-6">
          {/* Risk dimensions */}
          <div className="lg:col-span-3 rounded-xl border bg-surface/60 p-7">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-5">
              Risk scored across 5 dimensions
            </div>
            <ul className="space-y-3">
              {dimensions.map((d, i) => (
                <li key={d} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground w-6">
                    0{i + 1}
                  </span>
                  <span className="text-lg font-medium">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verdicts */}
          <div className="lg:col-span-2 rounded-xl border bg-surface/60 p-7">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-5">
              Verdict returned
            </div>
            <div className="space-y-3 font-mono text-sm">
              <VerdictRow tone="signal" label="ALLOW" desc="executes immediately" />
              <VerdictRow tone="warn" label="ESCALATE" desc="Slack alert, one-tap approval" />
              <VerdictRow tone="block" label="BLOCK" desc="stopped permanently" />
            </div>
          </div>

          {/* Long-form */}
          <div className="lg:col-span-5 rounded-xl border bg-surface/60 p-7 sm:p-10">
            <p className="text-lg leading-relaxed text-foreground/90">
              Risky actions trigger an instant Slack alert with full context. Your engineer approves
              or rejects in one tap. Everything is recorded in a tamper-proof audit log,{" "}
              <span className="text-foreground font-medium">
                compliance-ready for the EU AI Act
              </span>
              .
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Your agents keep moving.{" "}
              <span className="text-foreground">Nothing dangerous gets through.</span>
            </p>
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
      ? "text-signal border-signal/40 bg-signal/5"
      : tone === "warn"
        ? "text-warn border-warn/40 bg-warn/5"
        : "text-block border-block/40 bg-block/5";
  return (
    <div className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2.5 ${cls}`}>
      <span className="font-semibold tracking-wider">{label}</span>
      <span className="text-muted-foreground text-xs">{desc}</span>
    </div>
  );
}

function TrustLine() {
  const frameworks = ["LangChain", "AutoGen", "CrewAI", "OpenAI Assistants"];
  return (
    <section className="border-t border-border/60 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
          Framework-agnostic
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-6">
          {frameworks.map((f) => (
            <span
              key={f}
              className="text-lg sm:text-xl font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Built for the agent stack you already run.{" "}
          <span className="text-foreground">No rearchitecting required.</span>
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="border-t border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--signal)_18%,transparent),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 py-28 sm:py-36 text-center">
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
          One bad decision <br />
          <span className="text-signal">away from production.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Get early access. We onboard personally — a real conversation about your stack, no
          automated drip sequences.
        </p>
        <div className="mt-10">
          <SignupForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold text-foreground">Veto</span>
          <span className="font-mono text-xs">— the firewall for AI agents</span>
        </div>
        <span className="font-mono text-xs">© {new Date().getFullYear()} Veto</span>
      </div>
    </footer>
  );
}
