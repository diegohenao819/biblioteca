import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center gap-6 px-4 py-24">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Reserva tus libros en segundos
      </h1>
      <p className="max-w-xl text-muted-foreground">
        Gestión de préstamos sencilla, rápida y respaldada por Supabase + Next 15.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/auth/sign-up">Empieza gratis</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/auth/login">Ya tengo cuenta</Link>
        </Button>
      </div>
    </section>
  );
}
