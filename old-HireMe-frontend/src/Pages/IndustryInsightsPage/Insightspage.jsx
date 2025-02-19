import TrendCard from '../../components/IndustryInsights/TrendCard';
import SkillsChart from '../../components/IndustryInsights/SkillsChart';
import SalaryChart from '../../components/IndustryInsights/SalaryChart';
// import CareerPathMap from '../../components/IndustryInsights/CareerPathMap';
import SkillCorrelationPie from '../../components/IndustryInsights/SkillCorrelationPie';
import { jobTrends, skillDemands, salaryRanges, skillCorrelations } from '../../data/careerData';
import './Insightspage.css';

function Insightspage() {
  return (
    <div className="page-container">
      
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <div className="icon brain-icon"></div>
            <h1>Career Insights Dashboard</h1>
          </div>
          <div className="header-subtitle">
            <div className="icon sparkles-icon"></div>
            <p>Real-time career trends and insights</p>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid-container">
        {jobTrends.slice(0, 4).map((trend) => (
          <div key={trend.field} className="grid-item">
            <TrendCard trend={trend} />
          </div>
        ))}
        
        <div className="grid-item span-2 span-rows-2">
          <SkillsChart data={skillDemands} />
        </div>
                
        <div className="grid-item span-2 span-rows-2">
          <SalaryChart data={salaryRanges} />
        </div>
        
        
        <div className="grid-item span-4">
          <SkillCorrelationPie data={skillCorrelations} />
        </div>


      </div>
    </div>
  );
}

export default Insightspage;
