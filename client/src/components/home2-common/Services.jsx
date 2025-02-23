import React from "react";
import LightBulb from "../../images/Home/LightBulb.svg";
import Messages from "../../images/Home/Messages.svg";
import Trophy from "../../images/Home/Trophy.svg";

const Service = () => {
  const ServiceData = {
    head: "Our Program",
    description:
      "We offer a comprehensive range of courses and resources to help you excel in your career journey, combining practical skills with industry insights.",
  };

  const services = [
    {
      image: LightBulb,
      alt: "Light Bulb",
      title: "Career Mentorship",
      description: "Get personalized guidance from industry professionals who've walked the path. Our mentors provide actionable feedback to accelerate your growth.",
    },
    {
      image: Trophy,
      alt: "Trophy",
      title: "Skill Development",
      description: "Master in-demand skills through hands-on projects and interactive learning. Our curriculum stays updated with the latest industry requirements.",
    },
    {
      image: Messages,
      alt: "Messages",
      title: "Resources & Reccomendations",
      description: "Access curated learning materials and follow personalized learning paths designed to match your career goals. Get validated for your progress.",
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto mt-[50px] px-5 lg:px-[100px] py-16">
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-20">
        <div className="min-w-[250px] lg:pt-[5px]">
          <h4 className="text-5xl font-semibold leading-tight">{ServiceData.head}</h4>
          <p className="text-gray-600 mt-4 max-w-[300px]">{ServiceData.description}</p>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-10 flex-1">
          {services.map((service, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-[100px] h-[100px] flex items-center justify-center">
                <img 
                  src={service.image} 
                  alt={service.alt} 
                  className="w-full h-full object-contain mix-blend-multiply filter brightness-100 contrast-100" 
                />
              </div>
              <div className="text-left w-full">
                <h3 className="text-xl font-medium mt-4">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
