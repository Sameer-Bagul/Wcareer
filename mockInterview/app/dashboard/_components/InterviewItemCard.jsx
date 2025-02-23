import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
    const router = useRouter();

    if (!interview) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all p-4">
            <div className="flex items-start justify-between mb-3">
                <h2 className="font-bold text-lg text-yellow-400">
                    {interview.jobPosition}
                </h2>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-400">
                    {interview.status || 'New'}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-400">
                    <svg 
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    {interview.jobExperience} Years of Experience
                </div>
                <div className="flex items-center text-xs text-gray-400">
                    <svg 
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    Created: {interview.createdAt}
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    className="w-full px-4 py-2 text-sm font-medium text-yellow-400 bg-white border border-yellow-400 rounded-md hover:bg-yellow-50 transition-colors"
                    onClick={() => router.push(`/dashboard/interview/${interview.mockId}/feedback`)}
                >
                    Feedback
                </button>
                <button
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-yellow-400 rounded-md hover:bg-yellow-400 transition-colors"
                    onClick={() => router.push(`/dashboard/interview/${interview.mockId}`)}
                >
                    Start Interview
                </button>
            </div>
        </div>
    );
};

// Error boundary wrapper
const InterviewItemCardWithErrorBoundary = (props) => {
    try {
        return <InterviewItemCard {...props} />;
    } catch (error) {
        console.error('Error rendering InterviewItemCard:', error);
        return (
            <div className="rounded-lg p-4 bg-red-50 text-red-400 border border-red-200">
                Failed to load interview card
            </div>
        );
    }
};

export default InterviewItemCardWithErrorBoundary;

