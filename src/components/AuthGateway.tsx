import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Feather, Languages, LockKeyhole, Mail, Moon, ShieldCheck, Sparkles, Sun, UserRound } from 'lucide-react';
import GoogleSignIn from './GoogleSignIn';
import { useAuth } from '../lib/auth';
import { usePreferences, type Language } from '../lib/preferences';

type Mode = 'login' | 'signup';

export default function AuthGateway() {
  const { loginWithEmail, signupWithEmail } = useAuth();
  const { t, language, setLanguage, theme, toggleTheme } = usePreferences();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      if (mode === 'signup') await signupWithEmail(name, email, password);
      else await loginWithEmail(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally { setBusy(false); }
  }

  const switchMode = (next: Mode) => { setMode(next); setError(''); };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040c18] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,124,255,.16),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(18,78,148,.2),transparent_28%),linear-gradient(135deg,#030913,#081426_55%,#02070f)]" />
      <motion.div className="absolute -left-32 top-24 h-[34rem] w-[34rem] rounded-full border border-blue-300/10" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute -right-36 bottom-[-9rem] h-[40rem] w-[40rem] rounded-full border border-sky-300/10" animate={{ rotate: -360 }} transition={{ duration: 38, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-blue-950/25 to-transparent" />

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-9">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-300/20 bg-white/[.05] shadow-[0_0_35px_rgba(56,189,248,.12)]"><Feather size={23} className="text-sky-300" /></span>
          <div><p className="text-xl font-semibold tracking-tight">Udaan</p><p className="text-[9px] uppercase tracking-[.28em] text-sky-100/45">Opportunities beyond boundaries</p></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/10 bg-white/[.05] px-3 py-2 backdrop-blur-xl"><Languages size={14} className="mr-2 text-sky-300"/><select value={language} onChange={(e)=>setLanguage(e.target.value as Language)} className="bg-transparent text-xs font-bold text-white outline-none"><option className="bg-slate-950" value="en">English</option><option className="bg-slate-950" value="hi">हिन्दी</option><option className="bg-slate-950" value="hinglish">Hinglish</option></select></div>
          <button onClick={toggleTheme} className="rounded-full border border-white/10 bg-white/[.05] p-2.5 text-sky-100 backdrop-blur-xl" aria-label="Toggle theme">{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</button>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] max-w-7xl items-center justify-center px-5 pb-10 pt-2 sm:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_520px]">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-300/[.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[.2em] text-sky-200"><Sparkles size={14}/> {t('gatewayEyebrow')}</div>
            <h1 className="mt-7 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight xl:text-6xl">From aspirations <span className="text-sky-400">to achievements.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">{t('gatewayBody')}</p>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 text-sm text-slate-300">
              {['Government schemes','Student scholarships','Business loans','Step-by-step guidance'].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3 backdrop-blur-md">{item}</div>)}
            </div>
            <p className="mt-10 text-xs uppercase tracking-[.3em] text-slate-500">Learn · Apply · Grow · Achieve</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .45 }} className="mx-auto w-full max-w-[500px]">
            <div className="rounded-[2rem] border border-white/10 bg-[#0b1728]/80 p-5 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:p-8">
              <div className="mb-6 text-center lg:hidden"><Feather className="mx-auto text-sky-300" size={30}/><h1 className="mt-2 text-2xl font-semibold">Udaan</h1></div>
              <div className="grid grid-cols-2 border-b border-white/10">
                <button onClick={()=>switchMode('login')} className={`relative py-3 text-sm font-bold ${mode==='login'?'text-white':'text-slate-500'}`}>{t('login')}{mode==='login'&&<span className="absolute inset-x-7 bottom-0 h-0.5 rounded-full bg-sky-400"/>}</button>
                <button onClick={()=>switchMode('signup')} className={`relative py-3 text-sm font-bold ${mode==='signup'?'text-white':'text-slate-500'}`}>{t('signup')}{mode==='signup'&&<span className="absolute inset-x-7 bottom-0 h-0.5 rounded-full bg-sky-400"/>}</button>
              </div>

              <h2 className="mt-7 text-center text-2xl font-semibold">{mode==='login'?t('loginTitle'):t('signupTitle')}</h2>
              <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-400">{mode==='login'?t('loginBody'):t('signupBody')}</p>

              <div className="mt-6 flex justify-center"><GoogleSignIn /></div>
              <div className="my-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.22em] text-slate-600"><span className="h-px flex-1 bg-white/10"/>OR<span className="h-px flex-1 bg-white/10"/></div>

              <form onSubmit={submit} className="space-y-3">
                {mode==='signup' && <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.035] px-4 transition focus-within:border-sky-400/60"><UserRound size={16} className="text-slate-500"/><input placeholder={t('name')} value={name} onChange={e=>setName(e.target.value)} required className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600" /></label>}
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.035] px-4 transition focus-within:border-sky-400/60"><Mail size={16} className="text-slate-500"/><input type="email" placeholder={t('email')} value={email} onChange={e=>setEmail(e.target.value)} required className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600" /></label>
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.035] px-4 transition focus-within:border-sky-400/60"><LockKeyhole size={16} className="text-slate-500"/><input type="password" placeholder={t('password')} value={password} onChange={e=>setPassword(e.target.value)} minLength={8} required className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600" /></label>
                {mode==='signup'&&<p className="text-[10px] text-slate-500">Minimum 8 characters with a letter and a number.</p>}
                {error && <p className="rounded-xl border border-red-400/15 bg-red-400/10 px-3 py-2.5 text-xs font-bold text-red-300">{error}</p>}
                <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-sky-400 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_35px_rgba(14,165,233,.2)] transition hover:-translate-y-0.5 disabled:opacity-60">{busy?'Please wait…':mode==='signup'?t('signup'):t('login')} <ArrowRight size={16}/></button>
              </form>

              <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-500"><ShieldCheck size={12}/> Secure login. Passwords are stored only as cryptographic hashes.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
