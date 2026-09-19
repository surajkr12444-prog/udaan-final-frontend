import { usePreferences } from '../lib/preferences';
export default function StatsStrip() {
  const { language } = usePreferences();
  const labels = language === 'hi' ? ['बिज़नेस योजनाएँ','केंद्रीय छात्रवृत्तियाँ','भारत के राज्य + UT','औसत match समय'] : language === 'hinglish' ? ['Business schemes','Central scholarships','States + UTs','Avg. match time'] : ['Business schemes','Central scholarships','States + UTs','Avg. match time'];
  const stats = [['15',labels[0]],['12',labels[1]],['28 + 8',labels[2]],['~90 sec',labels[3]]];
  return <section className="border-b border-black/5 bg-cream-soft"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 sm:px-8 md:grid-cols-4">{stats.map(([value,label])=><div key={label} className="text-center md:text-left"><p className="font-display text-3xl font-semibold text-teal-dark">{value}</p><p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/50">{label}</p></div>)}</div></section>;
}
