import { Compass, ArrowLeft, GraduationCap, Briefcase, Calculator, Building2, UserRound, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../lib/auth";

interface NavbarProps {
  onHome: () => void;
  onStartEntrepreneur: () => void;
  onStartStudent: () => void;
  onOpenEmi: () => void;
  onOpenAccount: () => void;
  onLogin: () => void;
  onSignup: () => void;
  mode: "home" | "entrepreneur-wizard" | "entrepreneur-results" | "student-wizard" | "student-results" | "emi";
}

export default function Navbar({
  onHome,
  onStartEntrepreneur,
  onStartStudent,
  onOpenEmi,
  onOpenAccount,
  onLogin,
  onSignup,
  mode,
}: NavbarProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
        <button onClick={onHome} className="group flex items-center gap-2.5 text-left focus:outline-hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal text-cream shadow-sm transition-transform group-hover:scale-105">
            <Compass size={20} strokeWidth={2.4} />
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-display text-xl font-bold tracking-tight text-ink">Udaan</span>
            <span className="rounded-full bg-terracotta/15 px-2 py-0.5 text-[10px] font-bold text-terracotta">Govt Schemes</span>
          </div>
        </button>

        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider text-ink/70 xl:flex">
          <button onClick={onStartEntrepreneur} className={`flex items-center gap-1.5 transition hover:text-ink ${mode.startsWith("entrepreneur") ? "text-terracotta font-extrabold" : ""}`}>
            <Briefcase size={14} /> Business Loans
          </button>
          <button onClick={onStartStudent} className={`flex items-center gap-1.5 transition hover:text-ink ${mode.startsWith("student") ? "text-teal-dark font-extrabold" : ""}`}>
            <GraduationCap size={15} /> Student Scholarships
          </button>
          <button onClick={onOpenEmi} className={`flex items-center gap-1.5 transition hover:text-ink ${mode === "emi" ? "text-teal-dark font-extrabold" : ""}`}>
            <Calculator size={14} /> EMI Calculator
          </button>
          <a href="https://scholarships.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-ink/50 transition hover:text-ink">
            <Building2 size={13} /> Official Portals ↗
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {mode !== "home" && (
            <button onClick={onHome} className="hidden items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold text-ink/70 transition hover:bg-black/5 sm:flex">
              <ArrowLeft size={14} /> Home
            </button>
          )}

          {user ? (
            <button onClick={onOpenAccount} className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-bold text-ink/75 transition hover:bg-black/5" title="Open account dashboard">
              {user.avatar ? <img src={user.avatar} alt="" className="h-5 w-5 rounded-full" /> : <UserRound size={14} />}
              <span className="hidden md:inline">{user.name.split(" ")[0]}</span>
            </button>
          ) : (
            <>
              <button onClick={onLogin} className="inline-flex items-center gap-1.5 rounded-full border border-teal/25 bg-white px-3 py-2 text-xs font-bold text-teal-dark transition hover:bg-teal/5">
                <LogIn size={14} /> <span className="hidden sm:inline">Login</span>
              </button>
              <button onClick={onSignup} className="inline-flex items-center gap-1.5 rounded-full bg-teal px-3.5 py-2 text-xs font-bold text-cream shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <UserPlus size={14} /> <span className="hidden sm:inline">Sign Up</span>
              </button>
            </>
          )}

          <button onClick={onStartEntrepreneur} className="hidden rounded-full bg-terracotta px-4 py-2 text-xs font-bold text-cream shadow-xs transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 lg:inline-flex">
            Business Match →
          </button>
        </div>
      </div>
    </header>
  );
}
