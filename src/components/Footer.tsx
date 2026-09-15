import { Compass, Mail, ShieldCheck, GraduationCap, Briefcase, Calculator } from "lucide-react";

interface FooterProps {
  onStartEntrepreneur?: () => void;
  onStartStudent?: () => void;
  onOpenEmi?: () => void;
}

export default function Footer({ onStartEntrepreneur, onStartStudent, onOpenEmi }: FooterProps) {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-ink">
                <Compass size={20} strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl font-bold text-cream">
                Udaan
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
              An independent discovery platform connecting Indian entrepreneurs to government business
              loans & subsidies, and students to national central scholarships. 100% free with direct
              links to official portals.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cream/40">Direct Portals</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="https://scholarships.gov.in/" target="_blank" rel="noreferrer" className="hover:text-cream flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-teal-light" /> National Scholarship Portal (NSP)
                </a>
              </li>
              <li>
                <a href="https://www.jansamarth.in/" target="_blank" rel="noreferrer" className="hover:text-cream flex items-center gap-1.5">
                  <Briefcase size={14} className="text-gold-soft" /> JanSamarth Loan Portal
                </a>
              </li>
              <li>
                <a href="https://www.udyamimitra.in/" target="_blank" rel="noreferrer" className="hover:text-cream">
                  Udyami Mitra (Mudra / Stand-Up)
                </a>
              </li>
              <li>
                <a href="https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp" target="_blank" rel="noreferrer" className="hover:text-cream">
                  KVIC PMEGP Subsidy Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cream/40">Trust & Transparency</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-teal-light" />
                Zero data stored — matching calculations happen securely in your browser.
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-teal-light" />
                contact@udaan.gov.in (Helpline Guidance)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Udaan. Independent guidance tool connecting citizens to authentic Government of India portals.</p>
          <p>Always verify final documents and guidelines on the designated official government portal.</p>
        </div>
      </div>
    </footer>
  );
}
