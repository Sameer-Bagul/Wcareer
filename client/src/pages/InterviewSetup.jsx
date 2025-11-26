import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';

const InterviewSetup = () => {
    const { mockId } = useParams();
    const navigate = useNavigate();
    const { userData, backendUrl } = useContext(AppContext);
    const [interviewData, setInterviewData] = useState(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInterviewDetails();
    }, [mockId]);

    const getInterviewDetails = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/interview/${mockId}`, {
                withCredentials: true
            });

            if (response.data.success) {
                setInterviewData(response.data.interviewData);
            } else {
                toast.error(response.data.message);
                navigate('/dashboard/interview');
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
            toast.error('Failed to load interview details');
            navigate('/dashboard/interview');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!interviewData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview not found</h2>
                    <p className="text-gray-600">The interview you&apos;re looking for doesn&apos;t exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="font-bold text-3xl text-center mb-8">Let&apos;s Get Started</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Interview Details */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col p-5 rounded-lg border gap-5 bg-white shadow-sm">
                            <h2 className="text-lg">
                                <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
                            </h2>
                            <h2 className="text-lg">
                                <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
                            </h2>
                            <h2 className="text-lg">
                                <strong>Years of Experience:</strong> {interviewData.jobExperience}
                            </h2>
                        </div>

                        <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-50">
                            <h2 className="flex gap-2 items-center text-yellow-600">
                                <Lightbulb />
                                <strong>Information</strong>
                            </h2>
                            <h2 className="mt-3 text-yellow-700">
                                Enable your camera and microphone to start the interview. Make sure you&apos;re in a quiet environment and have good lighting.
                            </h2>
                        </div>
                    </div>

                    {/* Webcam Section */}
                    <div className="flex flex-col items-center">
                        <div className="bg-black rounded-lg p-5 mb-5">
                            {webcamEnabled ? (
                                <Webcam
                                    onUserMedia={() => setWebcamEnabled(true)}
                                    onUserMediaError={() => setWebcamEnabled(false)}
                                    mirrored={true}
                                    style={{
                                        height: 300,
                                        width: 300,
                                    }}
                                    className="rounded-lg"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[300px] w-[300px] bg-gray-800 rounded-lg">
                                    <WebcamIcon className="h-16 w-16 text-gray-400 mb-4" />
                                    <p className="text-gray-400 text-center px-4">
                                        Camera and microphone access required
                                    </p>
                                </div>
                            )}
                        </div>

                        {!webcamEnabled && (
                            <button
                                onClick={() => setWebcamEnabled(true)}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                                Enable Camera and Microphone
                            </button>
                        )}

                        {webcamEnabled && (
                            <button
                                onClick={() => navigate(`/interview/${mockId}/start`)}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                Start Interview
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewSetup;