import { useState } from "react";
import Navbar from "./components/Navbar";
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
import { UserProfile } from "./lib/matching";
import { StudentProfile } from "./lib/scholarshipMatching";

type View =
  | "home"
  | "entrepreneur-wizard"
  | "entrepreneur-results"
  | "student-wizard"
  | "student-results"
  | "emi";

function App() {
  const [view, setView] = useState<View>("home");
  const [entrepreneurProfile, setEntrepreneurProfile] = useState<UserProfile | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);

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

  return (
    <div className="min-h-screen bg-cream selection:bg-teal selection:text-cream">
      {/* Universal Top Navigation */}
      <Navbar
        onHome={goHome}
        onStartEntrepreneur={startEntrepreneur}
        onStartStudent={startStudent}
        onOpenEmi={openEmi}
        mode={view}
      />

      {/* 1. HOME VIEW */}
      {view === "home" && (
        <>
          <Hero
            onStartEntrepreneur={startEntrepreneur}
            onStartStudent={startStudent}
            onOpenEmi={openEmi}
          />
          <StatsStrip />
          <HowItWorks />
          {/* Entrepreneur Schemes Showcase */}
          <SchemeShowcase onStart={startEntrepreneur} />
          {/* Student Scholarships Showcase */}
          <StudentShowcase onStartStudent={startStudent} />
          {/* Official Govt Portals Directory with Direct Links */}
          <OfficialPortalsSection />
          <Testimonials />
          <Footer
            onStartEntrepreneur={startEntrepreneur}
            onStartStudent={startStudent}
            onOpenEmi={openEmi}
          />
        </>
      )}

      {/* 2. ENTREPRENEUR WIZARD FLOW */}
      {view === "entrepreneur-wizard" && (
        <div className="py-8">
          <Wizard
            onComplete={(p) => {
              setEntrepreneurProfile(p);
              setView("entrepreneur-results");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}

      {/* 3. ENTREPRENEUR RESULTS FLOW */}
      {view === "entrepreneur-results" && entrepreneurProfile && (
        <Results
          profile={entrepreneurProfile}
          onRestart={startEntrepreneur}
          onOpenEmi={openEmi}
          onSwitchToStudents={startStudent}
        />
      )}

      {/* 4. STUDENT WIZARD FLOW */}
      {view === "student-wizard" && (
        <div className="py-8">
          <StudentWizard
            onComplete={(p) => {
              setStudentProfile(p);
              setView("student-results");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onCancel={goHome}
          />
        </div>
      )}

      {/* 5. STUDENT RESULTS FLOW */}
      {view === "student-results" && studentProfile && (
        <StudentResults
          profile={studentProfile}
          onRestart={startStudent}
          onSwitchToLoans={startEntrepreneur}
        />
      )}

      {/* 6. EMI CALCULATOR TOOL VIEW */}
      {view === "emi" && (
        <div className="py-8">
          <EmiCalculator
            onFindSchemes={() => {
              startEntrepreneur();
            }}
            onClose={goHome}
          />
        </div>
      )}

      {/* AI Assistant Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
