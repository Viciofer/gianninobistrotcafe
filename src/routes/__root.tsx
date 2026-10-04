import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Lock } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import logoGiannino from "@/assets/logo-giannino.png";

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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Giannino Bistrot Cafè" },
      { name: "description", content: "Web app per il Giannino Bistrot Cafe, con informazioni su storia, menu, vini, drink e contatti." },
      { name: "author", content: "Giannino Bistrot Cafè" },
      { property: "og:title", content: "Giannino Bistrot Cafè" },
      { property: "og:description", content: "Web app per il Giannino Bistrot Cafe, con informazioni su storia, menu, vini, drink e contatti." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Giannino Bistrot Cafè" },
      { name: "twitter:description", content: "Web app per il Giannino Bistrot Cafe, con informazioni su storia, menu, vini, drink e contatti." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/72b423e2-d671-4d18-ae13-6330ae1a16de" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/72b423e2-d671-4d18-ae13-6330ae1a16de" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,300;0,500;0,700;1,400&family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
      },
    ],
  }),
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
    <AuthProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-16 flex items-center justify-between border-b border-border px-4 md:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
              <SidebarTrigger className="h-10 w-10 rounded-full border border-border text-foreground hover:text-accent hover:border-accent [&_svg]:size-5" />
              <Link to="/" className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
                <img
                  src={logoGiannino}
                  alt="Giannino Bistrot Cafè"
                  className="h-11 w-11 rounded-full object-cover border border-border"
                />
                <span className="hidden sm:flex flex-col leading-tight">
                  <span className="font-serif text-lg text-foreground">Giannino</span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    Bistrot · Cafè
                  </span>
                </span>
              </Link>
              <Link
                to="/admin"
                aria-label="Area riservata"
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-colors"
              >
                <Lock className="h-4 w-4" />
              </Link>
            </header>
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </AuthProvider>
  );
}
