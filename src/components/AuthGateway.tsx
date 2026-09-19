import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, GraduationCap, LockKeyhole, Mail, Moon, Sun, UserRound, Languages, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
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

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-ink p-12 text-cream lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-gold-soft"><Sparkles size={14}/>{t('gatewayEyebrow')}</div>
            <h1 className="mt-8 max-w-xl font-display text-5xl font-bold leading-[1.06]">{t('gatewayTitle')}</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-cream/70">{t('gatewayBody')}</p>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><BriefcaseBusiness className="text-gold-soft"/><h3 className="mt-3 font-bold">Entrepreneurs</h3><p className="mt-1 text-sm text-cream/60">Mudra, PMEGP, Stand-Up India, MSME funding and official portal guidance.</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><GraduationCap className="text-teal-light"/><h3 className="mt-3 font-bold">Students</h3><p className="mt-1 text-sm text-cream/60">NSP, AICTE, PM-YASASVI, Central Sector scholarships and document guidance.</p></div>
          </div>
        </section>

        <section className="flex items-center justify-center p-5 sm:p-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
            <div className="mb-6 flex items-center justify-between">
              <button className="flex items-center gap-2 font-display text-2xl font-bold"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-cream">U</span>Udaan</button>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-full border border-ink/10 bg-white px-2 py-1"><Languages size={14} className="mr-1 text-teal"/><select value={language} onChange={(e)=>setLanguage(e.target.value as Language)} className="bg-transparent text-xs font-bold outline-none"><option value="en">English</option><option value="hi">हिन्दी</option><option value="hinglish">Hinglish</option></select></div>
                <button onClick={toggleTheme} className="rounded-full border border-ink/10 bg-white p-2 text-ink" aria-label="Toggle theme">{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-xl sm:p-8">
              <div className="grid grid-cols-2 rounded-2xl bg-black/[0.04] p-1">
                <button onClick={()=>{setMode('login');setError('')}} className={`rounded-xl py-2.5 text-sm font-extrabold ${mode==='login'?'bg-white text-teal-dark shadow-sm':'text-ink/45'}`}>{t('login')}</button>
                <button onClick={()=>{setMode('signup');setError('')}} className={`rounded-xl py-2.5 text-sm font-extrabold ${mode==='signup'?'bg-white text-teal-dark shadow-sm':'text-ink/45'}`}>{t('signup')}</button>
              </div>
              <h2 className="mt-7 font-display text-3xl font-bold">{mode==='login'?t('loginTitle'):t('signupTitle')}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">{mode==='login'?t('loginBody'):t('signupBody')}</p>

              <form onSubmit={submit} className="mt-6 space-y-3">
                {mode==='signup' && <label className="block"><span className="mb-1.5 block text-xs font-bold text-ink/60">{t('name')}</span><div className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-cream/60 px-4"><UserRound size={16} className="text-teal"/><input value={name} onChange={e=>setName(e.target.value)} required className="w-full bg-transparent py-3.5 text-sm outline-none" /></div></label>}
                <label className="block"><span className="mb-1.5 block text-xs font-bold text-ink/60">{t('email')}</span><div className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-cream/60 px-4"><Mail size={16} className="text-teal"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full bg-transparent py-3.5 text-sm outline-none" /></div></label>
                <label className="block"><span className="mb-1.5 block text-xs font-bold text-ink/60">{t('password')}</span><div className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-cream/60 px-4"><LockKeyhole size={16} className="text-teal"/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={8} required className="w-full bg-transparent py-3.5 text-sm outline-none" /></div>{mode==='signup'&&<span className="mt-1 block text-[11px] text-ink/45">Minimum 8 characters, with a letter and a number.</span>}</label>
                {error && <p className="rounded-xl bg-terracotta/10 px-3 py-2 text-xs font-bold text-terracotta">{error}</p>}
                <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal py-3.5 text-sm font-extrabold text-cream shadow-md transition hover:-translate-y-0.5 disabled:opacity-60">{busy?'Please wait…':t('continueEmail')} <ArrowRight size={16}/></button>
              </form>

              <div className="my-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-ink/30"><span className="h-px flex-1 bg-ink/10"/>OR<span className="h-px flex-1 bg-ink/10"/></div>
              <p className="mb-3 text-center text-xs text-ink/50">{t('googleContinue')}</p>
              <div className="flex justify-center"><GoogleSignIn /></div>
              <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] text-ink/45"><ShieldCheck size={13}/> Secure authentication. Your password is stored only as a cryptographic hash.</p>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
