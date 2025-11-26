import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import QuestionsSection from '../components/interview/QuestionsSection';
import RecordAnswerSection from '../components/interview/RecordAnswerSection';

const InterviewStart = () => {
    const { mockId } = useParams();
    const navigate = useNavigate();
    const { backendUrl, isLoggedin } = useContext(AppContext);
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState({}); // Store user answers by question index

    useEffect(() => {
        if (!isLoggedin) {
            toast.error('Please log in to take an interview');
            navigate('/login');
            return;
        }
        getInterviewDetails();
    }, [mockId, isLoggedin, getInterviewDetails, navigate, getUserAnswers]);

    const getInterviewDetails = useCallback(async () => {
        console.log('📥 [CLIENT] Fetching interview details for ID:', mockId);
        try {
            const response = await axios.get(`${backendUrl}/api/interview/${mockId}`, {
                withCredentials: true
            });

            if (response.data.success) {
                console.log('✅ [CLIENT] Interview loaded successfully');
                console.log('📋 [CLIENT] Questions count:', response.data.interviewData.jsonMockResp.length);
                const interview = response.data.interviewData;
                setInterviewData(interview);

                // jsonMockResp is already an array
                const questions = interview.jsonMockResp;
                setMockInterviewQuestions(questions);

                // Fetch existing user answers after questions are set
                setTimeout(() => getUserAnswers(questions), 0);
            } else {
                console.error('❌ [CLIENT] Failed to load interview:', response.data.message);
                toast.error(response.data.message);
                navigate('/dashboard/interview');
            }
        } catch (error) {
            console.error('❌ [CLIENT] Error fetching interview:', error);
            toast.error('Failed to load interview');
            navigate('/dashboard/interview');
        } finally {
            setLoading(false);
        }
    }, [backendUrl, mockId, navigate, getUserAnswers]);

    const getUserAnswers = useCallback(async (questions = mockInterviewQuestions) => {
        console.log('📥 [CLIENT] Fetching existing user answers for interview:', mockId);
        try {
            const response = await axios.get(`${backendUrl}/api/interview/${mockId}/answers`, {
                withCredentials: true
            });

            if (response.data.success) {
                console.log('✅ [CLIENT] Retrieved', response.data.answers.length, 'existing answers');
                response.data.answers.forEach((answer, idx) => {
                    console.log(`📝 [CLIENT] Answer ${idx + 1}: Rating ${answer.rating}/10, Keywords ${answer.keywordScore}%`);
                });

                // Organize answers by question for easy lookup
                const answersMap = {};
                response.data.answers.forEach(answer => {
                    // Find the question index
                    const questionIndex = questions.findIndex(q =>
                        q.question === answer.question
                    );
                    if (questionIndex !== -1) {
                        answersMap[questionIndex] = answer;
                        console.log(`🔗 [CLIENT] Mapped answer to question ${questionIndex + 1}`);
                    } else {
                        console.warn(`⚠️ [CLIENT] Could not map answer to question:`, answer.question.substring(0, 50));
                    }
                });
                setUserAnswers(answersMap);
                console.log('📊 [CLIENT] Answers map created with', Object.keys(answersMap).length, 'entries');
            } else {
                console.warn('⚠️ [CLIENT] No existing answers found');
            }
        } catch (error) {
            console.error('❌ [CLIENT] Error fetching user answers:', error);
            // Don't show error toast here as it's not critical
        }
    }, [backendUrl, mockId, mockInterviewQuestions]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!interviewData || !mockInterviewQuestions.length) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to load interview</h2>
                    <p className="text-gray-600">Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Question Section */}
                    <QuestionsSection
                        mockInterviewQuestions={mockInterviewQuestions}
                        activeQuestionIndex={activeQuestionIndex}
                        setActiveQuestionIndex={setActiveQuestionIndex}
                        userAnswers={userAnswers}
                    />

                    {/* Video/Audio Recording Section */}
                    <RecordAnswerSection
                        mockInterviewQuestions={mockInterviewQuestions}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                        existingUserAnswer={userAnswers[activeQuestionIndex]}
                        onAnswerUpdate={() => getUserAnswers(mockInterviewQuestions)} // Refresh answers after submission
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-6 mt-10">
                    {activeQuestionIndex > 0 && (
                        <button
                            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                            Previous Question
                        </button>
                    )}

                    {activeQuestionIndex < mockInterviewQuestions.length - 1 && (
                        <button
                            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Next Question
                        </button>
                    )}

                    {activeQuestionIndex === mockInterviewQuestions.length - 1 && (
                        <button
                            onClick={() => {
                                const answeredCount = Object.keys(userAnswers).length;
                                if (answeredCount === 0) {
                                    toast.error('Please answer at least one question before ending the interview');
                                    return;
                                }
                                navigate(`/interview/${mockId}/feedback`);
                            }}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            End Interview ({Object.keys(userAnswers).length} answered)
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InterviewStart;