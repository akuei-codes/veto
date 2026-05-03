/**
 * Read Supabase-related env at runtime. Uses bracket access so bundlers are less likely to
 * strip `process.env.*` at build time (which would leave production without Vercel-injected vars).
 */
function envTrim(key: string): string | undefined {
  try {
    const raw = process.env[key];
    return typeof raw === "string" && raw.trim() ? raw.trim() : undefined;
  } catch {
    return undefined;
  }
}

const URL_KEYS = ["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL", "VITE_SUPABASE_URL"] as const;
const SERVICE_ROLE_KEYS = ["SUPABASE_SERVICE_ROLE_KEY"] as const;

/**
 * Project URL only: `https://<ref>.supabase.co` — no `/rest/v1` (the client appends that).
 * Pasting the full REST URL causes PostgREST `PGRST125` "Invalid path specified in request URL".
 */
export function normalizeSupabaseProjectUrl(raw: string): string {
  let u = raw.trim().replace(/\/+$/, "");
  const restIdx = u.search(/\/rest\/v\d+/i);
  if (restIdx !== -1) {
    u = u.slice(0, restIdx);
  }
  return u.replace(/\/+$/, "");
}

export function resolveSupabaseProjectUrl(): string | undefined {
  for (const key of URL_KEYS) {
    const v = envTrim(key);
    if (v) return normalizeSupabaseProjectUrl(v);
  }
  return undefined;
}

export function resolveSupabaseServiceRoleKey(): string | undefined {
  for (const key of SERVICE_ROLE_KEYS) {
    const v = envTrim(key);
    if (v) return v;
  }
  return undefined;
}

export type MissingSupabaseEnvKey = "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY";

/** Which canonical vars are absent (after checking alternate names for URL). */
export function listMissingSupabaseEnv(): MissingSupabaseEnvKey[] {
  const missing: MissingSupabaseEnvKey[] = [];
  if (!resolveSupabaseProjectUrl()) missing.push("SUPABASE_URL");
  if (!resolveSupabaseServiceRoleKey()) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  return missing;
}
