import { useNavigate } from 'react-router-dom';
import { Calendar, Play, Trash2 } from 'lucide-react';

const InterviewList = ({ interviews }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!interviews || interviews.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews yet</h3>
                <p className="text-gray-500">Create your first mock interview to get started</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => (
                <div
                    key={interview.mockId}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {interview.jobPosition}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {interview.jobDesc}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(interview.createdAt)}
                        </div>
                        <div className="text-sm text-gray-500">
                            Experience: {interview.jobExperience} years
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => navigate(`/interview/${interview.mockId}`)}
                            className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            <Play className="h-4 w-4 mr-2" />
                            Start
                        </button>
                        <button
                            onClick={() => {
                                // TODO: Implement delete functionality
                                console.log('Delete interview:', interview.mockId);
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InterviewList;