import React, { useState } from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  return (
    <nav className="bg-gray-100 sticky top-0 z-50 shadow-md">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src={Logo}
                alt="Government of Punjab"
                className="h-8 w-auto mr-4"
              />
            </Link>
            <span className="text-gray-800 font-bold text-lg hidden md:block">
              ਪੰਜਾਬ ਸਰਕਾਰ | Government of Punjab
            </span>
          </div>

          {/* Center Search Bar */}
          <div className="hidden sm:block flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Skill Courses, Centres, Opportunities"
                className="w-full max-w-md px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                className="text-gray-800 hover:text-gray-600 focus:outline-none flex items-center"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <i className="fas fa-globe mr-1"></i> English
                <i className="fas fa-chevron-down ml-1 text-sm"></i>
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    हिंदी (Hindi)
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    ਪੰਜਾਬੀ (Punjabi)
                  </a>
                </div>
              )}
            </div>
            <Link to="/register">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium">
                Login
              </button>
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div className="flex md:hidden">
            <button
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navbar for Skill India Links */}
      <div className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex justify-center space-x-8 py-2">
            <a
              href="#"
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              <i className="fas fa-lightbulb mr-2"></i> Explore Skills
            </a>
            <a
              href="#"
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              <i className="fas fa-thumbs-up mr-2"></i> Training Schedule
            </a>
            <a
              href="#"
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              <i className="fas fa-graduation-cap mr-2"></i> Our Mission
            </a>
            <a
              href="#"
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              <i className="fas fa-briefcase mr-2"></i> Reports
            </a>
            <a
              href="/team"
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              <i className="fas fa-users mr-2"></i> Our Team
            </a>
            <a
              href="#"
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              <i className="fas fa-map-marker-alt mr-2"></i> Job Market Insights
            </a>
          </div>

          {/* Mobile Dropdown Menu for Skill India Links */}
          {isOpen && (
            <div className="hidden md:flex justify-center space-x-8 py-2">
              <a
                href="#"
                className="flex items-center text-sm text-gray-800 hover:text-gray-600"
              >
                <i className="fas fa-lightbulb mr-2"></i> Skill India Mission
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-800 hover:text-gray-600"
              >
                <i className="fas fa-thumbs-up mr-2"></i> Recommendation
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-800 hover:text-gray-600"
              >
                <i className="fas fa-graduation-cap mr-2"></i> Skill Courses
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-800 hover:text-gray-600"
              >
                <i className="fas fa-briefcase mr-2"></i> Job Exchange
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-800 hover:text-gray-600"
              >
                <i className="fas fa-users mr-2"></i> Entrepreneurs
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-800 hover:text-gray-600"
              >
                <i className="fas fa-map-marker-alt mr-2"></i> Skill India Map
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
