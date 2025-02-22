import React from "react";
import { RadialBarChart, RadialBar } from "recharts";

const SkillProgressChart = () => {
  const data = [
    { name: "Skills to Learn", value: 70, fill: "#FF8643" },
    { name: "Skills Being Learned", value: 50, fill: "#F59E00" },
    { name: "Skills Mastered", value: 40, fill: "#532D69" },
  ];

  return (
    <div className="w-full max-w-3xl flex flex-col items-center bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md px-4 sm:px-6 md:px-8 py-8 rounded-lg shadow-md shadow-[#bfbcb2]">
      
      <div className="flex items-center">
       
        <div className="relative">
          <RadialBarChart
            width={280}
            height={280}
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="95%"
            barSize={14}
            data={data}
            startAngle={90}
            endAngle={-180}
          >
            <RadialBar dataKey="value" cornerRadius={50} background />
          </RadialBarChart>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-black">40%</span>
          </div>
        </div>

       
        <div className="ml-8 flex flex-col">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center mb-2"> 
              <div className="w-5 h-5 rounded-full mr-2" style={{ backgroundColor: entry.fill }}></div>
              <span className="text-base text-gray-700">{entry.name}</span> 
            </div>
          ))}
        </div>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-800">Learning Progress</h2>
    </div>
  );
};

export default SkillProgressChart;
