import React from "react";
import Home from "../../images/Home/Home.png";

const Hero = () => {
  const HeroData = {
    subhead: "Introducing WCareers",
    head: "WCareers - The Way Winners Work",
    description:
      "Unlock new opportunities with AI-driven career guidance and skill-building. Whether you're a student, job seeker, or working professional, WCareers helps you grow and succeed in your career journey.",
    images: [Home], 
  };

  return (
    <section className="flex flex-col lg:flex-row max-w-[1440px] mx-auto gap-[40px] mt-[150px] px-5 lg:px-[100px]">
     
      <div className="flex flex-col flex-1 max-w-[531px] space-y-4 justify-center">
        <h3 className="text-md lg:text-lg font-medium text-orange-400 leading-tight">
          {HeroData.subhead}
        </h3>
        <h1 className="text-4xl lg:text-6xl font-bold text-black leading-tight">
          <span className="text-[#FF8643]">W</span>Careers - The <span className="text-[#FF8643]">W</span>ay Winners <span className="text-[#FF8643]">W</span>ork
        </h1>
        <p className="text-md text-black leading-7">{HeroData.description}</p>
      </div>

     
      <div className="flex-1 flex items-center justify-center lg:justify-end">
        {HeroData.images.map((image, index) => (
          <img
            key={index}
            src={image}
            className="w-full max-w-[900px] object-contain"
            alt={`Hero Section Image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
