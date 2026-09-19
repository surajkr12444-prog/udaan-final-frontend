import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsStrip from "./components/StatsStrip";
import HowItWorks from "./components/HowItWorks";
import AccountCTA from "./components/AccountCTA";
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
import { UserProfile } from "./lib/matching";
import { StudentProfile } from "./lib/scholarshipMatching";

type View =
  | "home"
  | "entrepreneur-wizard"
  | "entrepreneur-results"
  | "student-wizard"
  | "student-results"
  | "emi";

type AuthMode = "login" | "signup";

function App() {
  const [view, setView] = useState<View>("home");
  const [entrepreneurProfile, setEntrepreneurProfile] = useState<UserProfile | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const goHome = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEntrepreneur = () => {
    setView("entrepreneur-wizard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startStudent = () => {
    setView("student-wizard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEmi = () => {
    setView("emi");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAccount = () => {
    setAuthMode("login");
    setAccountOpen(true);
  };

  const openLogin = () => {
    setAuthMode("login");
    setAccountOpen(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setAccountOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-teal selection:text-cream">
      <Navbar
        onHome={goHome}
        onStartEntrepreneur={startEntrepreneur}
        onStartStudent={startStudent}
        onOpenEmi={openEmi}
        onOpenAccount={openAccount}
        onLogin={openLogin}
        onSignup={openSignup}
        mode={view}
      />

      {view === "home" && (
        <>
          <Hero onStartEntrepreneur={startEntrepreneur} onStartStudent={startStudent} onOpenEmi={openEmi} />
          <StatsStrip />
          <HowItWorks />
          <AccountCTA onLogin={openLogin} onSignup={openSignup} onAccount={openAccount} />
          <SchemeShowcase onStart={startEntrepreneur} />
          <StudentShowcase onStartStudent={startStudent} />
          <OfficialPortalsSection />
          <Testimonials />
          <Footer onStartEntrepreneur={startEntrepreneur} onStartStudent={startStudent} onOpenEmi={openEmi} />
        </>
      )}

      {view === "entrepreneur-wizard" && (
        <div className="py-8">
          <Wizard onComplete={(p) => { setEntrepreneurProfile(p); setView("entrepreneur-results"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
        </div>
      )}

      {view === "entrepreneur-results" && entrepreneurProfile && (
        <Results profile={entrepreneurProfile} onRestart={startEntrepreneur} onOpenEmi={openEmi} onSwitchToStudents={startStudent} onRequestLogin={openLogin} />
      )}

      {view === "student-wizard" && (
        <div className="py-8">
          <StudentWizard onComplete={(p) => { setStudentProfile(p); setView("student-results"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCancel={goHome} />
        </div>
      )}

      {view === "student-results" && studentProfile && (
        <StudentResults profile={studentProfile} onRestart={startStudent} onSwitchToLoans={startEntrepreneur} onRequestLogin={openLogin} />
      )}

      {view === "emi" && (
        <div className="py-8">
          <EmiCalculator onFindSchemes={startEntrepreneur} onClose={goHome} />
        </div>
      )}

      <AccountPanel open={accountOpen} onClose={() => setAccountOpen(false)} authMode={authMode} />
      <ChatWidget />
    </div>
  );
}

export default App;
