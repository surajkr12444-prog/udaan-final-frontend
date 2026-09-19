import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Languages, LockKeyhole, Mail, Moon, ShieldCheck, Sparkles, Sun, UserRound } from 'lucide-react';
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
    <main className="relative min-h-screen overflow-hidden bg-[#071f1a] text-[#f7f0e2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(224,170,63,.14),transparent_27%),radial-gradient(circle_at_16%_82%,rgba(34,124,105,.15),transparent_30%),linear-gradient(145deg,#071f1a,#09271f_55%,#061914)]" />
      <div className="grain-overlay absolute inset-0 opacity-30" />
      <motion.div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full border border-[#e0aa3f]/12" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute -bottom-48 -left-40 h-[38rem] w-[38rem] rounded-full border border-[#2f8877]/12" animate={{ rotate: -360 }} transition={{ duration: 46, repeat: Infinity, ease: 'linear' }} />

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-9">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e0aa3f]/20 bg-[#0c382f] shadow-[0_0_35px_rgba(224,170,63,.10)]"><Compass size={23} className="text-[#f0c35e]" /></span>
          <div><p className="font-display text-xl font-bold tracking-tight">Udaan</p><p className="text-[9px] uppercase tracking-[.28em] text-[#f7f0e2]/42">Connecting opportunities</p></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/10 bg-[#0d3028]/80 px-3 py-2 backdrop-blur-xl"><Languages size={14} className="mr-2 text-[#efbf5c]"/><select value={language} onChange={(e)=>setLanguage(e.target.value as Language)} className="bg-transparent text-xs font-bold text-[#f7f0e2] outline-none"><option value="en">English</option><option value="hi">हिन्दी</option><option value="hinglish">Hinglish</option></select></div>
          <button onClick={toggleTheme} className="rounded-full border border-white/10 bg-[#0d3028]/80 p-2.5 text-[#efbf5c] backdrop-blur-xl" aria-label="Toggle theme">{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</button>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] max-w-7xl items-center justify-center px-5 pb-10 pt-2 sm:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_520px]">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e2ae48]/25 bg-[#e2ae48]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#f2c76c]"><Sparkles size={14}/> {t('gatewayEyebrow')}</div>
            <h1 className="mt-7 max-w-2xl font-display text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">Government opportunities, <span className="text-[#f0c35e]">made easier.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#f7f0e2]/68">{t('gatewayBody')}</p>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 text-sm text-[#f7f0e2]/72">
              {['Government schemes','Student scholarships','Business loans','Step-by-step guidance'].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-[#0d3028]/70 px-4 py-3 backdrop-blur-md">{item}</div>)}
            </div>
            <p className="mt-10 text-xs uppercase tracking-[.3em] text-[#f7f0e2]/35">Learn · Apply · Grow · Achieve</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .45 }} className="mx-auto w-full max-w-[500px]">
            <div className="rounded-[2rem] border border-[#e0aa3f]/18 bg-[#0a2a23]/88 p-5 shadow-[0_30px_100px_rgba(0,0,0,.42)] backdrop-blur-2xl sm:p-8">
              <div className="mb-6 text-center lg:hidden"><Compass className="mx-auto text-[#f0c35e]" size={30}/><h1 className="mt-2 font-display text-2xl font-bold">Udaan</h1></div>
              <div className="grid grid-cols-2 border-b border-white/10">
                <button onClick={()=>switchMode('login')} className={`relative py-3 text-sm font-bold ${mode==='login'?'text-[#f7f0e2]':'text-[#f7f0e2]/38'}`}>{t('login')}{mode==='login'&&<span className="absolute inset-x-7 bottom-0 h-0.5 rounded-full bg-[#f0c35e]"/>}</button>
                <button onClick={()=>switchMode('signup')} className={`relative py-3 text-sm font-bold ${mode==='signup'?'text-[#f7f0e2]':'text-[#f7f0e2]/38'}`}>{t('signup')}{mode==='signup'&&<span className="absolute inset-x-7 bottom-0 h-0.5 rounded-full bg-[#f0c35e]"/>}</button>
              </div>

              <h2 className="mt-7 text-center font-display text-2xl font-bold">{mode==='login'?t('loginTitle'):t('signupTitle')}</h2>
              <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-[#f7f0e2]/52">{mode==='login'?t('loginBody'):t('signupBody')}</p>

              <div className="mt-6 flex justify-center"><GoogleSignIn /></div>
              <div className="my-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#f7f0e2]/28"><span className="h-px flex-1 bg-white/10"/>OR<span className="h-px flex-1 bg-white/10"/></div>

              <form onSubmit={submit} className="space-y-3">
                {mode==='signup' && <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#10362d]/75 px-4 transition focus-within:border-[#e4b047]/55"><UserRound size={16} className="text-[#f7f0e2]/38"/><input placeholder={t('name')} value={name} onChange={e=>setName(e.target.value)} required className="w-full bg-transparent py-3.5 text-sm text-[#f7f0e2] outline-none placeholder:text-[#f7f0e2]/28" /></label>}
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#10362d]/75 px-4 transition focus-within:border-[#e4b047]/55"><Mail size={16} className="text-[#f7f0e2]/38"/><input type="email" placeholder={t('email')} value={email} onChange={e=>setEmail(e.target.value)} required className="w-full bg-transparent py-3.5 text-sm text-[#f7f0e2] outline-none placeholder:text-[#f7f0e2]/28" /></label>
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#10362d]/75 px-4 transition focus-within:border-[#e4b047]/55"><LockKeyhole size={16} className="text-[#f7f0e2]/38"/><input type="password" placeholder={t('password')} value={password} onChange={e=>setPassword(e.target.value)} minLength={8} required className="w-full bg-transparent py-3.5 text-sm text-[#f7f0e2] outline-none placeholder:text-[#f7f0e2]/28" /></label>
                {mode==='signup'&&<p className="text-[10px] text-[#f7f0e2]/34">Minimum 8 characters with a letter and a number.</p>}
                {error && <p className="rounded-xl border border-red-400/15 bg-red-400/10 px-3 py-2.5 text-xs font-bold text-red-200">{error}</p>}
                <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#dda63c] to-[#f3c761] py-3.5 text-sm font-extrabold text-[#08231c] shadow-[0_10px_35px_rgba(224,170,63,.15)] transition hover:-translate-y-0.5 disabled:opacity-60">{busy?'Please wait…':mode==='signup'?t('signup'):t('login')} <ArrowRight size={16}/></button>
              </form>

              <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[10px] text-[#f7f0e2]/35"><ShieldCheck size={12}/> Secure login. Passwords are stored only as cryptographic hashes.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
