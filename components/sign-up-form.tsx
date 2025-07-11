"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /* ----------------------------- 1) Registro Email/Password ----------------------------- */
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;

      router.push("/auth/sign-up-success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  /* ----------------------------- 2) Login con Google ----------------------------- */
  const handleGoogleLogin = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/protected`,
      },
    });
    // El flujo OAuth te redirige fuera: no hace falta más lógica aquí
  };

  /* ----------------------------- Render ----------------------------- */
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="flex flex-col gap-6">
            {/* EMAIL */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* REPEAT PASSWORD */}
            <div className="grid gap-2">
              <Label htmlFor="repeat-password">Repeat Password</Label>
              <Input
                id="repeat-password"
                type="password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>

            {/* ERROR */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* BOTÓN SIGN-UP */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account…" : "Sign up"}
            </Button>

            {/* SEPARADOR */}
            <div className="relative my-6 flex items-center">
              <span className="flex-grow border-t border-muted" />
              <span className="mx-4 text-xs text-muted-foreground">OR</span>
              <span className="flex-grow border-t border-muted" />
            </div>

            {/* BOTÓN GOOGLE */}
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>

            {/* LINK LOGIN */}
            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
