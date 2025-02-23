import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

import Sidebar from "./components/dashbord/dash-common/Sidebar";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Interview from "./pages/dashboard/Interview";
import ResumeAnalyzer from "./pages/dashboard/ResumeAnalyzer";
import Consultant from "./pages/dashboard/Consultant";
import CareerPathway from "./pages/dashboard/CareerPathway";
import CommunityPage from "./pages/dashboard/CommunityPage";
import Settings from "./pages/dashboard/settings";
import MarketInsights from "./pages/dashboard/MarketInsights";
import PersonalizedRoadmap from "./pages/PersonalizedRoadmap";
import TechnicalTestPage from "./pages/TechnicalTestPage";
import TechnicalTestInterface from "./pages/AdaptiveTechnicalTest";
import TechnicalTestResultPage from "./pages/TechnicalTestResultPage";
import CognitiveTest from "./pages/CognitiveTest";
import PersonalityAssessment from "./pages/PersonalityAssessmentPage";

// Cognitive Games
import SpotOn from "./Pages/CognitiveGames/SpotOn";
import BrainSwitch from "./Pages/CognitiveGames/BrainSwitch";
import Leaderboard from "./pages/Leaderboard";

// import Home2 from "./pages/Home2";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.weglot.com/weglot.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Weglot) {
        window.Weglot.initialize({
          api_key: "wg_adae7d07b5dd72b9121d9f4d8ac2b6db1",
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex h-screen bg-[#F8F7F3] text-black-100 overflow-hidden">
      {/* Show Sidebar only on Dashboard pages */}
      {isDashboard && <Sidebar />}
      <div className="flex-1 min-w-0 overflow-auto">
        <Routes>
          {/* Public Pages (No Sidebar) */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* <Route path="/" element={<Home2 />} /> */}

          {/* Dashboard Pages (With Sidebar) */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/dashboard/my-roadmap"
            element={<PersonalizedRoadmap />}
          />
          <Route path="/dashboard/Leaderboard" element={<Leaderboard />} />
          <Route
            path="/dashboard/market-insights"
            element={<MarketInsights />}
          />
          
          <Route path="/dashboard/interview" element={<Interview />} />
          <Route path="/dashboard/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/dashboard/consultant" element={<Consultant />} />
          
          <Route path="/dashboard/career-pathway" element={<CareerPathway />} />
          <Route path="/dashboard/community-page" element={<CommunityPage />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route
            path="/dashboard/technical-test"
            element={<TechnicalTestPage />}
          />
          <Route
            path="/technical-test-attempt"
            element={<TechnicalTestInterface />}
          />
          <Route
            path="dashboard/technical-test-result"
            element={<TechnicalTestResultPage />}
          />
          <Route path="/dashboard/cognitive-test" element={<CognitiveTest />} />
          <Route
            path="/dashboard/PersonalityAssessment"
            element={<PersonalityAssessment />}
          />

          {/* Cognitive Games */}
          <Route path="/spotOn" element={<SpotOn />} />
          <Route path="/brainSwitch" element={<BrainSwitch />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
