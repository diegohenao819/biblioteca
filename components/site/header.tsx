import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";

export default function Header() {
  return (
    <nav className="w-full border-b border-border/40">
      <div className="mx-auto max-w-5xl flex items-center justify-between h-16 px-5">
        <Link href="/" className="font-bold text-lg">
          📚 Book Reservation
        </Link>

        {!hasEnvVars && (
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </div>
        )}

        {/* Mostrar switcher sólo si ya hay sesión (opcional) */}
        {hasEnvVars && <ThemeSwitcher />}
      </div>
    </nav>
  );
}
