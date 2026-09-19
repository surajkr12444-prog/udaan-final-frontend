import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, LoaderCircle, MessageCircle, Mic, MicOff, Send, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { chatWithAssistant } from '../lib/api';
import { usePreferences, type Language } from '../lib/preferences';
import type { PortalGuideRequest } from '../lib/portalGuide';

interface Msg { role: 'bot' | 'user'; text: string; language?: Language; source?: string; }

const HINGLISH_HINTS = /\b(kya|kaise|mujhe|mera|meri|hum|aap|apna|chahiye|karna|karo|batao|bata|loan|scheme|scholarship|apply|documents?|eligibility|paisa|kitna|kaun|kaha|kyu|hai|hain|nahi|nhi|wala|wali)\b/i;

function detectLanguage(text: string, fallback: Language): Language {
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  if (HINGLISH_HINTS.test(text)) return 'hinglish';
  if (/^[\x00-\x7F\s\p{P}\p{N}]+$/u.test(text)) return 'en';
  return fallback;
}

function initialText(language: Language) {
  if (language === 'hi') return 'नमस्ते! मैं Udaan AI हूँ। योजनाएँ, छात्रवृत्तियाँ, बिज़नेस लोन, eligibility, documents, EMI या आवेदन प्रक्रिया के बारे में पूछिए।';
  if (language === 'hinglish') return 'Namaste! Main Udaan AI hoon. Schemes, scholarships, business loans, eligibility, documents, EMI ya apply process ke baare me pucho.';
  return 'Hi! I’m Udaan AI. Ask me about schemes, scholarships, business loans, eligibility, documents, EMI, or how to apply.';
}

function localFallback(q: string, language: Language) {
  const l = q.toLowerCase();
  if (/mudra/.test(l)) return language === 'hi' ? 'MUDRA के लिए पहले अपना business stage और funding need check करें। Udaan का Business Match चलाएँ, फिर matched card से official portal खोलें। सामान्यतः Aadhaar, PAN, bank statements और business proof तैयार रखें। अंतिम eligibility official portal पर verify करें।' : language === 'hinglish' ? 'MUDRA ke liye pehle business stage aur funding need check karo. Udaan ka Business Match chalao, phir matched card se official portal kholo. Aadhaar, PAN, bank statements aur business proof ready rakho; final eligibility official portal par verify karo.' : 'For MUDRA, first check your business stage and funding need with Udaan Business Match. Then open the official portal from the matched card. Keep Aadhaar, PAN, bank statements and business proof ready, and verify final eligibility on the official portal.';
  if (/scholar|student|college|school/.test(l)) return language === 'hi' ? 'Student Match चलाइए। मैं scholarship eligibility, income/category criteria, required documents और official portal steps समझा सकता हूँ।' : language === 'hinglish' ? 'Student Match chalao. Main scholarship eligibility, income/category criteria, required documents aur official portal steps explain kar sakta hoon.' : 'Run Student Match. I can explain scholarship eligibility, income/category criteria, required documents and official portal steps.';
  if (/document|dastavez|दस्तावेज/.test(l)) return language === 'hi' ? 'आम तौर पर Aadhaar, income certificate, category certificate (यदि लागू हो), marksheet/admission proof या business documents मांगे जा सकते हैं। Exact checklist selected scheme के official portal पर verify करें।' : language === 'hinglish' ? 'Usually Aadhaar, income certificate, category certificate (if applicable), marksheet/admission proof ya business documents lag sakte hain. Exact checklist selected scheme ke official portal par verify karo.' : 'Common documents can include Aadhaar, income certificate, category certificate if applicable, marksheets/admission proof or business documents. Verify the exact checklist on the selected official portal.';
  return initialText(language);
}

