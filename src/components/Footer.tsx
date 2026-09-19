import { Compass, ShieldCheck, GraduationCap, Briefcase, Database } from "lucide-react";
import { openPortalWithGuide } from "../lib/portalGuide";

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
            <p className="text-xs font-bold uppercase tracking-wider text-cream/40">Direct Portals + Guide</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><button onClick={() => openPortalWithGuide({ title: 'National Scholarship Portal application', portalName: 'NSP', url: 'https://scholarships.gov.in/', kind: 'scholarship' })} className="hover:text-cream flex items-center gap-1.5"><GraduationCap size={14} className="text-teal-light" /> National Scholarship Portal (NSP)</button></li>
              <li><button onClick={() => openPortalWithGuide({ title: 'JanSamarth credit-linked schemes', portalName: 'JanSamarth', url: 'https://www.jansamarth.in/', kind: 'scheme' })} className="hover:text-cream flex items-center gap-1.5"><Briefcase size={14} className="text-gold-soft" /> JanSamarth Loan Portal</button></li>
              <li><button onClick={() => openPortalWithGuide({ title: 'MUDRA / Stand-Up India application', portalName: 'Udyami Mitra', url: 'https://www.udyamimitra.in/', kind: 'scheme' })} className="hover:text-cream">Udyami Mitra (Mudra / Stand-Up)</button></li>
              <li><button onClick={() => openPortalWithGuide({ title: 'PMEGP application', portalName: 'KVIC PMEGP e-Portal', url: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp', kind: 'scheme' })} className="hover:text-cream">KVIC PMEGP Subsidy Portal</button></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cream/40">Trust & Transparency</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-teal-light" />Udaan is an independent guidance platform, not a Government of India website.</li>
              <li className="flex items-start gap-2"><Database size={16} className="mt-0.5 shrink-0 text-teal-light" />Signed-in profiles, saved matches and applications can be stored securely in the Udaan database for your dashboard.</li>
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
