import React from "react";
import LightBulb from "../../images/Home/LightBulb.svg";
import Messages from "../../images/Home/Messages.svg";
import Trophy from "../../images/Home/Trophy.svg";

const Service = () => {
  const ServiceData = {
    head: "Our Program",
    description:
      "We offer a variety of courses over various creative topics.",
  };

  const services = [
    {
      image: LightBulb,
      alt: "Light Bulb",
      title: "Career Mentorship",
      description: "Get guidance from industry professionals.",
    },
    {
      image: Trophy,
      alt: "Trophy",
      title: "Skill Development",
      description: "Learn in-demand skills.",
    },
    {
      image: Messages,
      alt: "Messages",
      title: "Resources & Reccomendations",
      description: "Personalized insights, skill validation, and curated learning paths to help you grow.",
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto mt-[50px] px-5 lg:px-[100px] py-16">
      <div className="flex flex-wrap lg:flex-nowrap items-start gap-20">
        <div className="min-w-[250px]">
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
