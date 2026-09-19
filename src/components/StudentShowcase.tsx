import { GraduationCap, ExternalLink, ArrowRight, Award } from "lucide-react";
import { openPortalWithGuide } from "../lib/portalGuide";
import { SCHOLARSHIPS } from "../data/scholarships";

interface Props {
  onStartStudent: () => void;
}

export default function StudentShowcase({ onStartStudent }: Props) {
  const featured = SCHOLARSHIPS.slice(0, 4);

  return (
    <section id="scholarships" className="border-t border-black/5 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-dark">
              <GraduationCap size={16} /> Central & State Scholarships
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              National Scholarships for School, College & Technical Students
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-ink/70">
              Government schemes provide tuition fee waivers, annual grants up to ₹1.25 Lakh, and
              laptop/contingency allowances. All applications redirect to official government portals.
            </p>
          </div>

          <button
            onClick={onStartStudent}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-bold text-cream shadow-md transition hover:bg-teal-dark hover:-translate-y-0.5 active:translate-y-0"
          >
            Check My Eligibility <ArrowRight size={16} />
          </button>
        </div>

        {/* Scholarships Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <div
              key={s.id}
              className="group flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 shadow-xs transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                  style={{ backgroundColor: s.colorTag }}
                >
                  {s.shortName}
                </span>

                <h3 className="mt-3 font-display text-base font-bold text-ink group-hover:text-teal transition">
                  {s.name}
                </h3>
                <p className="mt-1 text-xs text-ink/50">{s.ministry}</p>
                <p className="mt-3 text-xs leading-relaxed text-ink/70 line-clamp-3">
                  {s.tagline}
                </p>
              </div>

              <div className="mt-5 border-t border-ink/5 pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-teal-dark">
                  <span>{s.amountLabel}</span>
                </div>
                <button
                  onClick={() => openPortalWithGuide({ title: s.name, portalName: s.portalName, url: s.applyUrl, kind: 'scholarship' })}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-black/[0.02] py-2 text-xs font-semibold text-ink/80 hover:bg-black/5 hover:text-ink transition"
                >
                  Visit {s.portalName} + Guide <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Official Portal Quick Access Banner */}
        <div className="mt-10 rounded-3xl border border-teal/20 bg-gradient-to-r from-teal/10 to-gold/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal text-cream shadow-xs">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                National Scholarship Portal (scholarships.gov.in)
              </h3>
              <p className="mt-1 text-xs text-ink/75 max-w-xl">
                One-stop platform for Central Sector, AICTE, UGC, and State scholarships.
                Single registration (OTR) with Aadhaar links you to dozens of government grants.
              </p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => openPortalWithGuide({ title: 'National Scholarship Portal application', portalName: 'NSP', url: 'https://scholarships.gov.in/', kind: 'scholarship' })}
              className="rounded-full bg-ink px-5 py-3 text-xs font-bold text-cream hover:bg-ink-soft transition shadow-xs flex items-center gap-1.5"
            >
              Open NSP + Udaan Guide <ExternalLink size={14} />
            </button>
            <button
              onClick={onStartStudent}
              className="rounded-full bg-teal px-5 py-3 text-xs font-bold text-cream hover:bg-teal-dark transition shadow-xs"
            >
              Start Student Match
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
