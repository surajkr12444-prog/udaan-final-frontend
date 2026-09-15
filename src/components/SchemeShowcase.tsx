import { SCHEMES } from "../data/schemes";
import { ArrowUpRight } from "lucide-react";

interface Props {
  onStart: () => void;
}

export default function SchemeShowcase({ onStart }: Props) {
  const featured = SCHEMES.slice(0, 6);
  return (
    <section id="schemes" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
            Scheme directory
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A glimpse of what our AI searches through.
          </h2>
        </div>
        <button
          onClick={onStart}
          className="flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-ink/5"
        >
          See my personal matches <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s) => (
          <div
            key={s.id}
            className="flex flex-col rounded-3xl border border-ink/10 bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className="inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: s.colorTag }}
            >
              {s.provider.split(" ").slice(0, 2).join(" ")}
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
              {s.shortName}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{s.tagline}</p>
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4 text-xs font-semibold text-ink/50">
              <span>{s.amountLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
