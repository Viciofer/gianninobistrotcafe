import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Accesso Admin — Giannino Bistrot Cafè" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session && isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [loading, session, isAdmin, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (error) {
      toast.error("Credenziali non valide");
      return;
    }
    toast.success("Accesso effettuato");
    navigate({ to: "/admin" });
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 border border-border p-8 bg-card"
      >
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground">Area Riservata</h1>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">
            Accesso amministratore
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Accesso in corso…" : "Accedi"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">← Torna al sito</Link>
        </p>
      </form>
    </div>
  );
}
