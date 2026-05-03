import { useEffect, useState, useRef } from "react";

type Verdict = "ALLOW" | "ESCALATE" | "BLOCK";

type Action = {
  id: number;
  tool: string;
  detail: string;
  verdict: Verdict;
  risk: number; // 0-100
};

const POOL: Omit<Action, "id">[] = [
  { tool: "db.query", detail: "SELECT * FROM users LIMIT 100", verdict: "ALLOW", risk: 8 },
  { tool: "fs.write", detail: "/tmp/cache/results.json", verdict: "ALLOW", risk: 12 },
  { tool: "http.get", detail: "api.stripe.com/v1/customers", verdict: "ALLOW", risk: 14 },
  { tool: "db.exec", detail: "DROP TABLE production.users", verdict: "BLOCK", risk: 98 },
  { tool: "shell.run", detail: "rm -rf /var/data/*", verdict: "BLOCK", risk: 96 },
  { tool: "aws.iam", detail: "DeleteRole role/prod-admin", verdict: "BLOCK", risk: 94 },
  { tool: "stripe.refund", detail: "amount: $48,200.00", verdict: "ESCALATE", risk: 71 },
  { tool: "email.send", detail: "to: all-customers@ (12,408)", verdict: "ESCALATE", risk: 68 },
  { tool: "k8s.scale", detail: "deployment/api → 0 replicas", verdict: "ESCALATE", risk: 74 },
  { tool: "git.push", detail: "force-push origin/main", verdict: "BLOCK", risk: 89 },
  { tool: "db.update", detail: "UPDATE orders SET status=…", verdict: "ALLOW", risk: 22 },
  { tool: "vault.read", detail: "secret/prod/db_password", verdict: "ESCALATE", risk: 65 },
  { tool: "http.post", detail: "internal-svc/notify", verdict: "ALLOW", risk: 9 },
  { tool: "s3.delete", detail: "bucket: backups-2025", verdict: "BLOCK", risk: 92 },
];

export function LiveInterceptor() {
  const [actions, setActions] = useState<Action[]>([]);
  const [stats, setStats] = useState({ allowed: 1284, escalated: 47, blocked: 12 });
  const idRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      const sample = POOL[Math.floor(Math.random() * POOL.length)];
      const next: Action = { ...sample, id: ++idRef.current };
      setActions((prev) => [next, ...prev].slice(0, 6));
      setStats((s) => ({
        allowed: s.allowed + (next.verdict === "ALLOW" ? 1 : 0),
        escalated: s.escalated + (next.verdict === "ESCALATE" ? 1 : 0),
        blocked: s.blocked + (next.verdict === "BLOCK" ? 1 : 0),
      }));
    };
    tick();
    const interval = setInterval(tick, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl border bg-surface/70 backdrop-blur-sm overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-surface-elevated/50">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal animate-pulse-dot" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            Live · semantic plane
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 font-mono text-xs">
          <Stat label="allowed" value={stats.allowed} tone="signal" />
          <Stat label="escalated" value={stats.escalated} tone="warn" />
          <Stat label="blocked" value={stats.blocked} tone="block" />
        </div>
      </div>

      {/* Visualization */}
      <div className="grid grid-cols-12 gap-0 min-h-[420px]">
        {/* Left: Agents */}
        <div className="col-span-3 sm:col-span-2 border-r border-border/60 p-4 flex flex-col items-center justify-center gap-3 bg-surface/40">
          <Pillar label="AGENT" sub="LangChain" />
          <Pillar label="AGENT" sub="AutoGen" />
          <Pillar label="AGENT" sub="CrewAI" />
        </div>

        {/* Middle: Stream + Veto */}
        <div className="col-span-6 sm:col-span-7 relative px-4 py-6">
          {/* Flow lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="flowGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--signal)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--signal)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[20, 35, 50, 65, 80].map((y) => (
              <line
                key={y}
                x1="0"
                x2="100"
                y1={y}
                y2={y}
                stroke="url(#flowGrad)"
                strokeWidth="0.3"
                strokeDasharray="2 3"
                className="animate-flow"
              />
            ))}
          </svg>

          {/* Veto shield in center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-signal/20 blur-2xl animate-pulse-dot" />
              <div className="relative h-24 w-24 rounded-full border-2 border-signal bg-surface-elevated flex items-center justify-center glow-signal">
                <div className="text-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    VETO
                  </div>
                  <div className="text-signal text-xl font-bold leading-none mt-0.5">⌖</div>
                  <div className="font-mono text-[9px] text-signal mt-0.5">&lt;50ms</div>
                </div>
              </div>
              {/* Scanning ring */}
              <div className="absolute inset-0 rounded-full border border-signal/40 animate-scan-ring" />
            </div>
          </div>

          {/* Action stream */}
          <div className="relative z-20 h-full flex flex-col gap-2 justify-center">
            {actions.map((a, i) => (
              <ActionRow key={a.id} action={a} index={i} />
            ))}
          </div>
        </div>

        {/* Right: Targets */}
        <div className="col-span-3 sm:col-span-3 border-l border-border/60 p-4 flex flex-col justify-center gap-3 bg-surface/40">
          <Target label="Production DB" />
          <Target label="AWS / IAM" />
          <Target label="Stripe" />
          <Target label="File System" />
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border/60 bg-surface-elevated/40 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-muted-foreground font-mono">
          Every action flows through Veto · every hop is evaluated · production systems never see what is
          blocked
        </span>
        <span className="font-mono text-signal">Median envelope 38ms</span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "signal" | "warn" | "block";
}) {
  const cls = tone === "signal" ? "text-signal" : tone === "warn" ? "text-warn" : "text-block";
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`tabular-nums font-semibold ${cls}`}>{value.toLocaleString()}</span>
      <span className="text-muted-foreground uppercase text-[10px] tracking-wider">{label}</span>
    </div>
  );
}

function Pillar({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="w-full rounded-md border border-border bg-surface-elevated px-2 py-2 text-center">
      <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="text-xs font-semibold mt-0.5">{sub}</div>
    </div>
  );
}

function Target({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-border bg-surface-elevated px-3 py-2 text-xs font-medium text-center">
      {label}
    </div>
  );
}

function ActionRow({ action, index }: { action: Action; index: number }) {
  const tone =
    action.verdict === "ALLOW"
      ? "text-signal border-signal/40 bg-signal/5"
      : action.verdict === "ESCALATE"
        ? "text-warn border-warn/40 bg-warn/5"
        : "text-block border-block/40 bg-block/5";

  const icon = action.verdict === "ALLOW" ? "✓" : action.verdict === "ESCALATE" ? "⚠" : "✕";
  const opacity = Math.max(0.3, 1 - index * 0.15);

  return (
    <div className="animate-action-in" style={{ opacity }}>
      <div
        className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[11px] backdrop-blur-sm ${tone}`}
      >
        <span className="text-sm leading-none">{icon}</span>
        <span className="font-semibold tracking-wider w-[70px] shrink-0">{action.verdict}</span>
        <span className="text-foreground/90 shrink-0">{action.tool}</span>
        <span className="text-muted-foreground truncate hidden sm:inline">{action.detail}</span>
        <span className="ml-auto text-[10px] tabular-nums opacity-70 shrink-0">
          risk {action.risk}
        </span>
      </div>
    </div>
  );
}
