import { useEffect, useState } from 'react';
import { X, UserRound, History, Bookmark, LogOut, GraduationCap, Briefcase } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { fetchAccountDashboard } from '../lib/api';
import { usePreferences } from '../lib/preferences';

interface Props { open: boolean; onClose: () => void; }
interface DashboardData { profile: any; history: any[]; applications: any[]; scholarshipApplications: any[]; }

export default function AccountPanel({ open, onClose }: Props) {
  const { user, logout } = useAuth();
  const { t } = usePreferences();
  const [data, setData] = useState<DashboardData>({ profile: null, history: [], applications: [], scholarshipApplications: [] });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open || !user) return;
    setBusy(true);
    fetchAccountDashboard().then(setData).catch((e) => console.warn('Dashboard load failed', e)).finally(() => setBusy(false));
  }, [open, user]);

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-cream p-5 shadow-2xl sm:p-7" onMouseDown={(e)=>e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal">Udaan {t('account')}</p><h2 className="font-display text-3xl font-bold text-ink">Your dashboard</h2></div>
          <button onClick={onClose} className="rounded-full border border-black/10 bg-white p-2 text-ink/70"><X size={18}/></button>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-5 sm:flex-row sm:items-center">
          {user.avatar ? <img src={user.avatar} alt="" className="h-14 w-14 rounded-full"/> : <UserRound className="text-teal" size={36}/>}<div className="min-w-0 flex-1"><p className="font-bold text-ink">{user.name}</p><p className="text-sm text-ink/55">{user.email}</p></div>
          <button onClick={()=>{logout();onClose();}} className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta/10 px-4 py-2 text-xs font-bold text-terracotta"><LogOut size={15}/>{t('logout')}</button>
        </div>

        {busy ? <p className="mt-6 text-sm text-ink/55">Loading saved data…</p> : <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-3xl border border-ink/10 bg-white p-5"><div className="flex items-center gap-2 font-bold"><UserRound size={17} className="text-teal"/> Saved profile</div><div className="mt-3 grid grid-cols-2 gap-2 text-xs"><div className="rounded-xl bg-black/[0.03] p-3"><strong>Business</strong><br/>{data.profile?.entrepreneur?'Saved':'Not saved yet'}</div><div className="rounded-xl bg-black/[0.03] p-3"><strong>Student</strong><br/>{data.profile?.student?'Saved':'Not saved yet'}</div></div></section>
          <section className="rounded-3xl border border-ink/10 bg-white p-5"><div className="flex items-center gap-2 font-bold"><History size={17} className="text-teal"/> Match history</div><p className="mt-1 text-xs text-ink/50">{data.history.length} saved match run{data.history.length===1?'':'s'}</p><div className="mt-3 space-y-2">{data.history.slice(0,4).map((h)=><div key={h._id} className="flex items-center justify-between rounded-xl bg-black/[0.03] p-3 text-xs"><span className="flex items-center gap-2">{h.kind==='student'?<GraduationCap size={14}/>:<Briefcase size={14}/>} {h.kind==='student'?'Scholarship':'Business'} match</span><span className="text-ink/45">{new Date(h.createdAt).toLocaleDateString()}</span></div>)}{!data.history.length&&<p className="text-xs text-ink/45">Run a match to create history.</p>}</div></section>
          <section className="rounded-3xl border border-ink/10 bg-white p-5 md:col-span-2"><div className="flex items-center gap-2 font-bold"><Bookmark size={17} className="text-teal"/> Saved opportunities</div><div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs">{data.applications.map((a)=><div key={a._id} className="rounded-xl bg-black/[0.03] p-3"><strong>{a.scheme?.shortName||a.scheme?.name||'Scheme'}</strong><br/><span className="text-ink/50">Business • {a.status}</span></div>)}{data.scholarshipApplications.map((a)=><div key={a._id} className="rounded-xl bg-black/[0.03] p-3"><strong>{a.scholarship?.shortName||a.scholarship?.name||'Scholarship'}</strong><br/><span className="text-ink/50">Scholarship • {a.status}</span></div>)}{!data.applications.length&&!data.scholarshipApplications.length&&<p className="text-ink/45">Save an opportunity from your results.</p>}</div></section>
        </div>}
      </div>
    </div>
  );
}
