import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  Bookmark,
  Bot,
  Briefcase,
  Building2,
  Calculator,
  ChevronRight,
  GraduationCap,
  History,
  Home,
  Languages,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserRound,
  X,
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import { usePreferences, type Language } from '../lib/preferences';

interface Props {
  children: ReactNode;
  active: string;
  onHome: () => void;
  onBusiness: () => void;
  onStudent: () => void;
  onEmi: () => void;
  onOfficialPortals: () => void;
  onOpenAccount: () => void;
}

function openAssistant() {
  window.dispatchEvent(new CustomEvent('udaan:open-chat'));
}

export default function DashboardShell({
  children,
  active,
  onHome,
  onBusiness,
  onStudent,
  onEmi,
  onOfficialPortals,
  onOpenAccount,
}: Props) {
  const { user } = useAuth();
  const { language, setLanguage, theme, toggleTheme } = usePreferences();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => setMobileOpen(false), [active]);

  const menu = [
    { key: 'home', label: 'Home', icon: Home, action: onHome },
    { key: 'entrepreneur', label: 'Business Loans', icon: Briefcase, action: onBusiness },
    { key: 'student', label: 'Student Scholarships', icon: GraduationCap, action: onStudent },
    { key: 'emi', label: 'EMI Calculator', icon: Calculator, action: onEmi },
    { key: 'official', label: 'Official Portals', icon: Building2, action: onOfficialPortals },
  ];

  const secondary = [
    { key: 'saved', label: 'Saved', icon: Bookmark, action: onOpenAccount },
    { key: 'history', label: 'Match History', icon: History, action: onOpenAccount },
    { key: 'chatbot', label: 'AI Chatbot', icon: Bot, action: openAssistant },
  ];

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    window.dispatchEvent(new CustomEvent('udaan:open-chat'));
    window.setTimeout(() => window.dispatchEvent(new CustomEvent('udaan:chat-query', { detail: q })), 80);
    setQuery('');
  }

  const aside = (
    <aside className="flex h-full flex-col border-r border-[#e9b84a]/15 bg-[#06231d]/95 px-4 py-5 text-[#f8f1e2] backdrop-blur-xl">
      <button onClick={onHome} className="flex items-center gap-3 rounded-2xl px-2 py-2 text-left">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dba83e]/25 bg-[#0c3b31] text-[#f3c15d] shadow-[0_12px_35px_rgba(0,0,0,.18)]">
          <span className="font-display text-2xl font-bold">U</span>
        </span>
        <div>
          <div className="font-display text-2xl font-bold tracking-tight">Udaan</div>
          <div className="text-[10px] uppercase tracking-[.16em] text-[#f8f1e2]/45">Connecting opportunities</div>
        </div>
      </button>

      <nav className="mt-8 space-y-1.5">
        {menu.map((item) => {
          const Icon = item.icon;
          const selected = active === item.key;
          return (
            <button
              key={item.key}
              onClick={item.action}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${selected ? 'border border-[#e8b347]/25 bg-[#e5b24a]/14 text-[#ffd67a] shadow-[inset_3px_0_0_#e8b347]' : 'text-[#f8f1e2]/72 hover:bg-white/[.05] hover:text-[#f8f1e2]'}`}
            >
              <Icon size={18} />
              <span className="flex-1">{item.label}</span>
              {selected && <ChevronRight size={14} className="opacity-70" />}
            </button>
          );
        })}
      </nav>

      <div className="my-5 h-px bg-white/10" />

      <nav className="space-y-1.5">
        {secondary.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.key} onClick={item.action} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#f8f1e2]/72 transition hover:bg-white/[.05] hover:text-[#f8f1e2]">
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1.5 pt-5">
        <button onClick={onOpenAccount} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#f8f1e2]/72 transition hover:bg-white/[.05] hover:text-[#f8f1e2]"><UserRound size={18}/> Profile</button>
        <button onClick={onOpenAccount} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#f8f1e2]/72 transition hover:bg-white/[.05] hover:text-[#f8f1e2]"><Settings size={18}/> Settings</button>

        <div className="mt-4 rounded-2xl border border-[#e2b044]/20 bg-gradient-to-br from-[#0c3a30] to-[#102d24] p-4">
          <p className="font-display text-lg font-semibold text-[#f7eedc]">Your Dreams<br/>Our Mission</p>
          <p className="mt-2 text-[11px] leading-5 text-[#f7eedc]/52">Building a brighter India together.</p>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#071f1a] text-[#f7f0e2]">
      <div className="fixed inset-y-0 left-0 z-50 hidden w-[248px] lg:block">{aside}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
          <div className="relative h-full w-[280px] max-w-[86vw] shadow-2xl">
            {aside}
            <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/20 p-2 text-white"><X size={17}/></button>
          </div>
        </div>
      )}

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-40 border-b border-[#eab74f]/10 bg-[#071f1a]/90 backdrop-blur-xl">
          <div className="flex min-h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button onClick={() => setMobileOpen(true)} className="rounded-xl border border-white/10 bg-white/[.04] p-2.5 text-[#f7f0e2] lg:hidden"><Menu size={19}/></button>

            <form onSubmit={submitSearch} className="hidden min-w-0 flex-1 md:block">
              <label className="flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-[#0d3028] px-4 transition focus-within:border-[#e8b347]/35">
                <Search size={17} className="text-[#f0c566]/70" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search schemes, scholarships, loans..." className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#f8f1e2] outline-none placeholder:text-[#f8f1e2]/35" />
              </label>
            </form>

            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center rounded-full border border-white/10 bg-[#0d3028] px-2.5 py-1.5">
                <Languages size={13} className="mr-1.5 text-[#efbf5c]"/>
                <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="bg-transparent text-[11px] font-bold text-[#f8f1e2] outline-none">
                  <option value="en">EN</option><option value="hi">हिंदी</option><option value="hinglish">Hinglish</option>
                </select>
              </div>
              <button onClick={toggleTheme} className="rounded-full border border-white/10 bg-[#0d3028] p-2.5 text-[#f5c768]" aria-label="Toggle theme">{theme === 'dark' ? <Sun size={15}/> : <Moon size={15}/>}</button>
              {user && <button onClick={onOpenAccount} className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0d3028] px-2.5 py-1.5 text-xs font-bold text-[#f8f1e2]">{user.avatar ? <img src={user.avatar} alt="" className="h-6 w-6 rounded-full"/> : <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8b347] text-[#09231c]">{user.name?.[0]?.toUpperCase() || 'U'}</span>}<span className="hidden sm:inline">{user.name?.split(' ')[0] || 'Profile'}</span></button>}
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_80%_0%,rgba(220,166,60,.10),transparent_27%),linear-gradient(180deg,#071f1a_0%,#08241d_55%,#071d18_100%)]">
          {children}
        </main>
      </div>
    </div>
  );
}
