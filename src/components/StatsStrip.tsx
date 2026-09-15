const STATS = [
  { label: "Entrepreneurs guided", value: "52,000+" },
  { label: "Schemes tracked live", value: "16" },
  { label: "States covered", value: "28 + 8 UTs" },
  { label: "Avg. time to match", value: "90 sec" },
];

export default function StatsStrip() {
  return (
    <section className="border-b border-black/5 bg-cream-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 sm:px-8 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <p className="font-display text-3xl font-semibold text-teal-dark">{s.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/50">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
