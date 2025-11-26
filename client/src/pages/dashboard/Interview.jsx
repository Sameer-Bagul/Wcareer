import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddNewInterview from '../../components/interview/AddNewInterview';
import InterviewList from '../../components/interview/InterviewList';

const Interview = () => {
    const { userData, backendUrl, isLoading: contextLoading } = useContext(AppContext);
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        averageScore: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Temporarily disabled userData check for testing
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            // Use a test email since API now returns all interviews
            const testEmail = 'test@example.com';
            const response = await axios.get(`${backendUrl}/api/interview/user/${testEmail}`, {
                withCredentials: true
            });

            if (response.data.success) {
                setInterviews(response.data.interviews);
                calculateStats(response.data.interviews);
            }
        } catch (error) {
            console.error('Error fetching interviews:', error);
            toast.error('Failed to load interviews');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (interviewList) => {
        const total = interviewList.length;
        // For now, we'll assume all interviews are completed
        // In a real app, you'd track completion status
        const completed = total;
        const averageScore = total > 0 ? Math.floor(Math.random() * 30) + 70 : 0; // Mock score

        setStats({ total, completed, averageScore });
    };

    const handleInterviewCreated = () => {
        fetchInterviews();
    };

    // Temporarily disabled loading check for testing
    // if (contextLoading || loading) {
    //     return (
    //         <div className="flex-1 overflow-auto relative z-10 p-4 md:p-6">
    //             <div className="flex justify-center items-center h-64">
    //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    //             </div>
    //         </div>
    //     );
    // }

    // Temporarily disabled authentication check for testing
    console.log('Interview page loaded, userData:', userData);

    return (
        <div className="flex-1 overflow-auto relative z-10 p-4 md:p-6">
            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-lg mb-6">
                <div className="max-w-7xl mx-auto p-8">
                    <h1 className="font-bold text-3xl text-gray-800">Mock Interview Dashboard</h1>
                    <p className="text-gray-600 mt-2">
                        Prepare for your next interview with AI-powered mock interviews
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm">Total Interviews</h3>
                        <p className="text-2xl font-semibold mt-2">{stats.total}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm">Completed</h3>
                        <p className="text-2xl font-semibold mt-2">{stats.completed}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm">Average Score</h3>
                        <p className="text-2xl font-semibold mt-2">{stats.averageScore}%</p>
                    </div>
                </div>

                {/* Create New Interview Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Create New Interview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AddNewInterview onInterviewCreated={handleInterviewCreated} />
                    </div>
                </div>

                {/* Interview List Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Interviews</h2>
                    <InterviewList interviews={interviews} />
                </div>
            </div>
        </div>
    );
};

export default Interview;