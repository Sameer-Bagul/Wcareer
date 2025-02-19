import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DistrictInput from "../components/formComponents/DistrictInput";
import SkillsDropdown from "../components/formComponents/SkillsDropdown";
import RadioInput from "../components/formComponents/RadioInput";
import DatePicker from "../components/formComponents/DatePicker";
import LandingNavbar from "../components/LandingNavbar";

const URL = import.meta.env.VITE_BACKEND_URL + "/api/register";

const Register = (props) => {
  const { isLoggedIn, setIsLoggedIn, setName, setEmail } = props;
  let navigate = useNavigate();

  const [selectedDomain, setSelectedDomain] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillOptions = {
    "Mechanical engineering": [
      "CNC programmer",
      "CAD programs",
      "HVAC",
      "Technical Drawing",
    ],
    Agriculture: [
      "Crop Management",
      "Soil Analysis",
      "Irrigation Techniques",
      "Farm Equipment Handling",
    ],
    "Apparel, Madeups & Home Furnishing": [
      "Garment Designing",
      "Pattern Making",
      "Textile Testing",
      "Home Decor Production",
    ],
    Automotive: [
      "Engine Maintenance",
      "Vehicle Diagnostics",
      "Automobile Design",
      "Quality Inspection",
    ],
    "Banking, Financial Services & Insurance (BFSI)": [
      "Risk Assessment",
      "Investment Planning",
      "Loan Processing",
      "Insurance Underwriting",
    ],
    "Beauty & Wellness": [
      "Hair Styling",
      "Skincare Treatments",
      "Spa Therapy",
      "Makeup Artistry",
    ],
    Construction: [
      "Structural Engineering",
      "Project Planning",
      "Masonry",
      "Safety Inspections",
    ],
    "Domestic Workers": [
      "Housekeeping",
      "Childcare",
      "Elderly Care",
      "Basic Cooking",
    ],
    Electronics: [
      "Circuit Design",
      "PCB Assembly",
      "Testing and Calibration",
      "Electronics Repair",
    ],
    "Employability Enhancer": [
      "Soft Skills Development",
      "Resume Writing",
      "Interview Preparation",
      "Career Counseling",
    ],
    "Food Industry Capacity and Skill Initiative": [
      "Food Safety",
      "Quality Control",
      "Packaging",
      "Supply Chain Management",
    ],
    "Furniture and Fittings": [
      "Woodworking",
      "Furniture Design",
      "CNC Machine Operation",
      "Assembly Techniques",
    ],
    "Green Jobs": [
      "Solar Panel Installation",
      "Wind Energy Maintenance",
      "Waste Management",
      "Energy Auditing",
    ],
    "Handicrafts and Carpet": [
      "Weaving",
      "Embroidery",
      "Handloom Operation",
      "Design Innovation",
    ],
    Healthcare: [
      "Patient Care",
      "Medical Equipment Operation",
      "Clinical Procedures",
      "Pharmacy Management",
    ],
    "IT-ITeS": [
      "Software Development",
      "Database Management",
      "Networking",
      "Cybersecurity",
    ],
    "Indian Plumbing": [
      "Pipe Installation",
      "Drainage Systems",
      "Sanitary Maintenance",
      "Waterproofing",
    ],
    Leather: [
      "Tanning",
      "Leather Product Design",
      "Cutting and Stitching",
      "Quality Control",
    ],
    Logistics: [
      "Inventory Management",
      "Fleet Management",
      "Supply Chain Optimization",
      "Warehousing",
    ],
    "Management & Entrepreneurship and Professional": [
      "Business Planning",
      "Leadership Development",
      "Market Analysis",
      "Financial Management",
    ],
    "Management – Security": [
      "Surveillance",
      "Risk Management",
      "Emergency Response",
      "Access Control Systems",
    ],
    "Media & Entertainment": [
      "Video Editing",
      "Sound Engineering",
      "Content Creation",
      "Animation",
    ],
    "People with Disability": [
      "Skill Adaptation",
      "Accessible Technology",
      "Inclusive Design",
      "Caregiving",
    ],
    "Production and Manufacturing": [
      "Lean Manufacturing",
      "Assembly Line Operation",
      "Production Scheduling",
      "Quality Assurance",
    ],
    "Retailers Association's": [
      "Customer Service",
      "Inventory Tracking",
      "Visual Merchandising",
      "Point-of-Sale Operations",
    ],
    Telecom: [
      "Network Installation",
      "Tower Maintenance",
      "Fiber Optics",
      "Telecom Equipment Repair",
    ],
    Textile: ["Spinning", "Dyeing", "Fabric Quality Testing", "Loom Operation"],
    "Tourism and Hospitality": [
      "Event Management",
      "Travel Planning",
      "Hotel Operations",
      "Customer Relationship Management",
    ],
  };

  const qualifications = [
    "Post Doctoral Fellowship (PDF)",
    "Diploma",
    "ITI",
    "Post Graduate",
    "Graduate",
    "12th Pass",
    "10th Pass",
    "8th Pass",
    "5th Pass",
  ];

  const experienceOptions = [
    "0-1 years",
    "1-2 years",
    "2-4 years",
    "4-7 years",
    "7+ years",
  ];

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setSelectedDomain(domain);
    setSkills(skillOptions[domain] || []);
    setSelectedSkills([]); // Reset skills when domain changes
  };

  const handleSkillsChange = (skills) => {
    setSelectedSkills(skills);
  };

  const handleRegister = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const data = Object.fromEntries(formData.entries());
    data.skills = selectedSkills; // Include selected skills
    data.domain = selectedDomain;

    if (data.password !== data.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(URL, data);
      const resData = res.data;

      if (resData.success) {
        toast.success(resData.message);
        setIsLoggedIn(true);
        setName(data.name);
        setEmail(data.email);
        navigate("/dashboard");
      } else {
        toast.error(resData.message);
      }
    } catch (err) {
      toast.error("An error occurred during registration.");
      console.error("Error:", err);
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Create an account
            </h1>
            <form className="space-y-4" action="POST" onSubmit={handleRegister}>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Your Email"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  maxLength={10}
                  pattern="^[7-9][0-9]{9}$"
                  placeholder="1234567890"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                />
              </div>

              {/* Gender (Radio) */}
              <RadioInput
                label="Gender"
                options={["Male", "Female", "Other"]}
                name="gender"
                required={true}
              />
              {/* Date of Birth */}
              <DatePicker label="Date of Birth" name="dob" required />

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="Your Address"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                />
              </div>

              {/* State */}
              <DistrictInput />

              {/* Aadhar */}
              <div>
                <label htmlFor="aadhar" className="block text-sm font-medium">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  id="aadhar"
                  name="aadhar"
                  maxLength={12}
                  pattern="^[0-9]{12}$"
                  placeholder="Your Aadhar Number"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                />
              </div>

              {/* PAN */}
              <div>
                <label htmlFor="pan" className="block text-sm font-medium">
                  PAN Number
                </label>
                <input
                  type="text"
                  id="pan"
                  name="pan"
                  maxLength={10}
                  pattern="^[A-Z]{5}[0-9]{4}[A-Z]$"
                  placeholder="Your PAN Number"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                />
              </div>

              {/* Highest Qualification */}
              <div>
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium"
                >
                  Highest Qualification
                </label>
                <select
                  id="qualification"
                  name="qualification"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select your qualification</option>
                  {qualifications.map((qual, idx) => (
                    <option key={idx} value={qual}>
                      {qual}
                    </option>
                  ))}
                </select>
              </div>

              {/* Years of Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium"
                >
                  Years of Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select your experience</option>
                  {experienceOptions.map((exp, idx) => (
                    <option key={idx} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Domain */}
              <div>
                <label htmlFor="domain" className="block text-sm font-medium">
                  Domain
                </label>
                <select
                  id="domain"
                  name="domain"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  onChange={handleDomainChange}
                  value={selectedDomain}
                  required
                >
                  <option value="">Select a domain</option>
                  {Object.keys(skillOptions).map((domain, idx) => (
                    <option key={idx} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills Dropdown */}
              <SkillsDropdown
                skills={skills}
                selectedSkills={selectedSkills}
                onSkillsChange={handleSkillsChange}
              />

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <div className="mb-2 block">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium required"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <label
                      htmlFor="confirmpassword"
                      className="text-sm font-medium required"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="Re-enter Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                  required
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-500">
                  I accept the{" "}
                  <a
                    href="#"
                    className="font-medium text-purple-600 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white bg-purple-600 hover:bg-purple-700 rounded-lg px-5 py-2.5"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
