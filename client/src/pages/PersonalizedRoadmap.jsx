// PersonalizedRoadmap.jsx
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  BookOpen,
  Video,
  Code,
  CheckCircle,
  Bookmark,
  Monitor,
  Play,
  Settings2, // Changed from Settings
  CircleDot,
  Target,
  RotateCw, // Changed from Cog
} from "lucide-react";

// Styles for timeline customization
const timelineStyles = {
  contentArrow: {
    borderRight: "7px solid #fef3c7",
  },
  contentBackground: {
    main: "#fef3c7",
    default: "#ffffff",
  },
  iconBackground: {
    main: "#3b82f6",
    practice: "#10b981",
    video: "#8b5cf6",
    project: "#ef4444",
  },
};

// Icon mapping for different resource types
const resourceIcons = {
  "Video Tutorials": Video,
  "Interactive Practice": Code,
  Documentation: Bookmark,
  "Hands-on Projects": Settings2,
  "Live Sessions": Monitor,
  Exercises: CircleDot,
  Practice: Code,
};

// Helper function to get icon for resource
const getResourceIcon = (resourceName) => {
  for (const [key, icon] of Object.entries(resourceIcons)) {
    if (resourceName.includes(key)) {
      return icon;
    }
  }
  return BookOpen;
};

const CustomTimelineElement = ({ data }) => {
  const date = data.date || `Phase ${data.phase || 1}`;
  const IconComponent = data.icon || BookOpen;

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element"
      date={date}
      dateClassName="text-gray-700 font-medium md:text-lg"
      contentStyle={{
        background:
          data.category === "main"
            ? timelineStyles.contentBackground.main
            : timelineStyles.contentBackground.default,
        color: "#1f2937",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.1)",
        border: "1px solid #fde68a",
        padding: "2rem",
        borderRadius: "0.75rem",
      }}
      contentArrowStyle={timelineStyles.contentArrow}
      iconStyle={{
        background: timelineStyles.iconBackground[data.iconType || "main"],
        color: "#fff",
        boxShadow:
          "0 0 0 4px #fff, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)",
      }}
      icon={<IconComponent className="w-5 h-5" />}
      visible={true}
    >
      <div className="relative">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{data.label}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {data.description}
        </p>

        {data.resources && data.resources.length > 0 && (
          <div className="bg-white/80 rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="font-medium text-gray-700 mb-3 text-sm flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Learning Resources:
            </h4>
            <ul className="space-y-3">
              {data.resources.map((resource, idx) => {
                const ResourceIcon = getResourceIcon(resource);
                return (
                  <li
                    key={idx}
                    className="flex items-start space-x-3 text-sm text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <ResourceIcon className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span className="leading-tight">{resource}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {data.status && (
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            {data.status === "completed" ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <RotateCw className="w-5 h-5 text-blue-500 animate-spin" />
            )}
            <span className="text-xs font-medium text-gray-500">
              {data.status === "completed" ? "Completed" : "In Progress"}
            </span>
          </div>
        )}
      </div>
    </VerticalTimelineElement>
  );
};

const PersonalizedRoadmap = () => {
  const [timelineElements, setTimelineElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const analyzeTestResults = () => {
    try {
      const storedResults = localStorage.getItem("examResults");
      if (!storedResults) return null;

      const results = JSON.parse(storedResults);
      return results.detailed_results
        .filter((result) => !result.is_correct)
        .reduce((acc, result) => {
          if (!acc[result.concept_tag]) {
            acc[result.concept_tag] = { count: 0, questions: [] };
          }
          acc[result.concept_tag].count++;
          acc[result.concept_tag].questions.push(result.question_text);
          return acc;
        }, {});
    } catch (err) {
      console.error("Error analyzing results:", err);
      return null;
    }
  };

  const generateRoadmap = async () => {
    try {
      const weakAreas = analyzeTestResults();
      if (!weakAreas) {
        throw new Error("No test results found");
      }

      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Create a learning roadmap for these topics: ${Object.keys(
        weakAreas
      ).join(", ")}. 
      For each topic, provide:
      1. A clear learning objective
      2. Key concepts to master
      3. Practical exercises
      4. Recommended resources
      Structure the content for progressive learning.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const suggestions = response.text();

      // Convert AI response into timeline elements
      const elements = Object.entries(weakAreas).map(
        ([concept, data], index) => ({
          id: `topic-${index}`,
          label: concept,
          category: "main",
          status: "in-progress",
          phase: index + 1,
          iconType: index % 2 === 0 ? "main" : "practice",
          description: `Build proficiency in ${concept} through structured learning and practice. Focus on addressing the ${data.count} identified areas for improvement.`,
          resources: [
            "Interactive Practice Exercises",
            "Video Tutorials",
            "Documentation",
            "Hands-on Projects",
            "Live Sessions",
          ]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3), // Randomize and select 3 resources
        })
      );

      setTimelineElements(elements);
    } catch (err) {
      console.error("Generation error:", err);
      setError(err.message);

      // Set default timeline if everything fails
      setTimelineElements([
        {
          id: "default-1",
          label: "Getting Started",
          category: "main",
          status: "in-progress",
          phase: 1,
          iconType: "main",
          description:
            "Begin your learning journey with fundamental concepts and core principles.",
          resources: [
            "Interactive Practice Exercises",
            "Video Tutorials",
            "Documentation",
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateRoadmap();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <div className="text-xl text-gray-600">
            Generating your personalized learning roadmap...
          </div>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 text-gray-800">
            Your Learning Journey
          </h1>
          <p className="text-gray-600">
            A personalized roadmap based on your assessment results
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            <p className="font-medium">Error generating roadmap:</p>
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Focus Areas
            </h2>
            <div className="flex gap-3 flex-wrap">
              {Object.entries(analyzeTestResults() || {}).map(
                ([concept, data]) => (
                  <span
                    key={concept}
                    className="px-4 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors"
                  >
                    {concept} ({data.count} questions)
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          <VerticalTimeline animate={true} lineColor="#e5e7eb">
            {timelineElements.map((element) => (
              <CustomTimelineElement key={element.id} data={element} />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRoadmap;
