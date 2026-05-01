import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-signal/40 bg-signal/5 p-6 text-center">
        <div className="text-signal font-mono text-xs uppercase tracking-[0.2em] mb-2">
          ✓ You're on the list
        </div>
        <p className="text-sm text-muted-foreground">
          Check your inbox. We'll be in touch personally within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 bg-surface-elevated border-border text-base placeholder:text-muted-foreground/60 focus-visible:ring-signal"
        />
        <Button
          type="submit"
          className="h-12 px-6 bg-signal text-signal-foreground hover:bg-signal/90 font-semibold whitespace-nowrap"
        >
          Request Early Access →
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground text-center">
        We onboard personally. No automated drip sequences. A real conversation about your stack.
      </p>
    </form>
  );
}
