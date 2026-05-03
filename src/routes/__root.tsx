import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

import { Toaster } from "@/components/ui/sonner";

/** Set `VITE_SITE_ORIGIN` (e.g. https://veto.ink) so shared links resolve OG images to an absolute URL. */
function siteOrigin(): string | undefined {
  const raw = import.meta.env.VITE_SITE_ORIGIN;
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  return raw.trim().replace(/\/$/, "");
}

function ogImageUrl(): string {
  const origin = siteOrigin();
  return origin ? `${origin}/veto-og.png` : "/veto-og.png";
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => {
    const origin = siteOrigin();
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Veto — Real-time semantic decision layer for AI actions" },
        {
          name: "description",
          content:
            "Veto decides whether an AI action should exist at all — interpreting intent, simulating consequence, and intercepting executions before they reach production systems.",
        },
        { name: "author", content: "Veto" },
        { property: "og:title", content: "Veto — Semantic infrastructure for autonomous execution" },
        {
          property: "og:description",
          content:
            "Not budget limits or output filters — a predictive decision engine that ghosts blast radius across your stack. Framework-agnostic, sub-50ms verdict plane.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImageUrl() },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:alt", content: "Veto — real-time interception of AI execution" },
        ...(origin ? ([{ property: "og:url", content: origin }] as const) : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: ogImageUrl() },
        { name: "twitter:title", content: "Veto — Should this AI action exist?" },
        {
          name: "twitter:description",
          content:
            "Semantic decision infrastructure: simulate consequence, trace blast graph, halt execution — before irreversible commits land.",
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" duration={5600} closeButton richColors theme="dark" />
    </>
  );
}
