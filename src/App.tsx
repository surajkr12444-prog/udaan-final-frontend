import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import StatsStrip from "./components/StatsStrip";
import HowItWorks from "./components/HowItWorks";
import SchemeShowcase from "./components/SchemeShowcase";
import StudentShowcase from "./components/StudentShowcase";
import OfficialPortalsSection from "./components/OfficialPortalsSection";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Wizard from "./components/Wizard";
import Results from "./components/Results";
import StudentWizard from "./components/StudentWizard";
import StudentResults from "./components/StudentResults";
import EmiCalculator from "./components/EmiCalculator";
import AccountPanel from "./components/AccountPanel";
import SplashIntro from "./components/SplashIntro";
import AuthGateway from "./components/AuthGateway";
import DashboardShell from "./components/DashboardShell";
import { UserProfile } from "./lib/matching";
import { StudentProfile } from "./lib/scholarshipMatching";
import { useAuth } from "./lib/auth";

type View = "home" | "entrepreneur-wizard" | "entrepreneur-results" | "student-wizard" | "student-results" | "emi";

function App() {
  const { user, loading } = useAuth();
  const [splash, setSplash] = useState(true);
  const [view, setView] = useState<View>("home");
  const [entrepreneurProfile, setEntrepreneurProfile] = useState<UserProfile | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setSplash(false), 2350);
    return () => window.clearTimeout(timer);
  }, []);

  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const goHome = () => { setView("home"); top(); };
  const startEntrepreneur = () => { setView("entrepreneur-wizard"); top(); };
  const startStudent = () => { setView("student-wizard"); top(); };
  const openEmi = () => { setView("emi"); top(); };
  const openPortals = () => {
    setView("home");
    window.setTimeout(() => document.getElementById("portals")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  if (splash) return <SplashIntro />;
  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#071f1a] text-sm font-bold text-[#f7f0e2]/65">Checking your Udaan session…</div>;
  if (!user) return <AuthGateway />;

  const active = view === "home" ? "home" : view.startsWith("entrepreneur") ? "entrepreneur" : view.startsWith("student") ? "student" : "emi";

  return (
    <div className="min-h-screen bg-[#071f1a] selection:bg-gold selection:text-[#071f1a]">
      <DashboardShell
        active={active}
        onHome={goHome}
        onBusiness={startEntrepreneur}
        onStudent={startStudent}
        onEmi={openEmi}
        onOfficialPortals={openPortals}
        onOpenAccount={() => setAccountOpen(true)}
      >
        {view === "home" && <>
          <Hero onStartEntrepreneur={startEntrepreneur} onStartStudent={startStudent} onOpenEmi={openEmi} />
          <StatsStrip />
          <HowItWorks />
          <SchemeShowcase onStart={startEntrepreneur} />
          <StudentShowcase onStartStudent={startStudent} />
          <OfficialPortalsSection />
          <Testimonials />
          <Footer onStartEntrepreneur={startEntrepreneur} onStartStudent={startStudent} onOpenEmi={openEmi} />
        </>}
        {view === "entrepreneur-wizard" && <div className="py-8"><Wizard onComplete={(p) => { setEntrepreneurProfile(p); setView("entrepreneur-results"); top(); }} /></div>}
        {view === "entrepreneur-results" && entrepreneurProfile && <Results profile={entrepreneurProfile} onRestart={startEntrepreneur} onOpenEmi={openEmi} onSwitchToStudents={startStudent} onRequestLogin={() => setAccountOpen(true)} />}
        {view === "student-wizard" && <div className="py-8"><StudentWizard onComplete={(p) => { setStudentProfile(p); setView("student-results"); top(); }} onCancel={goHome} /></div>}
        {view === "student-results" && studentProfile && <StudentResults profile={studentProfile} onRestart={startStudent} onSwitchToLoans={startEntrepreneur} onRequestLogin={() => setAccountOpen(true)} />}
        {view === "emi" && <div className="py-8"><EmiCalculator onFindSchemes={startEntrepreneur} onClose={goHome} /></div>}
      </DashboardShell>

      <AccountPanel open={accountOpen} onClose={() => setAccountOpen(false)} />
      <ChatWidget />
    </div>
  );
}

export default App;
