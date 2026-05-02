import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { resolveSiteUrl } from "./email-utils";
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

export type JoinWaitlistResult = { ok: true } | { ok: false; code: "unavailable" };

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
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.WAITLIST_FROM_EMAIL;

    if (
      typeof supabaseUrl !== "string" ||
      typeof supabaseServiceKey !== "string" ||
      typeof resendApiKey !== "string" ||
      typeof fromEmail !== "string" ||
      !supabaseUrl.trim() ||
      !supabaseServiceKey.trim() ||
      !resendApiKey.trim() ||
      !fromEmail.trim()
    ) {
      console.error(
        "[waitlist] Missing required server environment variables for waitlist signup.",
      );
      return { ok: false, code: "unavailable" };
    }

    const [{ createClient }, { Resend }] = await Promise.all([
      import("@supabase/supabase-js"),
      import("resend"),
    ]);

    const supabase = createClient(supabaseUrl.trim(), supabaseServiceKey.trim(), {
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
      console.error("[waitlist] Supabase insert failed:", insertError.message);
      return { ok: false, code: "unavailable" };
    }

    /** Always send confirmation — duplicates skipped DB insert but users still expect mail (retests, missed inbox). */
    const skipEmailOnDuplicate =
      typeof process.env.WAITLIST_SKIP_EMAIL_ON_DUPLICATE === "string" &&
      process.env.WAITLIST_SKIP_EMAIL_ON_DUPLICATE.trim().toLowerCase() === "true";

    const shouldSendEmail = !insertError || (isDuplicate && !skipEmailOnDuplicate);

    if (shouldSendEmail) {
      const resend = new Resend(resendApiKey.trim());
      const from = fromEmail.trim();
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
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error("[waitlist] Resend send failed after retries:", msg);
      }
    }

    return { ok: true };
  });
