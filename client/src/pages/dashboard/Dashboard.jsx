import { useContext } from "react";
import { Link } from "react-router-dom";
import { BarChart2, Brain, FileText } from "lucide-react";
import Header from "../../components/dashbord/dash-common/Header";
import SkillProgressChart from "../../components/dashbord/dash-common/SkillProgressChart"; 
import ToDo from "../../components/dashbord/dash-common/ToDo";
import Calendar from "../../components/dashbord/dash-common/Calendar"; 
import Psychometric from "../../components/dashbord/dash-common/PsycometricTest";
import Notice from "../../components/dashbord/dash-common/Notice"; 
import { AppContext } from "@/context/AppContext";

const AssessmentCards = [
  {
    title: "Technical Test",
    icon: BarChart2,
    color: "#532D69",
    href: "/dashboard/technical-test",
    description: "Evaluate your technical skills and knowledge"
  },
  {
    title: "Cognitive Test",
    icon: Brain,
    color: "#532D69",
    href: "/dashboard/cognitive-test",
    description: "Assess your problem-solving abilities"
  },
  {
    title: "Personality Assessment",
    icon: FileText,
    color: "#532D69",
    href: "/dashboard/PersonalityAssessment",
    description: "Discover your personality traits"
  }
];

const Dashboard = () => {

  const { userData } = useContext(AppContext);
 
  const title = `welcome ${userData ? userData.name : "Buddy"}!`; 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const ntitle = capitalizeFirstLetter(title);

  return (
    <div className="flex-1 overflow-auto relative z-10 p-4 md:p-6">
      <Header title={ntitle} />
      
      <div className="max-w-7xl mx-auto py-4 md:py-6 px-2 md:px-6 lg:px-8">
        {/* Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          {AssessmentCards.map((card) => (
            <Link 
              key={card.title} 
              to={card.href}
              className="group hover:scale-105 transition-all duration-200"
            >
              <div className="bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md p-4 md:p-6 rounded-xl h-full
                shadow-[0_4px_12px_rgba(0,0,0,0.05)] 
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                transition-all duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <card.icon size={24} color={card.color} />
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div>
            <SkillProgressChart />
          </div>

          <div>
            <ToDo />
          </div>

          <div>
            <Calendar />
          </div>

          <div>
            <Psychometric />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
