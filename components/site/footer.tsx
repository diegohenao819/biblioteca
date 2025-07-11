import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40">
      <div className="mx-auto max-w-5xl flex items-center justify-between py-6 px-5 text-xs">
        <p>
          Construido con{" "}
          <a href="https://supabase.com" target="_blank" rel="noreferrer" className="underline">
            Supabase
          </a>{" "}
          &amp;{" "}
          <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="underline">
            Next 15
          </a>
        </p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
