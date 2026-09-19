import { LogIn, UserPlus, ShieldCheck, History, Bookmark } from 'lucide-react';
import { useAuth } from '../lib/auth';

interface Props {
  onLogin: () => void;
  onSignup: () => void;
  onAccount: () => void;
}

export default function AccountCTA({ onLogin, onSignup, onAccount }: Props) {
  const { user } = useAuth();

  return (
    <section className="px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-teal/15 bg-teal-dark text-cream shadow-sm">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_1fr] lg:p-10">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-soft">Udaan Account</p>
            <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
              Save your scheme and scholarship journey in one place.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/75 sm:text-base">
              Sign in to keep your student or entrepreneur profile, matching history, saved schemes and saved scholarships synced with your account.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-cream/80">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2"><History size={14} /> Match history</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2"><Bookmark size={14} /> Saved opportunities</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2"><ShieldCheck size={14} /> Secure account</span>
            </div>
          </div>

          <div className="flex items-center lg:justify-end">
            {user ? (
              <button onClick={onAccount} className="w-full rounded-2xl bg-cream px-5 py-4 text-sm font-extrabold text-teal-dark transition hover:-translate-y-0.5 lg:max-w-xs">
                Open My Account →
              </button>
            ) : (
              <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-md lg:grid-cols-1">
                <button onClick={onLogin} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-sm font-extrabold transition hover:bg-white/15">
                  <LogIn size={17} /> Login
                </button>
                <button onClick={onSignup} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-4 text-sm font-extrabold text-ink transition hover:-translate-y-0.5">
                  <UserPlus size={17} /> Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
