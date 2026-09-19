import { useEffect, useState } from 'react';
import { X, UserRound, History, Bookmark, LogOut, GraduationCap, Briefcase } from 'lucide-react';
import { useAuth } from '../lib/auth';
import GoogleSignIn from './GoogleSignIn';
import { fetchAccountDashboard } from '../lib/api';

interface Props {
  open: boolean;
  onClose: () => void;
  authMode?: 'login' | 'signup';
}


interface DashboardData {
  profile: any;
  history: any[];
  applications: any[];
  scholarshipApplications: any[];
}

export default function AccountPanel({ open, onClose, authMode = 'login' }: Props) {
  const { user, logout, loading } = useAuth();
  const [data, setData] = useState<DashboardData>({ profile: null, history: [], applications: [], scholarshipApplications: [] });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open || !user) return;
    setBusy(true);
    fetchAccountDashboard()
      .then(setData)
      .catch((e) => console.warn('Dashboard load failed', e))
      .finally(() => setBusy(false));
  }, [open, user]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-black/35 backdrop-blur-sm" onMouseDown={onClose}>
      <aside
        className="h-full w-full max-w-md overflow-y-auto bg-cream p-5 shadow-2xl sm:p-7"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal">Udaan Account</p>
            <h2 className="font-display text-2xl font-bold text-ink">Your dashboard</h2>
          </div>
          <button onClick={onClose} className="rounded-full border border-black/10 bg-white p-2 text-ink/70 hover:bg-black/5">
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <p className="mt-8 text-sm text-ink/60">Checking your session…</p>
        ) : !user ? (
          <div className="mt-8">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-ink/10">
              <div className="flex rounded-2xl bg-black/[0.04] p-1 text-xs font-extrabold">
                <div className={`flex-1 rounded-xl px-3 py-2 text-center ${authMode === 'login' ? 'bg-white text-teal-dark shadow-sm' : 'text-ink/45'}`}>Login</div>
                <div className={`flex-1 rounded-xl px-3 py-2 text-center ${authMode === 'signup' ? 'bg-white text-teal-dark shadow-sm' : 'text-ink/45'}`}>Sign Up</div>
              </div>
              <UserRound className="mt-5 text-teal" size={28} />
              <h3 className="mt-3 font-display text-xl font-bold text-ink">
                {authMode === 'signup' ? 'Create your Udaan account' : 'Welcome back to Udaan'}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {authMode === 'signup'
                  ? 'Continue with Google to create your account. Your first sign-in automatically registers you and securely saves your profile, match history and saved opportunities.'
                  : 'Continue with Google to access your saved profile, match history, schemes and scholarships.'}
              </p>
              <div className="mt-5"><GoogleSignIn /></div>
              <p className="mt-4 text-[11px] leading-5 text-ink/45">
                No separate password is required. Google securely verifies your identity; Udaan stores only the account details needed for your dashboard.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-7 space-y-5">
            <div className="flex items-center gap-3 rounded-3xl bg-white p-5 border border-ink/10 shadow-sm">
              {user.avatar ? <img src={user.avatar} alt="" className="h-12 w-12 rounded-full" /> : <UserRound className="text-teal" />}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink truncate">{user.name}</p>
                <p className="text-xs text-ink/55 truncate">{user.email}</p>
              </div>
              <button onClick={logout} className="rounded-full p-2 text-terracotta hover:bg-terracotta/10" title="Sign out"><LogOut size={17} /></button>
            </div>

            {busy ? <p className="text-sm text-ink/55">Loading saved data…</p> : (
              <>
                <section className="rounded-3xl bg-white p-5 border border-ink/10">
                  <div className="flex items-center gap-2 font-bold text-ink"><UserRound size={17} className="text-teal" /> Saved profile</div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-black/[0.03] p-3"><strong>Business profile</strong><br />{data.profile?.entrepreneur ? 'Saved' : 'Not saved yet'}</div>
                    <div className="rounded-xl bg-black/[0.03] p-3"><strong>Student profile</strong><br />{data.profile?.student ? 'Saved' : 'Not saved yet'}</div>
                  </div>
                </section>

                <section className="rounded-3xl bg-white p-5 border border-ink/10">
                  <div className="flex items-center gap-2 font-bold text-ink"><History size={17} className="text-teal" /> Match history</div>
                  <p className="mt-1 text-xs text-ink/50">{data.history.length} saved match run{data.history.length === 1 ? '' : 's'}</p>
                  <div className="mt-3 space-y-2">
                    {data.history.slice(0, 5).map((h) => (
                      <div key={h._id} className="flex items-center justify-between rounded-xl bg-black/[0.03] p-3 text-xs">
                        <span className="flex items-center gap-2">{h.kind === 'student' ? <GraduationCap size={14} /> : <Briefcase size={14} />}{h.kind === 'student' ? 'Scholarship match' : 'Business scheme match'}</span>
                        <span className="text-ink/45">{new Date(h.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))}
                    {!data.history.length && <p className="text-xs text-ink/45">Sign in, then run a match to create history.</p>}
                  </div>
                </section>

                <section className="rounded-3xl bg-white p-5 border border-ink/10">
                  <div className="flex items-center gap-2 font-bold text-ink"><Bookmark size={17} className="text-teal" /> Saved items</div>
                  <div className="mt-3 space-y-2 text-xs">
                    {data.applications.map((a) => <div key={a._id} className="rounded-xl bg-black/[0.03] p-3"><strong>{a.scheme?.shortName || a.scheme?.name || 'Scheme'}</strong><br /><span className="text-ink/50">Business scheme • {a.status}</span></div>)}
                    {data.scholarshipApplications.map((a) => <div key={a._id} className="rounded-xl bg-black/[0.03] p-3"><strong>{a.scholarship?.shortName || a.scholarship?.name || 'Scholarship'}</strong><br /><span className="text-ink/50">Scholarship • {a.status}</span></div>)}
                    {!data.applications.length && !data.scholarshipApplications.length && <p className="text-ink/45">Use the Save button on any result card.</p>}
                  </div>
                </section>
              </>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
