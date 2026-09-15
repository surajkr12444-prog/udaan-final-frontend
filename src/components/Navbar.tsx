import { Compass, ArrowLeft } from "lucide-react";

interface NavbarProps {
  onHome: () => void;
  onStart: () => void;
  mode: "home" | "app";
}

export default function Navbar({ onHome, onStart, mode }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={onHome}
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-cream shadow-sm transition-transform group-hover:-rotate-6">
            <Compass size={18} strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            Udaan<span className="text-terracotta">.AI</span>
          </span>
        </button>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
          {mode === "home" && (
            <>
              <a href="#how-it-works" className="transition hover:text-ink">How it works</a>
              <a href="#schemes" className="transition hover:text-ink">Schemes</a>
              <a href="#stories" className="transition hover:text-ink">Stories</a>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {mode === "app" && (
            <button
              onClick={onHome}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink/60 transition hover:text-ink"
            >
              <ArrowLeft size={16} /> Home
            </button>
          )}
          <button
            onClick={onStart}
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-bold text-cream shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgba(0,0,0,0.15)] active:translate-y-0"
          >
            {mode === "home" ? "Find My Schemes" : "Restart Match"}
          </button>
        </div>
      </div>
    </header>
  );
}
