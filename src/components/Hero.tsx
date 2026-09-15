import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Users2 } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
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

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-soft">
            <Sparkles size={14} /> AI-driven scheme discovery
          </span>

          <h1 className="mt-6 font-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Every entrepreneur deserves a fair shot at capital.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
            Udaan.AI reads your story — your identity, your business, your
            stage — and instantly matches you to the government loans and
            schemes built for people like you. No jargon, no dead ends.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onStart}
              className="rounded-full bg-gold px-7 py-4 text-base font-bold text-ink shadow-[0_6px_0_0_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_rgba(0,0,0,0.25)] active:translate-y-0"
            >
              Start My Free Match →
            </button>
            <div className="flex items-center gap-2 text-sm text-cream/60">
              <ShieldCheck size={18} className="text-teal-light" />
              Takes under 2 minutes · No login needed
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/10 pt-8">
            {[
              ["16", "Government schemes indexed"],
              ["₹2 Cr", "Max funding matchable"],
              ["92%", "Match relevance score"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-3xl font-semibold text-gold-soft">{n}</p>
                <p className="text-xs uppercase tracking-wide text-cream/50">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="rotate-2 rounded-3xl border border-cream/10 bg-ink-soft/80 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-cream/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-terracotta" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-teal-light" />
              </div>
              <span className="text-xs text-cream/40">match-engine.ai</span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { name: "Stand-Up India", pct: 96 },
                { name: "PMEGP", pct: 89 },
                { name: "NHFDC Micro-Finance", pct: 74 },
              ].map((row, i) => (
                <div key={row.name} className="rounded-xl bg-cream/5 p-3.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-cream/90">{row.name}</span>
                    <span className="font-display font-semibold text-gold-soft">{row.pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.pct}%` }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-light to-gold"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-gold/20 bg-gold/5 p-3 text-xs text-cream/70">
              <Users2 size={16} className="shrink-0 text-gold-soft" />
              Matched using your identity, sector, stage & funding need.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
