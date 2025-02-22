import { useContext } from "react";
import Header from "../../components/dashbord/dash-common/Header";
import SkillProgressChart from "../../components/dashbord/dash-common/SkillProgressChart"; 
import ToDo from "../../components/dashbord/dash-common/ToDo";
import Calendar from "../../components/dashbord/dash-common/Calendar"; 
import Psychometric from "../../components/dashbord/dash-common/PsycometricTest";
import Notice from "../../components/dashbord/dash-common/Notice"; 
import { AppContext } from "@/context/AppContext";

const Dashboard = () => {

  const { userData } = useContext(AppContext);
 
  const title = `welcome ${userData ? userData.name : "Buddy"}!`; 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const ntitle = capitalizeFirstLetter(title);

  return (
    <div className="flex-1 overflow-auto relative z-10 p-6">
      <Header title={ntitle} />
      
      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md p-6 rounded-lg flex flex-col gap-6">
            <SkillProgressChart />
            <Calendar />
          </div>

          
          <div className="flex flex-col gap-6">
            <div className="bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md p-6 rounded-lg flex flex-col gap-6">
              <ToDo />
              <Psychometric />
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
