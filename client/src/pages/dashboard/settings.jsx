import { useState } from 'react';
import { 
  User, Camera, MapPin, Briefcase, Key, 
  Trash2, GraduationCap, 
  LinkIcon, Upload, FileText
} from 'lucide-react';

import { AppContext } from '@/context/AppContext';

function Settings() {
  const [profileImage, setProfileImage] = useState("https://res.cloudinary.com/dceysplwm/image/upload/v1740252954/IMG_20241228_134355_yglesr.jpg");
  
  const [resumeFile, setResumeFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  // Update the common input field styles
  const inputClasses = `
    mt-2 block w-full rounded-lg border border-gray-300 
    bg-white/50 backdrop-blur-sm
    px-4 py-3
    shadow-sm
    transition-all duration-200
    placeholder:text-gray-400
    focus:border-orange-400 focus:ring-2 focus:ring-orange-200 
    hover:border-orange-300
    focus:shadow-orange-100 focus:shadow-lg
  `;

  const selectClasses = `
    mt-2 block w-full rounded-lg border border-gray-300 
    bg-white/50 backdrop-blur-sm
    px-4 py-3
    shadow-sm
    transition-all duration-200
    focus:border-orange-400 focus:ring-2 focus:ring-orange-200 
    hover:border-orange-300
    focus:shadow-orange-100 focus:shadow-lg
    appearance-none
    bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"%3E%3Cpath stroke="%236B7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/%3E%3C/svg%3E')] 
    bg-[length:1.25em_1.25em] 
    bg-[right_0.5rem_center] 
    bg-no-repeat
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-yellow-500 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-orange-50 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="p-8">
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-8 pb-8 border-b">
            <div className="relative group">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-400 group-hover:border-orange-500 transition-colors"
              />
              <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl">
                <Camera className="w-5 h-5 text-white" />
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-500">User ID: JD123456</p>
            </div>
          </div>

          <form className="mt-8 space-y-8">
            {/* Connected Apps */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-lg border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
                <LinkIcon className="w-5 h-5 mr-2 text-orange-500" />
                Connected Apps
              </h3>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2">
                  <span>GitHub</span>
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2">
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-orange-100">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <FileText className="w-5 h-5 mr-2 text-orange-500" />
                Resume
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-orange-500" />
                      <p className="mb-2 text-sm text-gray-700">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleResumeUpload}
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>
                {resumeFile && (
                  <div className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="text-sm text-gray-700">{resumeFile.name}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
                <User className="w-5 h-5 mr-2 text-orange-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className={inputClasses}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    className={inputClasses}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Gender
                  </label>
                  <select className={selectClasses}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
                <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2 space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Address
                  </label>
                  <textarea 
                    className={`${inputClasses} min-h-[100px] resize-y`}
                    placeholder="Enter your full address"
                  ></textarea>
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Country
                  </label>
                  <select className={selectClasses}>
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    State
                  </label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Enter your state"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    District
                  </label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Enter your district"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
                <Briefcase className="w-5 h-5 mr-2 text-orange-500" />
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Job Title
                  </label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Enter your job title"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Years of Experience
                  </label>
                  <input 
                    type="number" 
                    className={inputClasses}
                    placeholder="Enter years of experience"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Domain
                  </label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Enter your domain"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Skillset
                  </label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="e.g., React, Node.js, Python"
                  />
                </div>
              </div>
            </div>

            {/* Documents & Qualifications */}
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
                <GraduationCap className="w-5 h-5 mr-2 text-orange-500" />
                Documents & Qualifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Highest Qualification
                  </label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Enter your qualification"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Aadhar Number
                  </label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Enter your Aadhar number"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    PAN Number
                  </label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Enter your PAN number"
                  />
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
                <Key className="w-5 h-5 mr-2 text-orange-500" />
                Change Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    Old Password
                  </label>
                  <input 
                    type="password" 
                    className={`${inputClasses} focus:shadow-red-50`}
                    placeholder="Enter your current password"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    New Password
                  </label>
                  <input 
                    type="password" 
                    className={`${inputClasses} focus:shadow-green-50`}
                    placeholder="Enter your new password"
                  />
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="pt-8 border-t flex justify-between items-center">
              <button 
                type="submit" 
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 font-medium"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                className="flex items-center px-6 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;

