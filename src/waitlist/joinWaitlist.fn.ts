import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { resolveSiteUrl } from "./email-utils";
import { classifyInsertError, type SaveFailedReason } from "./supabase-insert-errors";
import { listMissingSupabaseEnv, resolveSupabaseProjectUrl, resolveSupabaseServiceRoleKey } from "./supabase-env";
import {
  getWaitlistWelcomeSubject,
  renderWaitlistWelcomeHtml,
  renderWaitlistWelcomePlainText,
} from "./welcome-email-html";

const waitlistInput = z.object({
  email: z
    .string()
    .max(320)
    .transform((s) => s.trim().toLowerCase())
    .pipe(z.string().email()),
});

export type JoinWaitlistResult =
  | { ok: true; sentConfirmation: boolean }
  /** Supabase URL / service role not present at runtime (check Vercel env + Preview vs Production). */
  | { ok: false; code: "missing_env"; missing: ("SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY")[] }
  /** Supabase insert failed — see `reason` for likely fix (table migration vs API key). */
  | { ok: false; code: "save_failed"; reason: SaveFailedReason };

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Best-effort retries for transient Resend / network failures. */
async function sendWithBackoff<T>(fn: () => Promise<T>, attempts = 4): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) {
        await sleep(320 * 2 ** i);
      }
    }
  }
  throw lastErr;
}

/** RPC entry for the marketing waitlist: persists emails in Supabase, sends Resend confirmation for new addresses. */
export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator(waitlistInput)
  .handler(async ({ data }): Promise<JoinWaitlistResult> => {
    const supabaseUrl = resolveSupabaseProjectUrl();
    const supabaseServiceKey = resolveSupabaseServiceRoleKey();
    const resendApiKey = process.env["RESEND_API_KEY"];
    const fromEmail = process.env["WAITLIST_FROM_EMAIL"];

    const emailConfigured =
      typeof resendApiKey === "string" &&
      typeof fromEmail === "string" &&
      resendApiKey.trim().length > 0 &&
      fromEmail.trim().length > 0;

    if (!supabaseUrl || !supabaseServiceKey) {
      const missing = listMissingSupabaseEnv();
      console.error(
        "[waitlist] Missing Supabase env at runtime — cannot store signup. Missing:",
        missing.join(", "),
        "| VERCEL=",
        process.env["VERCEL"] ?? "(unset)",
        "| If vars exist in Vercel, confirm they apply to this deployment (Production vs Preview) and redeploy.",
      );
      return { ok: false, code: "missing_env", missing };
    }

    if (!emailConfigured) {
      console.error(
        "[waitlist] Missing RESEND_API_KEY or WAITLIST_FROM_EMAIL — signup will be stored but no confirmation email will be sent. Add both in Vercel → Settings → Environment Variables and redeploy.",
      );
    }

    const { createClient } = await import("@supabase/supabase-js");

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error: insertError } = await supabase.from("waitlist_signups").insert({
      email: data.email,
    });

    const isDuplicate =
      insertError?.code === "23505" ||
      (typeof insertError?.message === "string" &&
        insertError.message.toLowerCase().includes("duplicate"));

    if (insertError && !isDuplicate) {
      const reason = classifyInsertError(insertError);
      console.error("[waitlist] Supabase insert failed:", {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint,
        classified: reason,
      });
      return { ok: false, code: "save_failed", reason };
    }

    /** Always send confirmation — duplicates skipped DB insert but users still expect mail (retests, missed inbox). */
    const skipEmailOnDuplicate =
      typeof process.env.WAITLIST_SKIP_EMAIL_ON_DUPLICATE === "string" &&
      process.env.WAITLIST_SKIP_EMAIL_ON_DUPLICATE.trim().toLowerCase() === "true";

    const shouldSendEmail =
      emailConfigured && (!insertError || (isDuplicate && !skipEmailOnDuplicate));

    if (shouldSendEmail) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey!.trim());
      const from = fromEmail!.trim();
      const replyTo =
        typeof process.env.WAITLIST_REPLY_TO_EMAIL === "string" &&
        process.env.WAITLIST_REPLY_TO_EMAIL.trim()
          ? process.env.WAITLIST_REPLY_TO_EMAIL.trim()
          : undefined;

      const bccRaw =
        typeof process.env.WAITLIST_BCC_EMAIL === "string" && process.env.WAITLIST_BCC_EMAIL.trim();
      const bcc = bccRaw ? bccRaw : undefined;

      const siteUrl = resolveSiteUrl(from);
      const html = renderWaitlistWelcomeHtml(siteUrl);
      const text = renderWaitlistWelcomePlainText(siteUrl);

      let sentConfirmation = false;
      try {
        await sendWithBackoff(async () => {
          const { data: sent, error: emailError } = await resend.emails.send({
            from,
            to: [data.email],
            subject: getWaitlistWelcomeSubject(),
            html,
            text,
            headers: {
              /** Signals real correspondence triggered by the recipient — not system auto-reply noise (RFC 3834). */
              "Auto-Submitted": "no",
            },
            ...(replyTo ? { replyTo } : {}),
            ...(bcc ? { bcc: [bcc] } : {}),
            tags: [
              { name: "category", value: "transactional" },
              { name: "email_type", value: "waitlist_confirmation" },
              {
                name: "signup_kind",
                value: insertError ? "duplicate" : "new",
              },
            ],
          });
          if (emailError) {
            throw new Error(emailError.message);
          }
          if (sent?.id) {
            console.info(`[waitlist] Resend accepted id=${sent.id} to=${data.email}`);
          }
          sentConfirmation = true;
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error("[waitlist] Resend send failed after retries:", msg);
      }
      return { ok: true, sentConfirmation };
    }

    return { ok: true, sentConfirmation: false };
  });