export default function ChatWidget() {
  const { language: uiLanguage, t } = usePreferences();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'bot', text: initialText(uiLanguage), language: uiLanguage }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceReplies, setVoiceReplies] = useState(false);
  const [guide, setGuide] = useState<PortalGuideRequest | null>(() => {
    try { const raw = sessionStorage.getItem('udaan_portal_guide'); return raw ? JSON.parse(raw) : null; } catch { return null; }
  });
  const endRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open, busy]);
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<PortalGuideRequest>).detail;
      if (!detail) return;
      setGuide(detail); setOpen(true);
      const lang = uiLanguage;
      const text = lang === 'hi' ? `${detail.title} का आधिकारिक पोर्टल नई टैब में खुल गया है। यह Udaan टैब खुली रखें—मैं registration, documents, form filling और submission में step-by-step guide करूँगा।`
        : lang === 'hinglish' ? `${detail.title} ka official portal new tab me open ho gaya hai. Udaan tab open rakho—main registration, documents, form filling aur submission step-by-step guide karunga.`
        : `The official portal for ${detail.title} opened in a new tab. Keep Udaan open here—I can guide registration, documents, form filling and submission step by step.`;
      setMsgs((m) => [...m, { role: 'bot', text, language: lang, source: 'guide' }]);
      if (voiceReplies) speak(text, lang);
    };
    window.addEventListener('udaan:portal-guide', handler as EventListener);
    return () => window.removeEventListener('udaan:portal-guide', handler as EventListener);
  }, [uiLanguage, voiceReplies]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const queryHandler = (event: Event) => {
      const text = String((event as CustomEvent<string>).detail || '').trim();
      if (!text) return;
      setOpen(true);
      window.setTimeout(() => sendText(text), 40);
    };
    window.addEventListener('udaan:open-chat', openHandler);
    window.addEventListener('udaan:chat-query', queryHandler as EventListener);
    return () => {
      window.removeEventListener('udaan:open-chat', openHandler);
      window.removeEventListener('udaan:chat-query', queryHandler as EventListener);
    };
  }, [busy, uiLanguage, guide, voiceReplies]);

  const quickPrompts = useMemo(() => uiLanguage === 'hi'
    ? ['मेरे लिए कौन सी योजना है?', 'कौन से documents चाहिए?', 'Scholarship कैसे apply करें?']
    : uiLanguage === 'hinglish'
      ? ['Mere liye kaunsi scheme?', 'Kaunse documents chahiye?', 'Scholarship kaise apply karu?']
      : ['Which scheme fits me?', 'What documents do I need?', 'How do I apply for a scholarship?'], [uiLanguage]);

  function speak(text: string, language: Language) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = .96; utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  async function sendText(raw?: string) {
    const text = (raw ?? input).trim();
    if (!text || busy) return;
    const detected = detectLanguage(text, uiLanguage);
    setMsgs((m) => [...m, { role: 'user', text, language: detected }]);
    setInput(''); setBusy(true);
    try {
      const data = await chatWithAssistant(text, detected, guide);
      const answer = data?.reply || localFallback(text, detected);
      setMsgs((m) => [...m, { role: 'bot', text: answer, language: detected, source: data?.source }]);
      if (voiceReplies) speak(answer, detected);
    } catch {
      const answer = localFallback(text, detected);
      setMsgs((m) => [...m, { role: 'bot', text: answer, language: detected, source: 'offline' }]);
      if (voiceReplies) speak(answer, detected);
    } finally { setBusy(false); }
  }

  function toggleListening() {
    if (listening) { recognitionRef.current?.stop?.(); setListening(false); return; }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setMsgs((m) => [...m, { role: 'bot', text: uiLanguage === 'hi' ? 'इस browser में voice input support नहीं है। आप message type कर सकते हैं।' : 'Voice input is not supported in this browser. You can type your question instead.', language: uiLanguage }]);
      return;
    }
    const recognition = new SR(); recognitionRef.current = recognition;
    recognition.lang = uiLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false; recognition.continuous = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event?.results?.[0]?.[0]?.transcript || '';
      setInput(transcript);
      window.setTimeout(() => sendText(transcript), 80);
    };
    recognition.start();
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .96 }} className="fixed bottom-24 right-4 z-[80] flex h-[34rem] w-[24rem] max-w-[94vw] flex-col overflow-hidden rounded-[1.75rem] border border-[#e8b347]/20 bg-[#0b2d25] text-[#f7f0e2] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e8b347]/15 bg-[#08231d] px-4 py-3.5 text-[#f7f0e2]">
              <div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8b347] text-[#08231d]"><Bot size={18}/></span><div><p className="text-sm font-extrabold">Udaan AI</p><p className="text-[10px] text-cream/60">Schemes · Scholarships · Application guide</p></div></div>
              <div className="flex items-center gap-1"><button title={voiceReplies?t('voiceOn'):t('voiceOff')} onClick={()=>{setVoiceReplies(v=>!v); if(voiceReplies) window.speechSynthesis?.cancel();}} className="rounded-full p-2 hover:bg-white/10">{voiceReplies?<Volume2 size={16}/>:<VolumeX size={16}/>}</button><button onClick={()=>setOpen(false)} className="rounded-full p-2 hover:bg-white/10"><X size={17}/></button></div>
            </div>

            {guide && <div className="border-b border-[#e8b347]/20 bg-[#e8b347]/10 px-4 py-2.5 text-[11px] leading-5 text-ink"><span className="font-extrabold">Guide mode:</span> {guide.title} · {guide.portalName}</div>}

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m,i)=><div key={i} className={`group max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role==='bot'?'bg-[#12392f] text-[#f7f0e2]/88':'ml-auto bg-[#d8a53e] text-[#08231d]'}`}><div>{m.text}</div>{m.role==='bot'&&<div className="mt-1.5 flex items-center justify-between"><span className="text-[9px] uppercase tracking-wider text-ink/30">{m.source==='assistant'?'AI reply':m.source==='guide'?'Portal guide':'Udaan guide'}</span><button onClick={()=>speak(m.text,m.language||uiLanguage)} className="opacity-50 transition hover:opacity-100" title="Read aloud"><Volume2 size={12}/></button></div>}</div>)}
              {busy&&<div className="inline-flex items-center gap-2 rounded-2xl bg-[#12392f] px-3.5 py-2.5 text-xs text-[#f7f0e2]/55"><LoaderCircle size={14} className="animate-spin"/> Udaan AI is thinking…</div>}
              <div ref={endRef}/>
            </div>

            <div className="border-t border-white/10 bg-[#08231d]/95 p-3">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">{quickPrompts.map((q)=><button key={q} onClick={()=>sendText(q)} className="shrink-0 rounded-full border border-white/10 bg-[#12392f] px-2.5 py-1.5 text-[10px] font-bold text-[#f7f0e2]/70 hover:border-[#e8b347]/35">{q}</button>)}</div>
              <div className="flex items-center gap-2">
                <button onClick={toggleListening} className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${listening?'border-terracotta bg-terracotta text-cream':'border-white/10 bg-[#12392f] text-[#efbf5c]'}`} title={listening?t('listening'):'Speak'}>{listening?<MicOff size={16}/>:<Mic size={16}/>}</button>
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendText()} placeholder={listening?t('listening'):t('ask')} className="min-w-0 flex-1 rounded-full border border-white/10 bg-[#12392f] px-4 py-2.5 text-sm text-[#f7f0e2] outline-none placeholder:text-[#f7f0e2]/35 focus:border-[#e8b347]/45" />
                <button disabled={busy} onClick={()=>sendText()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8b347] text-[#08231d] transition hover:-translate-y-0.5 disabled:opacity-50"><Send size={16}/></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={()=>setOpen(o=>!o)} className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#e8b347] text-[#08231d] shadow-xl transition hover:-translate-y-1">{open?<X size={22}/>:<MessageCircle size={22}/>}</button>
    </>
  );
}
