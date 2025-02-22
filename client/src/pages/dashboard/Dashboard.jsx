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
    title: "Technical Assessment",
    icon: BarChart2,
    color: "#FF8643",
    href: "/dashboard/technical-test",
    description: "Test your technical prowess across multiple domains. Get detailed insights into your strengths and areas for improvement."
  },
  {
    title: "Cognitive Analysis",
    icon: Brain,
    color: "#532D69",
    href: "/dashboard/cognitive-test",
    description: "Challenge your problem-solving abilities, logical reasoning, and critical thinking skills through interactive scenarios."
  },
  {
    title: "Career DNA Test",
    icon: FileText,
    color: "#F59E00",
    href: "/dashboard/PersonalityAssessment",
    description: "Uncover your unique professional traits and discover roles that align perfectly with your personality and work style."
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
              className="group hover:scale-105 transition-all duration-300"
            >
              <div 
                className="relative bg-gradient-to-br from-white to-[#F8F7F3] backdrop-blur-md p-6 rounded-xl h-full
                  shadow-[0_4px_12px_rgba(0,0,0,0.05)] 
                  group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                  group-hover:bg-white
                  transition-all duration-300 overflow-hidden"
                style={{ 
                  borderWidth: '2px', 
                  borderStyle: 'solid', 
                  borderColor: card.color,
                  background: `linear-gradient(145deg, white, ${card.color}0A)`
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${card.color}1A` }}
                  >
                    <card.icon size={28} color={card.color} />
                  </div>
                  <h3 className="font-semibold text-xl tracking-tight">{card.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">{card.description}</p>
                
                {/* Arrow that moves across */}
                <div 
                  className="absolute bottom-6 left-6 right-6 flex items-center"
                  style={{ color: card.color }}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-sm font-medium whitespace-nowrap">Take Test</span>
                    <div className="overflow-hidden relative flex-1">
                      <svg 
                        className="w-5 h-5 transform translate-x-0 group-hover:translate-x-[calc(100%+24px)] transition-transform duration-700" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        style={{ 
                          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
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
