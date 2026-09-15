const QUOTES = [
  {
    name: "Rukhsana Begum",
    role: "Tailoring unit owner, Lucknow",
    quote:
      "I didn't know NMDFC even existed. Udaan matched me in two minutes — I got a ₹4 Lakh loan at 6% within a month.",
  },
  {
    name: "Ananya Sharma",
    role: "B.Tech Computer Science Scholar, Jaipur",
    quote:
      "As a female engineering student, Udaan showed me AICTE Pragati. I received ₹50,000 per year directly into my bank account via the National Scholarship Portal!",
  },
  {
    name: "Manjunath K.",
    role: "Agri-processing unit, Rural Karnataka",
    quote:
      "As an SC entrepreneur I always assumed business loans meant heavy collateral. Stand-Up India came up first on my Udaan match, and got sanctioned without mortgaging land.",
  },
];

export default function Testimonials() {
  return (
    <section id="stories" className="bg-teal-dark py-24 text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold-soft">
            Real Stories & Trust
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for the entrepreneurs and students the system often overlooks.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="rounded-3xl border border-cream/10 bg-cream/5 p-7 backdrop-blur flex flex-col justify-between"
            >
              <blockquote className="font-display text-base sm:text-lg leading-relaxed text-cream/90">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-cream/10 pt-4">
                <p className="text-sm font-bold text-gold-soft">{q.name}</p>
                <p className="text-xs text-cream/60">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
