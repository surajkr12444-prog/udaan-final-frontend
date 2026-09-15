import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsStrip from "./components/StatsStrip";
import HowItWorks from "./components/HowItWorks";
import SchemeShowcase from "./components/SchemeShowcase";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Wizard from "./components/Wizard";
import Results from "./components/Results";
import { UserProfile } from "./lib/matching";

type View = "home" | "wizard" | "results";

function App() {
  const [view, setView] = useState<View>("home");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const goHome = () => {
    setView("home");
    setProfile(null);
  };
  const startMatching = () => setView("wizard");

  return (
    <div className="min-h-screen bg-cream">
      <Navbar
        onHome={goHome}
        onStart={view === "home" ? startMatching : goHome}
        mode={view === "home" ? "home" : "app"}
      />

      {view === "home" && (
        <>
          <Hero onStart={startMatching} />
          <StatsStrip />
          <HowItWorks />
          <SchemeShowcase onStart={startMatching} />
          <Testimonials />
          <Footer />
        </>
      )}

      {view === "wizard" && (
        <Wizard
          onComplete={(p) => {
            setProfile(p);
            setView("results");
          }}
        />
      )}

      {view === "results" && profile && (
        <Results profile={profile} onRestart={goHome} />
      )}

      <ChatWidget />
    </div>
  );
}

export default App;
