const QUOTES = [
  {
    name: "Rukhsana Begum",
    role: "Tailoring unit owner, Lucknow",
    quote:
      "I didn't know NMDFC even existed. Udaan.AI matched me in two minutes — I got a ₹4 Lakh loan at 6% within a month.",
  },
  {
    name: "Manjunath K.",
    role: "Agri-processing, rural Karnataka",
    quote:
      "As an SC entrepreneur I always assumed loans meant collateral. Stand-Up India came up first on my list, exactly what I needed.",
  },
  {
    name: "Priya Nair",
    role: "Home bakery, Kochi",
    quote:
      "The match scores made it obvious where to start. Udyogini plus Mahila e-Haat together got my business online and funded.",
  },
];

export default function Testimonials() {
  return (
    <section id="stories" className="bg-teal-dark py-24 text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold-soft">Real founders</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for the entrepreneurs the system often overlooks.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="rounded-3xl border border-cream/10 bg-cream/5 p-7 backdrop-blur"
            >
              <blockquote className="font-display text-lg leading-relaxed text-cream/90">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-cream/10 pt-4">
                <p className="text-sm font-semibold text-gold-soft">{q.name}</p>
                <p className="text-xs text-cream/50">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
