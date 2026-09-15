import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, GraduationCap, Briefcase, Calculator, ArrowRight, ExternalLink } from "lucide-react";

interface HeroProps {
  onStartEntrepreneur: () => void;
  onStartStudent: () => void;
  onOpenEmi: () => void;
}

export default function Hero({ onStartEntrepreneur, onStartStudent, onOpenEmi }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute inset-0 grain-overlay opacity-40" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #E8A33D, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-[-10%] h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #C1502E, transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Left Column: Heading and Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-soft">
            <Sparkles size={14} /> National Scheme & Scholarship Matching
          </div>

          <h1 className="mt-6 font-display text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Empowering Entrepreneurs & Students with Government Capital.
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-cream/80">
            <strong>Udaan</strong> reads your profile and instantly connects you to verified
            Government of India schemes — whether you are an <strong>entrepreneur</strong> seeking
            subsidized business loans, or a <strong>student</strong> looking for national central scholarships.
            Direct links to official application portals.
          </p>

          {/* DUAL ACTION CARDS / BUTTONS */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {/* Card 1: Entrepreneurs */}
            <div
              onClick={onStartEntrepreneur}
              className="group cursor-pointer rounded-2xl border border-gold/30 bg-gold/10 p-5 backdrop-blur-xs transition hover:border-gold hover:bg-gold/15"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-ink font-bold shadow-xs">
                  <Briefcase size={20} />
                </span>
                <span className="text-xs font-bold text-gold-soft group-hover:translate-x-1 transition">
                  Start Flow →
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-cream">
                I am an Entrepreneur
              </h3>
              <p className="mt-1 text-xs text-cream/70 leading-relaxed">
                Find Mudra, PMEGP, Stand-Up India & MSME loans with subsidies up to 35%.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartEntrepreneur();
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-gold-soft hover:underline"
              >
                Find Business Schemes <ArrowRight size={13} />
              </button>
            </div>

            {/* Card 2: Students */}
            <div
              onClick={onStartStudent}
              className="group cursor-pointer rounded-2xl border border-teal-light/30 bg-teal-light/10 p-5 backdrop-blur-xs transition hover:border-teal-light hover:bg-teal-light/15"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-cream font-bold shadow-xs">
                  <GraduationCap size={22} />
                </span>
                <span className="text-xs font-bold text-teal-light group-hover:translate-x-1 transition">
                  Start Flow →
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-cream">
                I am a Student
              </h3>
              <p className="mt-1 text-xs text-cream/70 leading-relaxed">
                Find Post-Matric, PM-YASASVI, AICTE Pragati & Central Sector scholarships up to ₹1.25L.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartStudent();
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-teal-light hover:underline"
              >
                Find Student Scholarships <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Quick Sub-Links */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-cream/70">
            <button
              onClick={onOpenEmi}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/5 px-3.5 py-1.5 font-semibold text-cream hover:bg-cream/10 transition"
            >
              <Calculator size={14} className="text-gold-soft" /> Calculate Loan EMI
            </button>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-teal-light" />
              Direct redirect to official government portals
            </div>
          </div>

          {/* Key Statistics */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-cream/10 pt-6">
            {[
              ["16+", "MSME & Business Schemes"],
              ["14+", "Central Scholarships"],
              ["₹2 Cr", "Max Business Funding"],
              ["100%", "Official Govt Links"],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold text-gold-soft">{num}</p>
                <p className="text-[11px] uppercase tracking-wide text-cream/50">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Live Matching Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-md space-y-4"
        >
          {/* Box 1: Entrepreneur preview */}
          <div className="rounded-2xl border border-cream/10 bg-ink-soft/90 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-cream/10 pb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gold-soft">
                <Briefcase size={14} /> Entrepreneur Match
              </span>
              <span className="text-[11px] text-cream/40">JanSamarth & KVIC</span>
            </div>
            <div className="mt-3 space-y-2.5">
              {[
                { name: "PMEGP (Up to 35% Subsidy)", pct: 96, portal: "kviconline.gov.in" },
                { name: "Pradhan Mantri MUDRA", pct: 91, portal: "mudra.org.in" },
              ].map((row, i) => (
                <div key={row.name} className="rounded-xl bg-cream/5 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-cream/90">{row.name}</span>
                    <span className="font-bold text-gold-soft">{row.pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.pct}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-light to-gold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Box 2: Student preview */}
          <div className="rounded-2xl border border-teal-light/20 bg-ink-soft/90 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-cream/10 pb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-teal-light">
                <GraduationCap size={15} /> Student Scholarship Match
              </span>
              <span className="text-[11px] text-cream/40">scholarships.gov.in</span>
            </div>
            <div className="mt-3 space-y-2.5">
              {[
                { name: "AICTE Pragati (₹50k/yr for Girls)", pct: 98 },
                { name: "Central Sector PM-USP (College/UG)", pct: 89 },
              ].map((row, i) => (
                <div key={row.name} className="rounded-xl bg-cream/5 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-cream/90">{row.name}</span>
                    <span className="font-bold text-teal-light">{row.pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.pct}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-teal to-teal-light"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
