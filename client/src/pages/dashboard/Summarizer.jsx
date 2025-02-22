import { useState } from "react";
import { Upload } from "lucide-react";
import Header from "@/components/dashbord/dash-common/Header";
import SummarizerBg from "../../images/Summarizer.png"; // Ensure correct import

export default function Summarizer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("website");

  return (
    <div className="w-full min-h-screen bg-[#F8F7F3] flex flex-col items-center">
      <div className="w-full">
        <Header title="Summarizer" />
      </div>

      {/* Card with Background Image and Glass Effect */}
      <div className="relative max-w-4xl w-full mx-auto mt-8 shadow-lg rounded-lg p-6 min-h-[500px] h-auto flex flex-col justify-between bg-cover bg-center"
        style={{
          backgroundImage: `url(${SummarizerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10 rounded-lg" />


        {/* Content Above Glass Effect */}
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">All Files</h2>
          <p className="text-gray-600 mb-4">Enter content to summarize</p>

          <div className="flex space-x-4 border-b pb-2">
            {["website", "video", "pdf"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-t-md ${
                  activeTab === tab ? "bg-gray-900 text-white" : "text-gray-800"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Centered Input & Buttons Inside the Card */}
          <div className="flex flex-col items-center justify-center flex-grow mt-10">
            {/* Input Field for Each Tab */}
            {activeTab === "website" && (
              <input
                type="url"
                placeholder="Enter webpage URL"
                className="w-3/4 border rounded-lg px-4 py-2"
              />
            )}

            {activeTab === "video" && (
              <input
                type="url"
                placeholder="Enter YouTube video link"
                className="w-3/4 border rounded-lg px-4 py-2"
              />
            )}

            {activeTab === "pdf" && (
              <label className="flex flex-col items-center justify-center w-3/4 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload PDF</span> or drag and drop
                </p>
                <input type="file" className="hidden" accept=".pdf" />
              </label>
            )}

            {/* Buttons - Centered */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setSearchQuery("")}
              >
                Clear
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                Summarize
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
