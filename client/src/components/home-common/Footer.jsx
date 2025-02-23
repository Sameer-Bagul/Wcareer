import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-[#F8F7F3] border-t">
      <div className="container mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0 max-w-xl">
            <h2 className="text-2xl font-bold mb-4">WCareers</h2>
            <p className="text-gray-600">
              WCareers is a premier platform for all who are eager to advance their careers 
              through professional development, featuring over 4000+ courses and a thriving 
              community of learners!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-12">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Courses</li>
                <li className="text-gray-600">For Universities</li>
                <li className="text-gray-600">For Enterprise</li>
                <li className="text-gray-600">Blog</li>
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <FaFacebookF className="text-gray-600" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <FaInstagram className="text-gray-600" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <FaTwitter className="text-gray-600" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <FaLinkedinIn className="text-gray-600" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              Copyright © {new Date().getFullYear()} WCareers. All rights reserved
            </p>
            <div className="flex gap-4">
              <span className="text-gray-600">Privacy Policy</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">Terms of Service</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">Site Notice</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;