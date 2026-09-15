import { Compass, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink">
                <Compass size={18} strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl font-semibold text-cream">
                Udaan<span className="text-terracotta">.AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              An independent AI matching layer over India's public entrepreneurship
              schemes — built to help women, SC/ST, minority, disabled and rural
              founders find the funding they qualify for.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-cream/40">Resources</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#schemes" className="hover:text-cream">Scheme directory</a></li>
              <li><a href="#how-it-works" className="hover:text-cream">How matching works</a></li>
              <li><a href="https://www.myscheme.gov.in/" target="_blank" rel="noreferrer" className="hover:text-cream">MyScheme.gov.in</a></li>
              <li><a href="https://www.india.gov.in/" target="_blank" rel="noreferrer" className="hover:text-cream">National Portal of India</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-cream/40">Trust & Safety</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-teal-light" /> No data stored — matching runs in your browser.</li>
              <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-teal-light" /> hello@udaan.ai</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Udaan.AI. An independent guidance tool, not affiliated with the Government of India.</p>
          <p>Always verify final eligibility on the official scheme portal before applying.</p>
        </div>
      </div>
    </footer>
  );
}
