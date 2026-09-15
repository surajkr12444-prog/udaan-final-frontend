import { ExternalLink, ShieldCheck, Building2, GraduationCap, Briefcase } from "lucide-react";

export default function OfficialPortalsSection() {
  const portals = [
    {
      name: "National Scholarship Portal (NSP)",
      type: "student",
      authority: "Ministry of Electronics & IT, GoI",
      description: "Official gateway for Central Sector, Pre/Post-Matric, UGC, and State scholarships via Aadhaar OTR.",
      url: "https://scholarships.gov.in/",
      badge: "scholarships.gov.in",
      tagColor: "bg-teal/10 text-teal-dark",
    },
    {
      name: "JanSamarth Portal",
      type: "entrepreneur",
      authority: "Ministry of Finance, GoI",
      description: "National unified portal linking 13 credit-linked government schemes for MSME, business loans and subsidies.",
      url: "https://www.jansamarth.in/",
      badge: "jansamarth.in",
      tagColor: "bg-terracotta/10 text-terracotta",
    },
    {
      name: "Udyami Mitra Portal (SIDBI)",
      type: "entrepreneur",
      authority: "Small Industries Development Bank of India",
      description: "Direct application portal for Pradhan Mantri MUDRA Yojana (PMMY) and Stand-Up India schemes.",
      url: "https://www.udyamimitra.in/",
      badge: "udyamimitra.in",
      tagColor: "bg-terracotta/10 text-terracotta",
    },
    {
      name: "PMEGP e-Portal (KVIC)",
      type: "entrepreneur",
      authority: "Khadi and Village Industries Commission",
      description: "Apply for new business setup loans up to ₹25-50 Lakh with 15% to 35% non-refundable capital subsidy.",
      url: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
      badge: "kviconline.gov.in",
      tagColor: "bg-terracotta/10 text-terracotta",
    },
    {
      name: "PM SVANidhi Portal",
      type: "entrepreneur",
      authority: "Ministry of Housing and Urban Affairs",
      description: "Working capital micro-loans for street vendors and small merchants with 7% interest subvention and cashback.",
      url: "https://pmsvanidhi.mohua.gov.in/",
      badge: "pmsvanidhi.mohua.gov.in",
      tagColor: "bg-terracotta/10 text-terracotta",
    },
    {
      name: "AICTE Student Schemes Portal",
      type: "student",
      authority: "All India Council for Technical Education",
      description: "Pragati Scholarship for girl students (₹50,000/yr) and Saksham for differently-abled scholars.",
      url: "https://www.aicte-india.org/schemes/students-development-schemes",
      badge: "aicte-india.org",
      tagColor: "bg-teal/10 text-teal-dark",
    },
  ];

  return (
    <section id="portals" className="border-t border-black/5 bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ink/70">
            <ShieldCheck size={16} className="text-teal" /> Official Govt Links
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Official Government Application Portals Directory
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ink/65">
            Udaan guarantees zero middlemen. When you are ready to submit your formal application,
            use these authenticated Government of India portals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portals.map((p) => (
            <div
              key={p.name}
              className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-cream-soft p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${p.tagColor}`}>
                    {p.type === "student" ? <GraduationCap size={12} /> : <Briefcase size={12} />}
                    {p.type === "student" ? "Student Portal" : "Business Loan Portal"}
                  </span>
                  <span className="text-[11px] font-mono text-ink/40">{p.badge}</span>
                </div>

                <h3 className="mt-3 font-display text-lg font-bold text-ink">{p.name}</h3>
                <p className="mt-1 text-xs font-semibold text-teal-dark">{p.authority}</p>
                <p className="mt-3 text-xs leading-relaxed text-ink/70">{p.description}</p>
              </div>

              <div className="mt-6 border-t border-ink/5 pt-4">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-xs font-bold text-cream hover:bg-ink-soft transition"
                >
                  <Building2 size={13} /> Open Official Portal <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
