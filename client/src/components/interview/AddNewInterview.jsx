import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react';

const AddNewInterview = ({ onInterviewCreated }) => {
    const { userData, backendUrl } = useContext(AppContext);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        jobPosition: '',
        jobDesc: '',
        jobExperience: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Temporarily disabled userData check for testing
    // if (!userData) {
    //     return (
    //         <div className="group relative overflow-hidden rounded-lg bg-gray-100 p-6
    //                      shadow-[0_0_15px_rgba(156,163,175,0.2)]
    //                      border border-gray-200 animate-pulse">
    //             <div className="flex items-center justify-center">
    //                 <div className="text-center">
    //                     <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4"></div>
    //                 <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
    //                 <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
    //             </div>
    //         </div>
    //     );
    // }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Temporarily disabled authentication check for testing
        console.log('Creating interview, userData:', userData);

        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/interview/create`, {
                ...formData,
                userEmail: userData?.email || 'test@example.com' // Use mock email for testing
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                toast.success('Interview created successfully!');
                setOpenDialog(false);
                setFormData({
                    jobPosition: '',
                    jobDesc: '',
                    jobExperience: '',
                });

                // Navigate to the interview setup page
                navigate(`/interview/${response.data.mockId}`);

                // Notify parent component
                if (onInterviewCreated) {
                    onInterviewCreated();
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error creating interview:', error);
            toast.error(error.response?.data?.message || 'Failed to create interview');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Add New Interview Card */}
            <div
                onClick={() => setOpenDialog(true)}
                className="group relative overflow-hidden rounded-lg bg-white p-6
                         shadow-[0_0_15px_rgba(234,179,8,0.2)]
                         hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]
                         transition-all duration-300 cursor-pointer border border-gray-200"
            >
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                            <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Add New Interview</h3>
                        <p className="mt-2 text-sm text-gray-500">Create a new mock interview session</p>
                    </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-lg transition-all duration-300"></div>
            </div>

            {/* Interview Form Dialog */}
            {openDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Create New Interview
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Fill in the details below to generate your interview questions.
                            </p>

                            <form onSubmit={onSubmit} className="space-y-4">
                                {/* Job Position Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Position
                                    </label>
                                    <input
                                        name="jobPosition"
                                        type="text"
                                        placeholder="Ex: Senior Frontend Developer"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md
                                                 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                                                 shadow-sm hover:border-yellow-400"
                                        value={formData.jobPosition}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Job Description Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Description
                                    </label>
                                    <textarea
                                        name="jobDesc"
                                        placeholder="Ex: React, TypeScript, Node.js, etc."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md
                                                 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                                                 shadow-sm hover:border-yellow-400"
                                        value={formData.jobDesc}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                        rows={4}
                                    />
                                </div>

                                {/* Experience Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Years of Experience
                                    </label>
                                    <input
                                        name="jobExperience"
                                        type="number"
                                        min={0}
                                        placeholder="Ex: 3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md
                                                 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                                                 shadow-sm hover:border-yellow-400"
                                        value={formData.jobExperience}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setOpenDialog(false)}
                                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300
                                                 rounded-md hover:bg-gray-50 transition-colors"
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-yellow-400 rounded-md
                                                 hover:bg-yellow-500 focus:outline-none focus:ring-2
                                                 focus:ring-yellow-400 focus:ring-offset-2
                                                 shadow-sm hover:shadow-md transition-all duration-300
                                                 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center space-x-2">
                                                <LoaderCircle className="animate-spin h-5 w-5" />
                                                <span>Generating...</span>
                                            </div>
                                        ) : (
                                            "Start Interview"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddNewInterview;