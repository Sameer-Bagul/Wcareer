import { useState } from "react";
import {
  Trophy,
  Medal,
  Star,
  Award,
  Crown,
  TrendingUp,
  Zap,
  Brain,
  Code,
  Target,
} from "lucide-react";
import { Filter } from "lucide-react";

const MOCK_DATA = Array.from({ length: 50 }, (_, i) => {
  const skills = [
    "Full Stack Development",
    "Data Science",
    "Cloud Architecture",
    "DevOps Engineering",
    "Mobile Development",
    "UI/UX Design",
    "Cybersecurity",
    "Blockchain",
    "AI/ML Engineering",
    "Quality Assurance",
  ];

  const names = [
    "Aarav Patel",
    "Aditi Sharma",
    "Arjun Reddy",
    "Diya Singh",
    "Ishaan Kumar",
    "Kavya Gupta",
    "Krishna Iyer",
    "Meera Verma",
    "Neha Malhotra",
    "Om Prakash",
    "Priya Rajput",
    "Rahul Mehta",
    "Riya Kapoor",
    "Rohan Desai",
    "Sanya Joshi",
    "Shiv Malhotra",
    "Tanvi Shah",
    "Ved Agarwal",
    "Vihaan Reddy",
    "Zara Khan",
    "Aanya Bhat",
    "Dhruv Choudhury",
    "Isha Bansal",
    "Kabir Menon",
    "Myra Saxena",
    "Nikhil Chopra",
    "Pranav Nair",
    "Rhea Singhania",
    "Samarth Gill",
    "Tara Rao",
    "Advait Kumar",
    "Ananya Mishra",
    "Aryan Shetty",
    "Dia Mathur",
    "Ishan Bajaj",
    "Kiara Ahuja",
    "Laksh Bhatia",
    "Mira Pillai",
    "Neel Kashyap",
    "Pari Mehra",
    "Reyansh Das",
    "Saisha Hegde",
    "Shaan Khanna",
    "Tisha Rastogi",
    "Udayan Sen",
    "Vivaan Mittal",
    "Yash Gokhale",
    "Ziva Chakraborty",
    "Aaradhya Roy",
    "Advika Nanda",
  ];

  const technicalScore = Math.floor(Math.random() * 20) + 80; // 80-99
  const cognitiveScore = Math.floor(Math.random() * 20) + 80; // 80-99
  const totalScore = technicalScore + cognitiveScore;

  const getBadges = () => {
    const badges = [];
    if (i < 3) badges.push(i === 0 ? "gold" : i === 1 ? "silver" : "bronze");
    if (totalScore > 185) badges.push("expert");
    if (Math.random() > 0.7) badges.push("rising");
    if (Math.random() > 0.8) badges.push("consistent");
    return badges;
  };

  return {
    id: `USR${String(i + 1).padStart(3, "0")}`,
    name: names[i],
    avatar: `https://robohash.org/${encodeURIComponent(
      names[i]
    )}.png?set=set4&size=150x150`,
    skill: skills[i % skills.length],
    technicalScore,
    cognitiveScore,
    badges: getBadges(),
    streak: Math.floor(Math.random() * 60) + 10,
  };
}).sort(
  (a, b) =>
    b.technicalScore + b.cognitiveScore - (a.technicalScore + a.cognitiveScore)
);

const BadgeIcon = ({ type }) => {
  switch (type) {
    case "gold":
      return <Trophy className="text-yellow-400" size={20} />;
    case "silver":
      return <Medal className="text-slate-400" size={20} />;
    case "bronze":
      return <Award className="text-amber-600" size={20} />;
    case "expert":
      return <Crown className="text-blue-500" size={20} />;
    case "rising":
      return <TrendingUp className="text-emerald-500" size={20} />;
    case "consistent":
      return <Target className="text-purple-500" size={20} />;
    default:
      return <Star className="text-purple-500" size={20} />;
  }
};

const Leaderboard = () => {
  const [selectedSkill, setSelectedSkill] = useState("");

  const filteredData = selectedSkill
    ? MOCK_DATA.filter((user) => user.skill === selectedSkill)
    : MOCK_DATA;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Monthly Leaderboard
            </h1>
            <p className="text-gray-600">
              Top 50 performers in skill development
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 px-6 py-3 rounded-xl border border-emerald-100">
            <Trophy className="text-emerald-600" />
            <span className="font-semibold text-emerald-800">March 2024</span>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="skill-filter"
            className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
          >
            <Filter className="h-4 w-4 text-emerald-500" />
            Filter by Skill
          </label>
          <select
            id="skill-filter"
            className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white hover:border-gray-400"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">All Skills</option>
            {Array.from(new Set(MOCK_DATA.map((user) => user.skill))).map(
              (skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              )
            )}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-50 to-blue-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">
                  Skill
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">
                  Technical
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">
                  Cognitive
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-800">
                  Badges
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => {
                const totalScore = user.technicalScore + user.cognitiveScore;
                return (
                  <tr
                    key={user.id}
                    className={`
                      border-b hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-blue-50/50 transition-colors
                      ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-l-yellow-400"
                          : ""
                      }
                      ${
                        index === 1
                          ? "bg-gradient-to-r from-slate-50 to-gray-50 border-l-4 border-l-slate-400"
                          : ""
                      }
                      ${
                        index === 2
                          ? "bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-l-amber-600"
                          : ""
                      }
                    `}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          #{index + 1}
                        </span>
                        {index < 3 && (
                          <div
                            className={`
                            w-8 h-8 rounded-full flex items-center justify-center
                            ${
                              index === 0
                                ? "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-600"
                                : ""
                            }
                            ${
                              index === 1
                                ? "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
                                : ""
                            }
                            ${
                              index === 2
                                ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-600"
                                : ""
                            }
                          `}
                          >
                            <Trophy size={16} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 p-0.5"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-800">
                        {user.skill}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                            style={{ width: `${user.technicalScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {user.technicalScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                            style={{ width: `${user.cognitiveScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {user.cognitiveScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        {totalScore}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {user.badges.map((badge, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-50 to-blue-50 flex items-center justify-center"
                            title={badge}
                          >
                            <BadgeIcon type={badge} />
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
