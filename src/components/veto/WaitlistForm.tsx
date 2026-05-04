import { useCallback, useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { FOUNDERS_EMAIL, foundersMailto } from "@/constants/contact";
import { joinWaitlist } from "@/waitlist/joinWaitlist.fn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Phase = "idle" | "submitting" | "done";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [confirmationSent, setConfirmationSent] = useState(true);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (phase === "submitting" || phase === "done") return;

      setPhase("submitting");

      try {
        const result = await joinWaitlist({ data: { email } });

        if (!result.ok) {
          if (result.code === "missing_env") {
            toast.error("Waitlist can't reach the database.", {
              description: `Add ${result.missing.join(" and ")} in Vercel → Settings → Environment Variables for this deployment (enable Production and Preview if you use both), then redeploy.`,
            });
          } else if (result.code === "save_failed") {
            if (result.reason === "migration_required") {
              toast.error("Waitlist storage isn't set up yet.", {
                description:
                  "In Supabase → SQL Editor, run the migration that creates public.waitlist_signups (see supabase/migrations in the repo), then try again.",
              });
            } else if (result.reason === "invalid_project_url") {
              toast.error("Supabase URL is misconfigured.", {
                description:
                  "Set SUPABASE_URL to the project base only, e.g. https://xxxxx.supabase.co — do not include /rest/v1. Then redeploy.",
              });
            } else if (result.reason === "database_access") {
              toast.error("We couldn't save your signup.", {
                description:
                  "Confirm Vercel uses SUPABASE_SERVICE_ROLE_KEY from Supabase → Project Settings → API (the service_role secret, not anon). Redeploy after fixing.",
              });
            } else {
              toast.error("We couldn't save your signup. Please try again in a moment.");
            }
          } else {
            toast.error("Something went wrong. Please try again in a moment.");
          }
          setPhase("idle");
          return;
        }

        setConfirmationSent(result.sentConfirmation);
        setPhase("done");
        if (result.sentConfirmation) {
          toast.success("You're on the list. Check your inbox for confirmation.");
        } else {
          toast.success("You're on the list.", {
            description:
              "We couldn't send the confirmation email yet. You're still registered — check back soon.",
          });
        }
      } catch {
        toast.error("We couldn't submit that email. Double-check it and retry.");
        setPhase("idle");
      }
    },
    [email, phase],
  );

  if (phase === "done") {
    return (
      <div
        role="status"
        className="group relative isolate block w-full max-w-xl mx-auto overflow-hidden rounded-3xl border border-signal/45 bg-gradient-to-br from-signal/[0.12] via-surface to-surface text-left shadow-[0_24px_80px_-28px_color-mix(in_oklab,var(--signal)_42%,transparent),0_0_0_1px_color-mix(in_oklab,var(--ice)_35%,transparent)]"
        aria-live="polite"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-ice/[0.14] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-signal/15 blur-3xl" />
        <div className="relative space-y-3 px-8 py-9">
          <div className="flex items-center gap-3">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-signal/50 bg-signal/15 text-signal">
              <Check className="h-6 w-6 animate-[veto-success-pop_0.65s_ease-out]" aria-hidden />
            </span>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-signal">
                Confirmed
              </span>
              <div className="text-lg font-semibold tracking-tight text-foreground">
                You're officially in.
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {confirmationSent ? (
              <>
                We've reserved your spot for early access and sent confirmation to{" "}
                <span className="text-foreground/95 font-medium">{email}</span>. If nothing
                arrives shortly, check spam. We'd hate for you to miss it.
              </>
            ) : (
              <>
                You're registered for early access as{" "}
                <span className="text-foreground/95 font-medium">{email}</span>. If you don't get a
                confirmation email, our sending setup may still be finishing — you're still on the
                list.
              </>
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail("");
              setPhase("idle");
              setConfirmationSent(true);
            }}
            className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-ice underline-offset-4 hover:text-ice/85 hover:underline"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto" noValidate>
      <div
        className="relative isolate overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card/92 via-background/76 to-background/94 p-px shadow-[0_24px_100px_-32px_color-mix(in_oklab,var(--signal)_38%,transparent),0_0_0_1px_color-mix(in_oklab,var(--ice)_28%,transparent)] backdrop-blur-2xl"
        style={{ backdropFilter: "blur(28px)" }}
      >
        <div className="pointer-events-none absolute inset-x-[-40%] top-[-60%] h-52 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ice)_15%,transparent),transparent_72%)]" />
        <div className="pointer-events-none absolute right-[-20%] bottom-[-35%] h-44 w-[70%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--signal)_12%,transparent),transparent)]" />

        <div className="relative rounded-[calc(1.5rem-1px)] bg-surface/35 px-4 py-4 sm:px-5 sm:py-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3 px-1">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ice">
                <Sparkles className="size-3.5 text-signal shrink-0" aria-hidden />
                Early access
              </div>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">
                Production environments only · manual onboarding once your execution plane wires in.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
            <Input
              type="email"
              name="email"
              autoComplete="email"
              required
              inputMode="email"
              placeholder="you@company.com"
              value={email}
              disabled={phase === "submitting"}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 sm:h-[3.125rem] flex-1 border-border/60 bg-background/72 text-base placeholder:text-muted-foreground/52 focus-visible:border-ice/50 focus-visible:ring-ice/35"
            />
            <Button
              type="submit"
              disabled={phase === "submitting" || email.trim().length < 5}
              className="relative h-12 shrink-0 overflow-hidden border border-signal/30 bg-gradient-to-r from-signal via-signal to-ice px-7 font-semibold text-signal-foreground shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--foreground)_22%,transparent),0_0_24px_-6px_color-mix(in_oklab,var(--signal)_54%,transparent)] transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--foreground)_28%,transparent),0_0_36px_-4px_color-mix(in_oklab,var(--signal)_62%,transparent)] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 sm:h-[3.125rem]"
            >
              {phase === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Sending
                </>
              ) : (
                <>
                  Claim your seat
                  <span className="ml-1 opacity-95" aria-hidden>
                    →
                  </span>
                </>
              )}
            </Button>
          </div>
          <p className="mt-3.5 px-1 text-center text-[11px] leading-relaxed font-mono text-muted-foreground/85">
            Veto never resells addresses. One confirmation · then materially important updates only.
          </p>
          <p className="mt-2 px-1 text-center text-[11px] leading-relaxed text-muted-foreground/90">
            Prefer email?{" "}
            <a href={foundersMailto} className="font-mono text-ice underline-offset-4 hover:underline">
              {FOUNDERS_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
