import { useState } from 'react';
import { 
  User, Camera, MapPin, Briefcase, Key, 
  Trash2, GraduationCap, 
  LinkIcon, Upload, FileText
} from 'lucide-react';

function Settings() {
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=80");
  
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
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-400"
              />
              <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
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
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border border-orange-100">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <LinkIcon className="w-5 h-5 mr-2 text-orange-500" />
                Connected Apps
              </h3>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                  GitHub
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
                  LinkedIn
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
            <div>
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <User className="w-5 h-5 mr-2 text-orange-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200">
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" rows="3"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200">
                    <option>Select Country</option>
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">District</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <Briefcase className="w-5 h-5 mr-2 text-orange-500" />
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Domain</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skillset</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" placeholder="Separate skills with commas" />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <GraduationCap className="w-5 h-5 mr-2 text-orange-500" />
                Documents & Qualifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PAN Number</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div>
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <Key className="w-5 h-5 mr-2 text-orange-500" />
                Change Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Old Password</label>
                  <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200" />
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="pt-6 border-t flex justify-between items-center">
              <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
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

