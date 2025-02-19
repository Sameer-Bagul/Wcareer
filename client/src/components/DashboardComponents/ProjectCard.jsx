import React from "react";
import { TiAttachment } from "react-icons/ti";

const ProjectCard = ({ project }) => {
  return (
    <div className="p-6 bg-white rounded-xl space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-700">{project.name}</h1>
        <p className="text-sm text-gray-500">{project.type}</p>
      </div>
      <p>
        <span className="text-xs p-2 rounded bg-gray-100">{project.date}</span>
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-500 rounded-full h-2"
          style={{ width: `${project.files}%` }} // Dynamic width
        ></div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {/* Uncomment and use these for avatars if needed */}
          {/* <img
            src="https://randomuser.me/api/portraits/men/15.jpg"
            alt=""
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <img
            src="https://randomuser.me/api/portraits/women/15.jpg"
            alt=""
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <img
            src="https://randomuser.me/api/portraits/men/25.jpg"
            alt=""
            className="w-8 h-8 rounded-full border-2 border-white"
          /> */}
        </div>
        <p className="flex space-x-1 items-center text-gray-400">
          <TiAttachment />{" "}
          <span>You are aheadd of {project.files}% candidates</span>
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
