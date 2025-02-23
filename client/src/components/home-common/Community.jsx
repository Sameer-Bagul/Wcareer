"use client";
import React from "react";

const Community = () => {
  const CommunityData = {
    subhead: "BUILD UP THE COMMUNITY",
    head: "Join the biggest community of learning",
    description:
      "Learn, share the knowledge with community members & shine from wherever you're through online learning web app."
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header Text */}
      <div className="text-center mb-12">
        <h3 className="text-[#FF8643] font-semibold mb-2">
          {CommunityData.subhead}
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {CommunityData.head}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {CommunityData.description}
        </p>
      </div>

      {/* Join Now Section */}
      <div className="bg-[#532D69] rounded-[40px] max-w-4xl mx-auto py-8 px-8 flex items-center justify-between">
        <h3 className="text-white text-2xl md:text-3xl font-semibold max-w-md">
          Join WCareers today and take the first step towards a brighter future.
        </h3>
        <div className="bg-white rounded-full flex items-center pr-1 pl-6">
          <input
            type="email"
            placeholder="Your email address"
            className="outline-none w-64 bg-transparent"
          />
          <button className="bg-[#FF8643] text-white p-2 rounded-full hover:bg-[#ff7a30] transition-colors ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
