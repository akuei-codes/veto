/** Transactional waitlist email — light “letter” layout: gray canvas, centered white card (Date Drop–style). */

const CANVAS = "#f3f4f6";
const CARD = "#ffffff";
const CARD_BORDER = "#e5e7eb";
const TEXT = "#111827";
const MUTED = "#6b7280";
const FOOT = "#9ca3af";
/** Signal green on white */
const SIGNAL = "#16a34a";
const SIGNAL_DARK = "#15803d";
const HERO_BG = "#ecfdf5";
const HERO_TEXT = "#065f46";
const ACCENT_LINE = "#22c55e";

/** Transactional subjects tend to filter better than promotional-style lines. */
export function getWaitlistWelcomeSubject(): string {
  return "Your Veto waitlist signup is confirmed";
}

export function renderWaitlistWelcomePlainText(siteUrl?: string): string {
  const visit = siteUrl != null && siteUrl.length > 0 ? `\n${siteUrl}\n` : "";

  return `
You're on the Veto waitlist.

We'll email you from this address when early access opens. Nothing else you need to do.

— The Veto Team
${visit}
Didn't sign up? You can ignore this note.
`.trim();
}

export function renderWaitlistWelcomeHtml(siteUrl?: string): string {
  const linkBlock =
    siteUrl != null && siteUrl.length > 0
      ? `
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:28px auto 0;">
            <tr>
              <td align="center" style="border-radius:10px;background-color:${SIGNAL_DARK};padding:14px 32px;">
                <a href="${escapeHtmlAttr(siteUrl)}" style="display:inline-block;font-family:Inter,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                  Visit ${escapeHtml(linkLabel(siteUrl))}
                </a>
              </td>
            </tr>
          </table>`
      : "";

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Veto — You're on the list</title>
  </head>
  <body style="margin:0;padding:0;background-color:${CANVAS};-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${CANVAS};opacity:0;">
      You're confirmed on the Veto waitlist — we'll email you when early access opens.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${CANVAS};">
      <tr>
        <td align="center" style="padding:32px 16px 40px;">
          <!--[if mso]>
          <table role="presentation" width="520" align="center" cellpadding="0" cellspacing="0"><tr><td>
          <![endif]-->
          <table role="presentation" width="520" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:520px;margin:0 auto;background-color:${CARD};border:1px solid ${CARD_BORDER};border-radius:16px;">
            <tr>
              <td style="padding:40px 40px 36px;font-family:Inter,Helvetica Neue,Helvetica,Arial,sans-serif;">
                <!-- Logo row (left, like Date Drop) -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="vertical-align:middle;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="width:36px;height:36px;background-color:${SIGNAL};border-radius:8px;text-align:center;vertical-align:middle;line-height:36px;">
                            <span style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px;font-weight:700;color:#ffffff;">V</span>
                          </td>
                          <td style="padding-left:12px;vertical-align:middle;">
                            <span style="font-size:17px;font-weight:600;color:${TEXT};letter-spacing:-0.02em;">veto</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- Hero band (centered inside white card) -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                  <tr>
                    <td style="background-color:${HERO_BG};border-radius:12px;padding:0;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td align="center" style="padding:26px 24px;">
                            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;font-weight:700;color:${HERO_TEXT};text-align:center;">
                              You're on the list.
                            </p>
                            <p style="margin:10px 0 0;font-family:Inter,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:${HERO_TEXT};opacity:0.85;text-align:center;">
                              Early access · runtime firewall for AI agents
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- Body (left-aligned) -->
                <p style="margin:28px 0 0;font-size:16px;line-height:1.6;color:${TEXT};text-align:left;">
                  Hi there,
                </p>
                <p style="margin:16px 0 0;font-size:15px;line-height:1.65;color:${MUTED};text-align:left;">
                  Thanks for joining the <strong style="color:${TEXT};font-weight:600;">Veto</strong> waitlist. You're officially early. We're rolling out access carefully and will reach out from <strong style="color:${TEXT};">this same address</strong> when it's your turn.
                </p>
                <!-- Accent block (blockquote style, Date Drop–inspired) -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:22px;">
                  <tr>
                    <td style="width:4px;background-color:${ACCENT_LINE};border-radius:2px;font-size:1px;line-height:1px;">&nbsp;</td>
                    <td style="padding-left:16px;">
                      <p style="margin:0;font-size:17px;line-height:1.4;font-weight:700;color:${TEXT};text-align:left;">
                        Early access pending
                      </p>
                      <p style="margin:6px 0 0;font-size:14px;line-height:1.55;color:${MUTED};text-align:left;">
                        Nothing else you need to do right now.
                      </p>
                    </td>
                  </tr>
                </table>
                ${linkBlock}
                <!-- Divider -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;">
                  <tr>
                    <td style="border-top:1px solid #f3f4f6;font-size:1px;line-height:1px;">&nbsp;</td>
                  </tr>
                </table>
                <!-- Sign-off (left) -->
                <p style="margin:24px 0 0;font-size:14px;line-height:1.55;color:${TEXT};text-align:left;">
                  Have fun building,<br />
                  <span style="font-weight:600;">The Veto team</span>
                </p>
                <p style="margin:20px 0 0;font-size:12px;line-height:1.55;color:${FOOT};text-align:left;">
                  If you didn't join the waitlist, you can ignore this email.
                </p>
                <p style="margin:16px 0 0;font-size:11px;line-height:1.45;color:${FOOT};text-align:left;">
                  Veto · runtime firewall for AI agents
                </p>
              </td>
            </tr>
          </table>
          <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
}

function linkLabel(siteUrl: string): string {
  try {
    return new URL(siteUrl).host;
  } catch {
    return siteUrl.replace(/^https?:\/\//, "");
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeHtmlAttr(s: string): string {
  return escapeHtml(s).replace(/'/g, "&#39;");
}
