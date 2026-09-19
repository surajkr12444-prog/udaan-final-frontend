import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'hinglish';
export type ThemeMode = 'light' | 'dark';

const COPY = {
  en: {
    brandTag: 'Govt Schemes',
    businessLoans: 'Business Loans', studentScholarships: 'Student Scholarships', emi: 'EMI Calculator', official: 'Official Portals',
    login: 'Login', signup: 'Sign Up', account: 'Account', logout: 'Logout',
    gatewayEyebrow: 'ONE PLACE FOR OPPORTUNITY',
    gatewayTitle: 'Government schemes and scholarships, matched to you.',
    gatewayBody: 'Sign in to discover business funding, student scholarships, application checklists and guided official-portal steps.',
    email: 'Email address', password: 'Password', name: 'Full name', continueEmail: 'Continue',
    googleContinue: 'Or continue securely with Google', noAccount: 'New to Udaan?', haveAccount: 'Already have an account?',
    loginTitle: 'Welcome back', signupTitle: 'Create your Udaan account',
    loginBody: 'Access your profile, history and saved opportunities.', signupBody: 'Create one account for scholarships, business schemes and guided applications.',
    splashLine: 'Schemes. Scholarships. Clear next steps.',
    lang: 'Language', theme: 'Theme', light: 'Light', dark: 'Dark',
    ask: 'Ask Udaan AI…', listening: 'Listening…', voiceOn: 'Voice replies on', voiceOff: 'Voice replies off',
    guideIntro: 'I can guide you step-by-step on the official portal. Keep this Udaan tab open while the government site opens in a new tab.',
    openOfficial: 'Open official portal with Udaan guide',
    heroBadge: 'National Scheme & Scholarship Matching',
    heroTitle: 'Government opportunities, made easier to understand and apply for.',
    heroBody: 'Udaan matches entrepreneurs and students to verified schemes and scholarships, then guides you to the official application portal.',
  },
  hi: {
    brandTag: 'सरकारी योजनाएँ',
    businessLoans: 'बिज़नेस लोन', studentScholarships: 'छात्रवृत्तियाँ', emi: 'EMI कैलकुलेटर', official: 'आधिकारिक पोर्टल',
    login: 'लॉगिन', signup: 'साइन अप', account: 'अकाउंट', logout: 'लॉगआउट',
    gatewayEyebrow: 'अवसरों के लिए एक ही जगह',
    gatewayTitle: 'सरकारी योजनाएँ और छात्रवृत्तियाँ — आपकी प्रोफ़ाइल के अनुसार।',
    gatewayBody: 'लॉगिन करके बिज़नेस फंडिंग, छात्रवृत्ति, दस्तावेज़ चेकलिस्ट और आधिकारिक पोर्टल की स्टेप-बाय-स्टेप गाइड पाएँ।',
    email: 'ईमेल पता', password: 'पासवर्ड', name: 'पूरा नाम', continueEmail: 'आगे बढ़ें',
    googleContinue: 'या Google से सुरक्षित रूप से जारी रखें', noAccount: 'Udaan पर नए हैं?', haveAccount: 'पहले से अकाउंट है?',
    loginTitle: 'वापसी पर स्वागत है', signupTitle: 'अपना Udaan अकाउंट बनाएँ',
    loginBody: 'अपनी प्रोफ़ाइल, हिस्ट्री और सेव किए गए अवसर देखें।', signupBody: 'छात्रवृत्ति, बिज़नेस योजनाओं और गाइडेड आवेदन के लिए एक अकाउंट बनाएँ।',
    splashLine: 'योजनाएँ। छात्रवृत्तियाँ। साफ़ अगला कदम।',
    lang: 'भाषा', theme: 'थीम', light: 'लाइट', dark: 'डार्क',
    ask: 'Udaan AI से पूछें…', listening: 'सुन रहा हूँ…', voiceOn: 'आवाज़ चालू', voiceOff: 'आवाज़ बंद',
    guideIntro: 'मैं आधिकारिक पोर्टल पर आपको स्टेप-बाय-स्टेप गाइड करूँगा। सरकारी साइट नई टैब में खुलेगी, Udaan की यह टैब खुली रखें।',
    openOfficial: 'Udaan गाइड के साथ आधिकारिक पोर्टल खोलें',
    heroBadge: 'राष्ट्रीय योजना और छात्रवृत्ति मैचिंग',
    heroTitle: 'सरकारी अवसर समझना और आवेदन करना अब आसान।',
    heroBody: 'Udaan उद्यमियों और छात्रों को सत्यापित योजनाओं व छात्रवृत्तियों से मैच करता है और आधिकारिक आवेदन पोर्टल तक मार्गदर्शन देता है।',
  },
  hinglish: {
    brandTag: 'Govt Schemes',
    businessLoans: 'Business Loans', studentScholarships: 'Student Scholarships', emi: 'EMI Calculator', official: 'Official Portals',
    login: 'Login', signup: 'Sign Up', account: 'Account', logout: 'Logout',
    gatewayEyebrow: 'HAR OPPORTUNITY EK JAGAH',
    gatewayTitle: 'Govt schemes aur scholarships — aapki profile ke hisaab se.',
    gatewayBody: 'Login karke business funding, student scholarships, documents checklist aur official portal ki step-by-step guidance pao.',
    email: 'Email address', password: 'Password', name: 'Full name', continueEmail: 'Continue',
    googleContinue: 'Ya Google se securely continue karo', noAccount: 'Udaan par new ho?', haveAccount: 'Already account hai?',
    loginTitle: 'Welcome back', signupTitle: 'Apna Udaan account banao',
    loginBody: 'Profile, history aur saved opportunities access karo.', signupBody: 'Scholarships, business schemes aur guided applications ke liye account banao.',
    splashLine: 'Schemes. Scholarships. Clear next steps.',
    lang: 'Language', theme: 'Theme', light: 'Light', dark: 'Dark',
    ask: 'Udaan AI se pucho…', listening: 'Sun raha hoon…', voiceOn: 'Voice replies on', voiceOff: 'Voice replies off',
    guideIntro: 'Main official portal par step-by-step guide karunga. Govt website new tab me open hogi; Udaan ki tab open rakho.',
    openOfficial: 'Udaan guide ke saath official portal kholo',
    heroBadge: 'National Scheme & Scholarship Matching',
    heroTitle: 'Government opportunities ko samajhna aur apply karna ab easy.',
    heroBody: 'Udaan entrepreneurs aur students ko verified schemes/scholarships se match karta hai aur official application portal par guide karta hai.',
  },
} as const;

type CopyKey = keyof typeof COPY.en;

interface PreferencesValue {
  language: Language;
  setLanguage: (value: Language) => void;
  theme: ThemeMode;
  setTheme: (value: ThemeMode) => void;
  toggleTheme: () => void;
  t: (key: CopyKey) => string;
}

const PreferencesContext = createContext<PreferencesValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem('udaan_language') as Language) || 'en');
  const [theme, setThemeState] = useState<ThemeMode>(() => (localStorage.getItem('udaan_theme') as ThemeMode) || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('udaan_theme', theme);
  }, [theme]);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
    localStorage.setItem('udaan_language', value);
    document.documentElement.lang = value === 'hi' ? 'hi' : 'en';
  };
  const setTheme = (value: ThemeMode) => setThemeState(value);
  const toggleTheme = () => setThemeState((v) => (v === 'light' ? 'dark' : 'light'));
  const t = (key: CopyKey) => COPY[language][key] || COPY.en[key];

  const value = useMemo(() => ({ language, setLanguage, theme, setTheme, toggleTheme, t }), [language, theme]);
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used inside PreferencesProvider');
  return ctx;
}
