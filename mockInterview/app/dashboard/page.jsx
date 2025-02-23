import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="max-w-7xl mx-auto p-8">
                    <h1 className="font-bold text-3xl text-gray-800">Dashboard</h1>
                    <p className="text-gray-600 mt-2">
                        Prepare for your next interview with AI-powered mock interviews
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm">Total Interviews</h3>
                        <p className="text-2xl font-semibold mt-2">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm">Completed</h3>
                        <p className="text-2xl font-semibold mt-2">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm">Average Score</h3>
                        <p className="text-2xl font-semibold mt-2">0%</p>
                    </div>
                </div>

                {/* Create New Interview Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Create New Interview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AddNewInterview />
                    </div>
                </div>

                {/* Interview List Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Interviews</h2>
                    <InterviewList />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
