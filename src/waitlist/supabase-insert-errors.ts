import type { PostgrestError } from "@supabase/supabase-js";

export type SaveFailedReason =
  | "migration_required"
  | "database_access"
  | "invalid_project_url"
  | "unknown";

/** Map Supabase/PostgREST insert errors to an actionable category (no secrets in output). */
export function classifyInsertError(error: PostgrestError | null | undefined): SaveFailedReason {
  if (!error) return "unknown";

  const code = error.code ?? "";
  const msg = `${error.message ?? ""} ${error.details ?? ""} ${error.hint ?? ""}`.toLowerCase();

  /** Base URL must not include `/rest/v1` — supabase-js adds that. */
  if (code === "PGRST125" || msg.includes("invalid path")) {
    return "invalid_project_url";
  }

  if (
    code === "42P01" ||
    code === "PGRST205" ||
    msg.includes("could not find the table") ||
    (msg.includes("does not exist") &&
      (msg.includes("waitlist_signups") || msg.includes("relation") || msg.includes("table")))
  ) {
    return "migration_required";
  }

  if (
    code === "42501" ||
    code === "PGRST301" ||
    msg.includes("permission denied") ||
    msg.includes("invalid jwt") ||
    msg.includes("jwt expired") ||
    msg.includes("invalid api") ||
    msg.includes("row-level security") ||
    msg.includes("new row violates row-level security policy")
  ) {
    return "database_access";
  }

  return "unknown";
}
