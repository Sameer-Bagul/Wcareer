import React from "react";
import { useLocation } from "react-router-dom";
import HMLogo from "../../images/HireMeLogo.png";
//ICONS//
import {
  LuBox,
  LuUser,
  LuMessageSquare,
  LuCalendar,
  LuMenu,
} from "react-icons/lu";
import { FaSuitcase } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import { Link } from "react-router-dom";
//ICONS//

const Sidebar = ({ isSidebarCollapsed, toggleSidebar }) => {
  const location = useLocation();

  const SIDEBAR_LINKS = [
    {
      id: 1,
      path: "/dashboard",
      name: "Dashboard",
      icon: LuBox,
      activeIcon: (active) =>
        active ? (
          <LuBox fill="currentColor" className="text-customDarkBlue" />
        ) : (
          <LuBox />
        ),
    },
    {
      id: 2,
      path: "/technical-test",
      name: "Technical Test",
      icon: TbUsers,
      activeIcon: (active) =>
        active ? (
          <TbUsers fill="currentColor" className="text-customDarkBlue" />
        ) : (
          <TbUsers />
        ),
    },
    {
      id: 3,
      path: "/roadmap",
      name: "Roadmap",
      icon: LuCalendar,
      activeIcon: (active) =>
        active ? (
          <LuCalendar fill="currentColor" className="text-customDarkBlue" />
        ) : (
          <LuCalendar />
        ),
    },
    {
      id: 4,
      path: "/cognitiveTest",
      name: "Cognitive Test",
      icon: LuMessageSquare,
      activeIcon: (active) =>
        active ? (
          <LuMessageSquare
            fill="currentColor"
            className="text-customDarkBlue"
          />
        ) : (
          <LuMessageSquare />
        ),
    },
    {
      id: 5,
      path: "/personality-assessment",
      name: "Personality Assessment",
      icon: FaSuitcase,
      activeIcon: (active) =>
        active ? (
          <FaSuitcase fill="currentColor" className="text-customDarkBlue" />
        ) : (
          <FaSuitcase />
        ),
    },
    {
      id: 6,
      path: "/interview",
      name: "Interview",
      icon: LuUser,
      activeIcon: (active) =>
        active ? (
          <LuUser fill="currentColor" className="text-customDarkBlue" />
        ) : (
          <LuUser />
        ),
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white transition-all duration-300 ease-in-out 
        ${isSidebarCollapsed ? "w-16" : "w-16 md:w-56"}`}
    >
      {/* Sidebar Toggle Button */}
      <div
        className="absolute top-4 right-4 cursor-pointer hover:bg-gray-100 rounded-full p-2"
        onClick={toggleSidebar}
      >
        <LuMenu />
      </div>

      {/* Logo */}
      {/* <div className="mb-8">
        <img
          src={HMLogo}
          alt="logo"
          className={`w-12 mx-auto ${
            isSidebarCollapsed ? "hidden" : "hidden md:flex"
          }`}
        />
      </div> */}

      {/* Navigation links */}
      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <li
              key={link.id}
              className={`font-medium rounded-md py-2 hover:bg-gray-100 transition-colors duration-200 
                ${isActive ? "bg-customLightBlue" : ""}`}
            >
              <Link
                to={link.path}
                className="flex items-center justify-center md:justify-start px-2"
              >
                <span
                  className={`flex items-center justify-center ${
                    isSidebarCollapsed ? "w-full" : "mr-5"
                  }`}
                >
                  {link.activeIcon(isActive)}
                </span>
                <span
                  className={`text-sm transition-colors duration-200 
                    ${
                      isActive
                        ? "text-customDarkBlue font-semibold"
                        : "text-gray-500"
                    }
                    ${isSidebarCollapsed ? "hidden" : "hidden md:flex"}`}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Community Page Link */}
      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <a href="http://localhost:5174/communitypage">
          <p
            className={`flex items-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full
              ${
                isSidebarCollapsed
                  ? "justify-center"
                  : "justify-center md:justify-start"
              }`}
          >
            <span></span>
            <span
              className={`${isSidebarCollapsed ? "hidden" : "hidden md:flex"}`}
            >
              Community Page
            </span>
          </p>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
