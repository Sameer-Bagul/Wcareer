import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { Mic, Square } from 'lucide-react';

const RecordAnswerSection = ({
    mockInterviewQuestions,
    activeQuestionIndex,
    interviewData,
    existingUserAnswer,
    onAnswerUpdate
}) => {
    const { userData, backendUrl } = useContext(AppContext);
    const [userAnswer, setUserAnswer] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recognition, setRecognition] = useState(null);

    // Update local state when existingUserAnswer prop changes (when navigating between questions)
    useEffect(() => {
        if (existingUserAnswer?.userAns) {
            setUserAnswer(existingUserAnswer.userAns);
        } else {
            setUserAnswer('');
        }
    }, [existingUserAnswer, activeQuestionIndex]);

    useEffect(() => {
        // Initialize speech recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    setUserAnswer(prev => prev + finalTranscript + ' ');
                }
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                toast.error('Speech recognition error. Please try again.');
                setIsRecording(false);
            };

            setRecognition(recognitionInstance);
        }
    }, []);

    const startStopRecording = () => {
        if (!recognition) {
            toast.error('Speech recognition is not supported in this browser. Please use Chrome.');
            return;
        }

        if (isRecording) {
            recognition.stop();
            setIsRecording(false);
            if (userAnswer.length > 10) {
                updateUserAnswer();
            }
        } else {
            setUserAnswer('');
            recognition.start();
            setIsRecording(true);
        }
    };

    const updateUserAnswer = async () => {
        console.log('🎤 [CLIENT] Submitting answer for question:', activeQuestionIndex + 1);
        console.log('📝 [CLIENT] Answer content:', userAnswer.substring(0, 100) + '...');
        console.log('👤 [CLIENT] User email:', userData?.email);
        console.log('🆔 [CLIENT] Interview ID:', interviewData?.mockId);

        if (!userAnswer.trim()) {
            toast.error('Please provide an answer before submitting');
            return;
        }

        if (!userData || !userData.email) {
            console.error('❌ [CLIENT] User not authenticated');
            toast.error('User not logged in. Please log in first.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/interview/answer`, {
                mockId: interviewData.mockId,
                question: mockInterviewQuestions[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                userEmail: userData.email
            }, {
                withCredentials: true
            });

            console.log('API Response:', response.data);

            console.log('📤 [CLIENT] Sending API request to save answer...');

            if (response.data.success) {
                console.log('✅ [CLIENT] Answer saved successfully!');
                console.log('🔄 [CLIENT] Refreshing answers list...');
                setUserAnswer('');
                // Refresh answers in parent component
                if (onAnswerUpdate) {
                    onAnswerUpdate();
                }
            } else {
                console.error('❌ [CLIENT] Failed to save answer:', response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('❌ [CLIENT] Error saving answer:', error);
            console.error('❌ [CLIENT] Error details:', error.response?.data || error.message);
            toast.error('Failed to save answer');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col">
            {/* Webcam Section */}
            <div className="flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-20 mb-10">
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        maxWidth: 400,
                    }}
                    className="rounded-lg"
                />
            </div>

            {/* Answer Status Indicator */}
            {existingUserAnswer && (
                <div className="w-full max-w-md mb-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-green-800 font-medium">Answer Submitted</span>
                        </div>
                        <p className="text-green-600 text-sm mt-1">
                            Rating: {existingUserAnswer.rating}/10 • Keywords: {existingUserAnswer.keywordScore}%
                        </p>
                    </div>
                </div>
            )}

            {/* Recording Controls */}
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <button
                    disabled={isLoading}
                    onClick={startStopRecording}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        isRecording
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isRecording ? (
                        <>
                            <Square className="h-5 w-5" />
                            Stop Recording
                        </>
                    ) : (
                        <>
                            <Mic className="h-5 w-5" />
                            Record Answer
                        </>
                    )}
                </button>

                {/* Manual Answer Input */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Or type your answer here:
                    </label>
                    <textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer to the question..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        rows={4}
                    />
                </div>

                {/* Submit Button */}
                <button
                    disabled={isLoading || !userAnswer.trim()}
                    onClick={updateUserAnswer}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    {isLoading ? 'Submitting...' : 'Submit Answer'}
                </button>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center gap-2 text-indigo-600">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                        <span>Saving answer...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecordAnswerSection;