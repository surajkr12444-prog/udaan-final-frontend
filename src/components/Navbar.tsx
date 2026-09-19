import { Compass, ArrowLeft, GraduationCap, Briefcase, Calculator, Building2, UserRound, Languages, Moon, Sun } from "lucide-react";
import { useAuth } from "../lib/auth";
import { usePreferences, type Language } from "../lib/preferences";
import { openPortalWithGuide } from "../lib/portalGuide";

interface NavbarProps {
  onHome: () => void;
  onStartEntrepreneur: () => void;
  onStartStudent: () => void;
  onOpenEmi: () => void;
  onOpenAccount: () => void;
  mode: "home" | "entrepreneur-wizard" | "entrepreneur-results" | "student-wizard" | "student-results" | "emi";
}

export default function Navbar({ onHome, onStartEntrepreneur, onStartStudent, onOpenEmi, onOpenAccount, mode }: NavbarProps) {
  const { user } = useAuth();
  const { t, language, setLanguage, theme, toggleTheme } = usePreferences();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
        <button onClick={onHome} className="group flex items-center gap-2.5 text-left focus:outline-hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal text-cream shadow-sm transition-transform group-hover:scale-105"><Compass size={20} strokeWidth={2.4} /></span>
          <div className="flex items-center gap-1.5"><span className="font-display text-xl font-bold tracking-tight text-ink">Udaan</span><span className="hidden rounded-full bg-terracotta/15 px-2 py-0.5 text-[10px] font-bold text-terracotta sm:inline">{t('brandTag')}</span></div>
        </button>

        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider text-ink/70 xl:flex">
          <button onClick={onStartEntrepreneur} className={`flex items-center gap-1.5 transition hover:text-ink ${mode.startsWith("entrepreneur") ? "text-terracotta font-extrabold" : ""}`}><Briefcase size={14} /> {t('businessLoans')}</button>
          <button onClick={onStartStudent} className={`flex items-center gap-1.5 transition hover:text-ink ${mode.startsWith("student") ? "text-teal-dark font-extrabold" : ""}`}><GraduationCap size={15} /> {t('studentScholarships')}</button>
          <button onClick={onOpenEmi} className={`flex items-center gap-1.5 transition hover:text-ink ${mode === "emi" ? "text-teal-dark font-extrabold" : ""}`}><Calculator size={14} /> {t('emi')}</button>
          <button onClick={() => openPortalWithGuide({ title: 'National Scholarship Portal', portalName: 'NSP', url: 'https://scholarships.gov.in/', kind: 'scholarship' })} className="flex items-center gap-1 text-ink/50 transition hover:text-ink"><Building2 size={13} /> {t('official')} ↗</button>
        </nav>

        <div className="flex items-center gap-2">
          {mode !== "home" && <button onClick={onHome} className="hidden items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold text-ink/70 transition hover:bg-black/5 sm:flex"><ArrowLeft size={14} /> Home</button>}
          <div className="hidden items-center rounded-full border border-ink/10 bg-white px-2 py-1 md:flex"><Languages size={13} className="mr-1 text-teal"/><select value={language} onChange={(e)=>setLanguage(e.target.value as Language)} className="bg-transparent text-[11px] font-bold text-ink outline-none"><option value="en">EN</option><option value="hi">हिंदी</option><option value="hinglish">Hinglish</option></select></div>
          <button onClick={toggleTheme} className="rounded-full border border-ink/10 bg-white p-2 text-ink" aria-label="Toggle theme">{theme==='dark'?<Sun size={15}/>:<Moon size={15}/>}</button>
          {user && <button onClick={onOpenAccount} className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-bold text-ink/75 transition hover:bg-black/5">{user.avatar ? <img src={user.avatar} alt="" className="h-5 w-5 rounded-full" /> : <UserRound size={14} />}<span className="hidden md:inline">{user.name.split(" ")[0]}</span></button>}
        </div>
      </div>
    </header>
  );
}
