import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface Msg {
  role: "bot" | "user";
  text: string;
}

const INTRO: Msg = {
  role: "bot",
  text:
    "Namaste! I'm the Udaan assistant. Ask me about government business loans (Mudra, PMEGP), student scholarships (NSP, AICTE, PM-YASASVI), or EMI calculations.",
};

function reply(input: string): string {
  const q = input.toLowerCase();
  if (/scholarship|student|padhai|college|school/.test(q))
    return "For students, check out the National Scholarship Portal (NSP), Post-Matric SC/ST/OBC schemes, PM-YASASVI (up to ₹1.25 Lakh), AICTE Pragati for girls (₹50,000/yr), and Central Sector PM-USP. Use our 'Student Match' to check your eligibility!";
  if (/emi|calculator|interest|kist/.test(q))
    return "You can use our built-in EMI Calculator to estimate monthly repayments and see how government capital subsidies (like PMEGP 15-35%) reduce your principal loan liability!";
  if (/women|woman|mahila|girl/.test(q))
    return "For women entrepreneurs: Stand-Up India (₹10L–1Cr) and PMEGP (up to 35% subsidy). For girl students: AICTE Pragati (₹50,000/yr for engineering/diploma) and UGC Single Girl Child scholarship (₹36,200/yr).";
  if (/sc\/?st|caste|dalit|adivasi/.test(q))
    return "For SC/ST founders: Stand-Up India & PMEGP provide priority and higher subsidies. For SC/ST students: NSP Post-Matric Scholarships offer 100% compulsory fee reimbursement and maintenance stipend.";
  if (/disab|pwd|divyang/.test(q))
    return "Differently-abled individuals qualify for NHFDC concessional business loans (4-6% interest), and students qualify for AICTE Saksham Scholarship (₹50,000/yr).";
  if (/collateral|guarantee|security/.test(q))
    return "No collateral is required for MUDRA loans (up to ₹10-20 Lakh), PM SVANidhi (up to ₹50,000), and CGTMSE guarantee-backed MSME loans up to ₹2 Crore.";
  if (/how|portal|official|apply/.test(q))
    return "Udaan matches you based on your eligibility and directly redirects you to authentic Government of India portals (scholarships.gov.in, jansamarth.in, udyamimitra.in) with zero middlemen.";
  if (/hello|hi|hey|namaste/.test(q)) return "Namaste! Are you exploring Business Loans or Student Scholarships today?";
  return "You can run either our 'Student Scholarship Match' or 'Entrepreneur Loan Match' from the top menu to get personalized official recommendations ranked by eligibility!";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: reply(text) }]);
    }, 450);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[92vw] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-2xl"
          >
            <div className="flex items-center gap-2.5 bg-teal-dark px-5 py-4 text-cream">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-ink">
                <Sparkles size={15} />
              </span>
              <div>
                <p className="text-sm font-bold">Scheme Assistant</p>
                <p className="text-[11px] text-cream/60">Usually replies instantly</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "bot"
                      ? "bg-cream-soft text-ink/80"
                      : "ml-auto bg-teal text-cream"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="flex items-center gap-2 border-t border-ink/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about a scheme..."
                className="flex-1 rounded-full border border-ink/10 px-4 py-2 text-sm outline-none focus:border-teal"
              />
              <button
                onClick={send}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta text-cream transition hover:-translate-y-0.5"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-cream shadow-xl transition hover:-translate-y-1"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
