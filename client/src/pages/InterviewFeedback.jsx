import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChevronDown, ChevronUp, TrendingUp, Target, Award, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const InterviewFeedback = () => {
    const { mockId } = useParams();
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppContext);
    const [feedbackList, setFeedbackList] = useState([]);
    const [overallRating, setOverallRating] = useState('0/10');
    const [overallKeywordScore, setOverallKeywordScore] = useState('0%');
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [keywordStats, setKeywordStats] = useState({
        totalKeywords: 0,
        totalMatched: 0,
        averageMatch: 0
    });
    const [expandedItems, setExpandedItems] = useState(new Set());
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        getInterviewFeedback();
    }, []);

    useEffect(() => {
        if (feedbackList.length > 0) {
            prepareChartData();
            calculateKeywordStats();
        }
    }, [feedbackList]);

    const prepareChartData = () => {
        const data = feedbackList.map((item, index) => ({
            question: `Q${index + 1}`,
            rating: item.rating || 0,
            keywordScore: item.keywordScore || 0
        }));
        setChartData(data);
    };

    const calculateKeywordStats = () => {
        const totalKeywords = feedbackList.reduce((sum, item) => sum + (item.keywords?.length || 0), 0);
        const totalMatched = feedbackList.reduce((sum, item) => sum + (item.matchedKeywords?.length || 0), 0);
        const averageMatch = totalKeywords > 0 ? Math.round((totalMatched / totalKeywords) * 100) : 0;

        setKeywordStats({
            totalKeywords,
            totalMatched,
            averageMatch
        });
    };

    const getInterviewFeedback = async () => {
        console.log('📥 [CLIENT] Fetching feedback for interview:', mockId);
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${backendUrl}/api/interview/${mockId}/feedback`, {
                withCredentials: true
            });

            console.log('📡 [CLIENT] Feedback API response:', response.data);

            if (response.data.success) {
                console.log('✅ [CLIENT] Feedback loaded successfully');
                console.log('📊 [CLIENT] Answers count:', response.data.feedbackList.length);
                console.log('⭐ [CLIENT] Overall rating:', response.data.overallRating);
                console.log('🎯 [CLIENT] Overall keyword score:', response.data.overallKeywordScore);

                response.data.feedbackList.forEach((feedback, idx) => {
                    console.log(`📝 [CLIENT] Answer ${idx + 1}: Rating ${feedback.rating}/10, Keywords ${feedback.keywordScore}%`);
                    console.log(`🔍 [CLIENT] Matched keywords:`, feedback.matchedKeywords);
                    console.log(`💬 [CLIENT] Feedback:`, feedback.feedback.substring(0, 100) + '...');
                });

                setFeedbackList(response.data.feedbackList);
                setOverallRating(response.data.overallRating);
                setOverallKeywordScore(response.data.overallKeywordScore || '0%');
            } else {
                console.error('❌ [CLIENT] Failed to load feedback:', response.data.message);
                throw new Error(response.data.message || 'Failed to load feedback');
            }
        } catch (error) {
            console.error('❌ [CLIENT] Error fetching feedback:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to load interview feedback';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
        getInterviewFeedback();
    };

    const toggleExpanded = (index) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedItems(newExpanded);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your interview feedback...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="space-y-3">
                        <button
                            onClick={handleRetry}
                            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => navigate('/dashboard/interview')}
                            className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                            Back to Interviews
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4">
                {feedbackList.length === 0 ? (
                    <div className="text-center">
                        <h2 className="font-bold text-2xl text-gray-500 mb-4">
                            No Interview Feedback Found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            It looks like you haven&apos;t completed any interview questions yet.
                        </p>
                        <button
                            onClick={() => navigate('/dashboard/interview')}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Back to Interviews
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-green-600 mb-2">
                                Congratulations!
                            </h2>
                            <h2 className="font-bold text-2xl text-gray-800 mb-4">
                                Here is your interview feedback
                            </h2>
                            <h2 className="text-primary text-xl">
                                Your overall interview rating: <strong className="text-2xl">{overallRating}</strong>
                            </h2>
                        </div>

                        {/* Overall Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <Award className="h-8 w-8 text-yellow-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600">Overall Rating</p>
                                        <p className="text-2xl font-bold text-gray-900">{overallRating}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <Target className="h-8 w-8 text-blue-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600">Keyword Match</p>
                                        <p className="text-2xl font-bold text-gray-900">{overallKeywordScore}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <BarChart3 className="h-8 w-8 text-green-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600">Questions</p>
                                        <p className="text-2xl font-bold text-gray-900">{feedbackList.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <TrendingUp className="h-8 w-8 text-purple-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600">Avg Keyword Match</p>
                                        <p className="text-2xl font-bold text-gray-900">{keywordStats.averageMatch}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Ratings Chart */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Question Ratings</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="question" />
                                        <YAxis domain={[0, 10]} />
                                        <Tooltip />
                                        <Bar dataKey="rating" fill="#3B82F6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Keyword Match Chart */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Keyword Matching Scores</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="question" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip formatter={(value) => [`${value}%`, 'Match']} />
                                        <Bar dataKey="keywordScore" fill="#10B981" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Keyword Stats */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Keyword Analysis Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-blue-600">{keywordStats.totalKeywords}</p>
                                    <p className="text-sm text-gray-600">Total Keywords</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-green-600">{keywordStats.totalMatched}</p>
                                    <p className="text-sm text-gray-600">Matched Keywords</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-purple-600">{keywordStats.averageMatch}%</p>
                                    <p className="text-sm text-gray-600">Average Match Rate</p>
                                </div>
                            </div>
                        </div>

                        {/* Feedback Items */}
                        <div className="space-y-4">
                            {feedbackList.map((feedback, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                    <button
                                        onClick={() => toggleExpanded(index)}
                                        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                    >
                                        <h2 className="text-lg font-medium text-gray-900">
                                            {feedback.question}
                                        </h2>
                                        {expandedItems.has(index) ? (
                                            <ChevronUp className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>

                                    {expandedItems.has(index) && (
                                        <div className="px-6 pb-6 space-y-4">
                                            {/* Rating and Keyword Score */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                    <h3 className="text-red-800 font-medium mb-1">
                                                        AI Rating: <span className="text-xl font-bold">{feedback.rating}/10</span>
                                                    </h3>
                                                </div>
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                    <h3 className="text-green-800 font-medium mb-1">
                                                        Keyword Match: <span className="text-xl font-bold">{feedback.keywordScore}%</span>
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Keywords */}
                                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                                <h3 className="text-purple-800 font-medium mb-2">Key Keywords:</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {feedback.keywords?.map((keyword, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                feedback.matchedKeywords?.includes(keyword)
                                                                    ? 'bg-green-200 text-green-800'
                                                                    : 'bg-gray-200 text-gray-600'
                                                            }`}
                                                        >
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-purple-600 mt-2">
                                                    Green highlights show keywords you matched in your answer
                                                </p>
                                            </div>

                                            {/* User's Answer */}
                                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                <h3 className="text-gray-800 font-medium mb-2">Your Answer:</h3>
                                                <p className="text-gray-700">{feedback.userAns}</p>
                                            </div>

                                            {/* Correct Answer */}
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                <h3 className="text-green-800 font-medium mb-2">Correct Answer:</h3>
                                                <p className="text-green-700">{feedback.correctAns}</p>
                                            </div>

                                            {/* Feedback */}
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <h3 className="text-blue-800 font-medium mb-2">AI Feedback:</h3>
                                                <p className="text-blue-700">{feedback.feedback}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={() => navigate('/dashboard/interview')}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                                Back to Interviews
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InterviewFeedback;