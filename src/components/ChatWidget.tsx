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
    "Hi! I'm the Udaan.AI assistant. Ask me about women's schemes, SC/ST loans, disability finance, collateral-free credit, or how matching works.",
};

function reply(input: string): string {
  const q = input.toLowerCase();
  if (/women|woman|mahila/.test(q))
    return "For women entrepreneurs, look at Stand-Up India (₹10L–1Cr), TREAD Scheme, Udyogini, and Mahila e-Haat for market access. Run the matcher to see them ranked for your exact profile.";
  if (/sc\/?st|caste|dalit|adivasi/.test(q))
    return "SC/ST founders often score highest on Stand-Up India, the National SC-ST Hub, and the Venture Capital Fund for SCs. PMEGP and CGTMSE also give priority treatment.";
  if (/disab|pwd|divyang/.test(q))
    return "NHFDC's Micro-Finance Scheme offers concessional loans (as low as 4-6%) specifically for persons with disabilities, alongside general schemes like PMEGP and MUDRA.";
  if (/minority|muslim|christian|sikh|parsi/.test(q))
    return "NMDFC channels concessional term loans for minority-community entrepreneurs, and Weavers' MUDRA is a strong fit if you're in handicrafts.";
  if (/collateral|guarantee/.test(q))
    return "Collateral-free options include MUDRA (up to ₹20L), CGTMSE-backed bank loans (up to ₹2Cr), and PM SVANidhi for street vendors.";
  if (/rural|village|farm/.test(q))
    return "Rural entrepreneurs, especially women in SHGs, should look at DAY-NRLM for revolving funds and low-interest bank linkage.";
  if (/how|match|work|score/.test(q))
    return "Our engine scores each scheme on 5 weighted factors: your identity category, business stage, sector, location type, and funding range — then ranks all 16 schemes by fit.";
  if (/hello|hi|hey/.test(q)) return "Hey there! Ready to find your funding match? Tap 'Find My Schemes' any time.";
  return "Good question — the most reliable way to get a precise answer is to run the 2-minute matcher. It'll rank every scheme for your specific situation.";
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
