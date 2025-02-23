import React, { useState } from 'react';
import { BookOpen, Briefcase, GraduationCap, Clock, IndianRupee, Star, Calendar, Globe, Award, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mentors = [
  {
    name: "Aditya Sharma",
    role: "Senior Software Architect",
    expertise: ["System Design", "Cloud Architecture", "Leadership"],
    experience: "15+ years",
    company: "Microsoft",
    education: "M.Tech from IIT Delhi",
    rating: 4.9,
    sessions: 234,
    hourlyRate: 2500,
    availability: "Weekends, Weekday Evenings",
    languages: ["English", "Hindi"],
    achievements: "Published 3 Research Papers, Tech Lead for Azure Services",
    specialization: "Career Transition to Tech Leadership",
    bgColor: "from-amber-100 to-orange-50"
  },
  {
    name: "Priya Mehta",
    role: "Product Management Expert",
    expertise: ["Product Strategy", "User Research", "Agile"],
    experience: "12+ years",
    company: "Google",
    education: "MBA from IIM Bangalore",
    rating: 4.8,
    sessions: 189,
    hourlyRate: 3000,
    availability: "Flexible Hours",
    languages: ["English", "Hindi", "Gujarati"],
    achievements: "Led 20+ Product Launches, Forbes 30 Under 30",
    specialization: "Product Management Career Guidance",
    bgColor: "from-orange-100 to-yellow-50"
  },
  {
    name: "Rajesh Verma",
    role: "Data Science Leader",
    expertise: ["Machine Learning", "AI", "Big Data"],
    experience: "10+ years",
    company: "Amazon",
    education: "Ph.D. in Computer Science",
    rating: 4.7,
    sessions: 156,
    hourlyRate: 2800,
    availability: "Weekdays",
    languages: ["English", "Hindi", "Bengali"],
    achievements: "Published ML Research, Built AI Products",
    specialization: "Data Science Career Mentoring",
    bgColor: "from-yellow-100 to-green-50"
  },
  {
    name: "Sneha Patel",
    role: "UX Design Director",
    expertise: ["UI/UX Design", "Design Systems", "User Research"],
    experience: "8+ years",
    company: "Apple",
    education: "Masters in Design, NID",
    rating: 4.9,
    sessions: 145,
    hourlyRate: 2200,
    availability: "Weekends",
    languages: ["English", "Gujarati"],
    achievements: "Design Patents, Adobe Design Achievement Awards",
    specialization: "UX Design Career Mentoring",
    bgColor: "from-green-100 to-yellow-50"
  },
  {
    name: "Vikram Singh",
    role: "Blockchain Expert",
    expertise: ["Web3", "Smart Contracts", "DeFi"],
    experience: "7+ years",
    company: "Polygon",
    education: "B.Tech from BITS Pilani",
    rating: 4.8,
    sessions: 98,
    hourlyRate: 3500,
    availability: "Flexible",
    languages: ["English", "Hindi", "Punjabi"],
    achievements: "Built Multiple DeFi Protocols, Web3 Conference Speaker",
    specialization: "Blockchain Development",
    bgColor: "from-amber-100 to-orange-50"
  },
  {
    name: "Meera Krishnan",
    role: "Marketing Strategy Expert",
    expertise: ["Digital Marketing", "Brand Strategy", "Growth"],
    experience: "11+ years",
    company: "Netflix",
    education: "MBA from ISB",
    rating: 4.9,
    sessions: 167,
    hourlyRate: 2600,
    availability: "Weekday Evenings",
    languages: ["English", "Tamil", "Malayalam"],
    achievements: "CMO of the Year 2022, Marketing Excellence Award",
    specialization: "Marketing Leadership",
    bgColor: "from-orange-100 to-yellow-50"
  },
  {
    name: "Arjun Reddy",
    role: "Cybersecurity Specialist",
    expertise: ["Network Security", "Ethical Hacking", "Cloud Security"],
    experience: "9+ years",
    company: "FireEye",
    education: "MS in Cybersecurity",
    rating: 4.7,
    sessions: 123,
    hourlyRate: 3200,
    availability: "Weekends",
    languages: ["English", "Telugu"],
    achievements: "CISSP Certified, Security Conference Speaker",
    specialization: "Cybersecurity Career Guidance",
    bgColor: "from-yellow-100 to-green-50"
  },
  {
    name: "Zara Ahmed",
    role: "AI Research Scientist",
    expertise: ["Deep Learning", "NLP", "Computer Vision"],
    experience: "6+ years",
    company: "DeepMind",
    education: "Ph.D. in AI",
    rating: 4.8,
    sessions: 89,
    hourlyRate: 3800,
    availability: "Flexible",
    languages: ["English", "Urdu"],
    achievements: "Published in Top AI Conferences, Patent Holder",
    specialization: "AI Research Career",
    bgColor: "from-green-100 to-yellow-50"
  },
  {
    name: "Rohan Kapoor",
    role: "Startup Advisor",
    expertise: ["Entrepreneurship", "Fundraising", "Scale-up Strategy"],
    experience: "13+ years",
    company: "Multiple Startups",
    education: "MBA from Stanford",
    rating: 4.9,
    sessions: 210,
    hourlyRate: 4000,
    availability: "By Appointment",
    languages: ["English", "Hindi"],
    achievements: "Successfully Exit 2 Startups, Angel Investor",
    specialization: "Startup Mentoring",
    bgColor: "from-amber-100 to-orange-50"
  },
  {
    name: "Lisa Chen",
    role: "DevOps Engineer",
    expertise: ["CI/CD", "Kubernetes", "AWS"],
    experience: "8+ years",
    company: "Twitter",
    education: "MS in Computer Science",
    rating: 4.8,
    sessions: 134,
    hourlyRate: 2900,
    availability: "Weekdays",
    languages: ["English", "Mandarin"],
    achievements: "AWS Hero, DevOps Community Leader",
    specialization: "DevOps Career Guidance",
    bgColor: "from-orange-100 to-yellow-50"
  }
];

function MentorCard({ mentor }) {
  const initials = mentor.name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className={`relative bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-orange-200 h-[520px] flex flex-col justify-between overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-0 top-0 w-20 h-20 bg-orange-500 rounded-full -mr-10 -mt-10" />
        <div className="grid grid-cols-10 gap-2 p-4">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-orange-500" />
          ))}
        </div>
      </div>

      {/* Header Section - Fixed Height */}
      <div className="h-[100px] relative">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{mentor.name}</h3>
            <p className="text-orange-600 font-semibold line-clamp-1">{mentor.role}</p>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 text-orange-500 fill-current shrink-0" />
              <span className="text-gray-600">{mentor.rating} ({mentor.sessions} sessions)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid Section - Fixed Height */}
      <div className="h-[80px] grid grid-cols-2 gap-3 relative">
        <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg">
          <Briefcase className="w-4 h-4 text-orange-500 shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-1">{mentor.experience}</span>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg">
          <GraduationCap className="w-4 h-4 text-orange-500 shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-1">{mentor.education}</span>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg">
          <IndianRupee className="w-4 h-4 text-orange-500 shrink-0" />
          <span className="text-sm text-gray-600">₹{mentor.hourlyRate}/hour</span>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg">
          <Clock className="w-4 h-4 text-orange-500 shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-1">{mentor.availability}</span>
        </div>
      </div>

      {/* Expertise Section - Fixed Height */}
      <div className="h-[100px] relative">
        <h4 className="text-sm font-semibold text-gray-700">Expertise</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {mentor.expertise.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Additional Info Section - Fixed Height */}
      <div className="h-[120px] space-y-2 relative">
        <div className="flex items-start gap-2">
          <Globe className="w-4 h-4 text-orange-500 mt-1 shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-2">
            Languages: {mentor.languages.join(", ")}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Award className="w-4 h-4 text-orange-500 mt-1 shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-3">{mentor.achievements}</span>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-auto relative">
        <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02]">
          Book Session
        </button>
      </div>
    </div>
  );
}

function MentorMania() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFAF5] py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Pattern - Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circular gradients */}
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-orange-100 rounded-full opacity-20" />
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-yellow-100 rounded-full opacity-20" />
        
        {/* Large dots pattern */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(#FB923C 3px, transparent 3px), 
              radial-gradient(#FB923C 3px, transparent 3px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
            opacity: 0.15
          }}
        />

        {/* Medium dots overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(#FB923C 2px, transparent 2px), 
              radial-gradient(#FB923C 2px, transparent 2px)
            `,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
            opacity: 0.1
          }}
        />

        {/* Small dots overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(#FB923C 1px, transparent 1px), 
              radial-gradient(#FB923C 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
            opacity: 0.08
          }}
        />
      </div>

      {/* Card Background Pattern */}
      <style jsx>{`
        .card-pattern {
          background-image: 
            radial-gradient(#FB923C 2px, transparent 2px),
            radial-gradient(#FB923C 2px, transparent 2px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
          opacity: 0.1;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative">
        {/* Be a Mentor Button */}
        <div className="absolute right-0 top-0 z-10">
          <button
            onClick={() => navigate('/become-mentor')}
            className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold 
            hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02]
            shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <GraduationCap className="w-5 h-5" />
            Be a Mentor
          </button>
        </div>

        {/* Header content */}
        <div className="text-center mb-12 pt-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 relative">
            Connect with Expert Mentors
            {/* Decorative dots around heading */}
            <div className="absolute -top-6 -right-6 w-12 h-12 card-pattern rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 card-pattern rounded-full" />
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book personalized 1:1 sessions with industry leaders who can guide your career path and help you achieve your professional goals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search mentors by name, role, or expertise..."
              className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/80 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors
            .filter(mentor => 
              mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
              mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((mentor, index) => (
              <MentorCard key={index} mentor={mentor} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default MentorMania;