import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/dashbord/dash-common/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/dashboard/Dashboard";
import MyRoadmap from "./pages/dashboard/MyRoadmap";
import TechnicalTest from "./pages/dashboard/TechnicalTest";
import CognitiveTest from "./pages/dashboard/CognitiveTest";
import PsychometricTest from "./pages/dashboard/PsychometricTest";
import ResearchAssistant from "./pages/dashboard/ResearchAssistant";
import Interview from "./pages/dashboard/Interview";
import ResumeBuilder from "./pages/dashboard/ResumeBuilder";
import Summarizer from "./pages/dashboard/Summarizer";
import Recommendations from "./pages/dashboard/Recommendations";
import CareerPathway from "./pages/dashboard/CareerPathway";
import CommunityPage from "./pages/dashboard/CommunityPage";
import Settings from "./pages/dashboard/settings";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex h-screen  bg-[#F8F7F3] ">
      
      {/* Show Sidebar only on Dashboard pages */}
      {isDashboard && <Sidebar />}

      <Routes>
        {/* Public Pages (No Sidebar) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard Pages (With Sidebar) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/my-roadmap" element={<MyRoadmap />} />
        <Route path="/technical-test" element={<TechnicalTest />} />
        <Route path="/cognitive-test" element={<CognitiveTest />} />
        <Route path="/psychometric-test" element={<PsychometricTest />} />
        <Route path="/research-assistant" element={<ResearchAssistant />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/career-pathway" element={<CareerPathway />} />
        <Route path="/community-page" element={<CommunityPage />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
