import React from "react";
import tile6 from "../../images/Home/tile6.png"; 
import tile7 from "../../images/Home/tile7.png"; 
import tile8 from "../../images/Home/tile8.png"; 

const Tools = () => {
  const tools = [
    {
      image: tile6,
      alt: "Tile 6",
      title: "Resume Analyzer",
      description: "Optimize your resume with instant AI-powered feedback to stand out to recruiters.",
    },
    {
      image: tile7,
      alt: "Tile 7",
      title: "Summarizer",
      description: "Quickly generate concise summaries of key career insights and recommendations.",
    },
    {
      image: tile8,
      alt: "Tile 8",
      title: "Interview Prep Module",
      description: "Ace your interviews with AI-generated questions and expert-backed answers.",
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[100px]">
        <div className="bg-[#F0EFE9] rounded-2xl shadow-xl shadow-gray-300/50 p-10">
          <div className="text-center space-y-3">
            <h3 className="text-md lg:text-lg font-medium text-orange-400">
              Tools
            </h3>
            <h1 className="text-4xl lg:text-6xl font-medium text-black">
              Explore the tools offered
            </h1>
            <p className="text-md text-black">
              Along with the smart career-matching features, we offer powerful tools to enhance your professional journey
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 max-w-5xl mx-auto">
            {tools.map((tools, index) => (
              <div key={index} className="p-6 rounded-xl flex flex-col items-start text-left">
                <img src={tools.image} alt={tools.alt} className="w-48 h-48 object-contain mb-4 mx-auto" />
                <h3 className="text-xl font-semibold">{tools.title}</h3>
                <p className="text-gray-600 mt-2">{tools.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
