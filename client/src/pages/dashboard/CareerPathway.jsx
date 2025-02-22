import { Search } from "lucide-react";
import Header from "@/components/dashbord/dash-common/Header";

export default function CareerPathway() {
  return (
    <div className="w-full min-h-screen bg-[#F8F7F3]">
      
      <div className="w-full">
        <Header title="Career Pathway" />
      </div>
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">
      <h1 className="text-5xl font-serif font-bold text-gray-900">
        Discover your ideal career path
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        Explore career opportunities that match your skills and interests.
      </p>

     
      <div className="relative flex items-center mt-6 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search career options..."
          className="w-full px-6 py-3 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button className="absolute right-4 bg-orange-400 p-3 rounded-full text-white">
          <Search size={20} />
        </button>
      </div>

  
      <div className="mt-6">
        <p className="text-gray-500 text-sm">Trending Careers</p>
        <div className="flex flex-wrap gap-3 mt-2">
          {["Software Engineer", "Data Analyst", "Product Manager", "UI/UX Designer"].map((career) => (
            <span
              key={career}
              className="px-4 py-2 text-sm bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
            >
              {career}
            </span>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
