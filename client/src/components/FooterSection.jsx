import React from "react";
import GovtLogo from "../images/govt_punjab.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterSection = () => {
  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div>
            <img
              src={GovtLogo} // Replace with your logo URL
              alt="Logo"
              className="mb-4 w-24"
            />
            <h3 className="font-bold text-lg">Government of Punjab</h3>
            <p className="text-sm">
              Platform is owned by the Punjab Skill Development Mission (PSDM) .
            </p>
          </div>

          {/* Center Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold mb-2">Who Are We</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Help & Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">What We Offer</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:underline">
                    Skill Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Job Exchange
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Live Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sectors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Skilling Program
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h4 className="font-bold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
            <div className="mt-4">
              <h4 className="font-bold mb-2">Visit Us</h4>
              <img
                src="https://via.placeholder.com/100" // Replace with QR Code URL
                alt="QR Code"
                className="w-24"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Developed with ❤️ by team
            Hexageeks. All rights reserved.
          </p>
          <p>Last Modified: Friday, 29 Nov, 2024 | Visitor Count: 176949</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
