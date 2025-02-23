import React from "react";
import tile1 from "../../images/Home/tile1.png"; 
import tile3 from "../../images/Home/tile3.png"; 
import tile4 from "../../images/Home/tile4.png"; 
import tile5 from "../../images/Home/tile5.png"; 

const Features = () => {
  const features = [
    {
      image: tile1,
      alt: "Tile 1",
      title: "Adaptive Diagnostic Assessment",
      description: "Evaluate your skills and receive personalized job recommendations.",
    },
    {
      image: tile3,
      alt: "Tile 3",
      title: "Real-Time Job Market Insights",
      description: "Stay updated on trending skills and career opportunities.",
    },
    {
      image: tile4,
      alt: "Tile 4",
      title: "Career Pathway",
      description: "Access curated courses to enhance your expertise and close skill gaps.",
    },
    {
      image: tile5,
      alt: "Tile 5",
      title: "Career Consultant",
      description: "Get expert guidance to navigate your career growth.",
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto mt-20 px-5 pb-20 lg:px-[100px]">
      {/* Section Heading */}
      <div className=" text-left">
        <h1 className="text-2xl lg:text-3xl font-semibold text-black">Unlock Your Potential</h1>
        <p className="text-sm text-gray-600 mt-2 max-w-lg">
          Empower your career with AI-driven insights, skill assessments, and expert guidance to help you stay ahead.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <div key={index} className="bg-[#F8F7F3] p-6 rounded-xl flex flex-col items-start text-left">
            <img src={feature.image} alt={feature.alt} className="w-48 h-48 object-contain mb-4 mx-auto" />
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
