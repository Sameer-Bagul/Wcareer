import React from "react";
import ProjectStatistics from "../../components/DashboardComponents/ProjectStatistics";
import Platforms from "../../components/DashboardComponents/Platforms";
import ProjectCard from "../../components/DashboardComponents/ProjectCard";
import ClientCard from "../../components/DashboardComponents/ClientCard";
import MemberCard from "../../components/DashboardComponents/MemberCard";
import ResumeCard from "../../components/DashboardComponents/ResumeCard";
import ImprovementChart from "../../components/DashboardComponents/ImprovementChart";
import IChart2 from "../../components/DashboardComponents/IChart2";
import { Calendar } from "lucide-react";
import Cal1 from "../../components/DashboardComponents/Cal1";

const projects = [
  {
    name: "Programming",
    type: "G-code programming",
    date: "2021-01-01", // Start year of experience
    members: ["G-code programming", "M-code programming", "CAM software usage"],
    files: 65, // Proficiency percentage
    progress: 3, // Years of experience
  },
  {
    name: "Machining",
    type: "CAD (Computer-Aided Design)",
    date: "2020-01-01",
    members: [
      "Lathe operation",
      "Milling machine operation",
      "CNC machine setup",
    ],
    files: 35,
    progress: 4,
  },
  {
    name: "Design Software",
    type: "CAD (Computer-Aided Design)",
    date: "2022-01-01",
    members: ["CAD (Computer-Aided Design)", "SolidWorks", "AutoCAD"],
    files: 75,
    progress: 2,
  },
  {
    name: "Quality Assurance",
    type: "Blueprint reading",
    date: "2019-01-01",
    members: [
      "Blueprint reading",
      "Precision measurement tools",
      "Quality inspection",
    ],
    files: 10,
    progress: 5,
  },
  {
    name: "Soft Skills",
    type: "Problem-solving",
    date: "2018-01-01",
    members: ["Problem-solving", "Attention to detail", "Team collaboration"],
    files: 45,
    progress: 6,
  },
];

const clients = [
  {
    name: "James Smith",
    title: "CEO, Tech Solutions Inc.",
    date: "2024-01-15",
  },
  {
    name: "Emma Johnson",
    title: "Founder, GreenLeaf Retailers",
    date: "2024-02-20",
  },
  {
    name: "Michael Brown",
    title: "Managing Director, Capital Finances Ltd.",
    date: "2024-03-05",
  },
  {
    name: "Sophia Davis",
    title: "Head of Operations, Star Innovations",
    date: "2024-04-10",
  },
];

const members = [
  {
    total_members: 4,
    job: "Project Manager",
  },
  {
    total_members: 5,
    job: "Lead Developer",
  },
  {
    total_members: 3,
    job: "UX Designer",
  },
  {
    total_members: 6,
    job: "Marketing Specialist",
  },
];

const Home = () => {
  return (
    <div className="p-5">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Updated to half-width for IChart2 */}
        <div className="col-span-2 md:col-span-2 xl:col-span-2"></div>
      </div>

      {/* Current Projects Section */}
      <div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="col-span-2 xl:col-span-2">
            <ImprovementChart />
          </div>
          <div className="col-span-2 xl:col-span-2">
            <Cal1 />
          </div>
        </div>
      </div>

      {/* Current Skills Section */}
      <div>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg font-semibold">Current Skills</h1>
          <p className="text-sm underline text-indigo-600">See all</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {projects &&
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
      </div>

      {/* Current Clients Section */}
      {/* <div>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg font-semibold">Current Clients</h1>
          <p className="text-sm underline text-indigo-600">See all</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {clients &&
            clients.map((client, index) => (
              <ClientCard key={index} client={client} />
            ))}
        </div>
      </div> */}

      {/* Current Members Section */}
      {/* <div>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg font-semibold">Current Members</h1>
          <p className="text-sm underline text-indigo-600">See all</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {members &&
            members.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default Home;
