/** Derive public site URL for branded links — prefers SITE_URL, else the domain from WAITLIST_FROM_EMAIL. */

export function resolveSiteUrl(fromHeader: string): string | undefined {
  const explicit = typeof process.env.SITE_URL === "string" ? process.env.SITE_URL.trim() : "";
  if (explicit) {
    try {
      const u = new URL(explicit.startsWith("http") ? explicit : `https://${explicit}`);
      return `${u.origin}`;
    } catch {
      return undefined;
    }
  }
  return originFromSenderHeader(fromHeader);
}

function originFromSenderHeader(from: string): string | undefined {
  const trimmed = from.trim();
  const angle = trimmed.match(/<([^>]+)>/);
  const addr = (angle ? angle[1] : trimmed).trim();
  const at = addr.lastIndexOf("@");
  if (at === -1 || at >= addr.length - 1) return undefined;
  const host = addr
    .slice(at + 1)
    .trim()
    .toLowerCase();
  if (!/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(host)) return undefined;
  return `https://${host}`;
}
