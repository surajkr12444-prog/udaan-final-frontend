import { UserRoundCog, Cpu, ListChecks } from "lucide-react";

const STEPS = [
  {
    icon: UserRoundCog,
    title: "Tell us your story",
    body: "Share your background, business stage, sector and funding need through a friendly 5-step form — no paperwork required.",
  },
  {
    icon: Cpu,
    title: "AI scores every scheme",
    body: "Our matching engine weighs eligibility, category priority, sector fit and funding range across 16 real government schemes.",
  },
  {
    icon: ListChecks,
    title: "Get a ranked action list",
    body: "See your best-fit schemes with match %, required documents and a direct link to the official application portal.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">How it works</span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          From confusion to a clear funding plan in three steps.
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="group relative rounded-3xl border border-ink/10 bg-white/60 p-8 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="font-display text-6xl font-semibold text-ink/5 transition group-hover:text-gold/30">
              0{i + 1}
            </span>
            <div className="-mt-9 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal text-cream shadow-sm">
              <step.icon size={22} />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
