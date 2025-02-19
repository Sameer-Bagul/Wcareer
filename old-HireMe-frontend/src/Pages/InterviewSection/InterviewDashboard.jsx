import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/InterviewComponents/Card';
import { pastInterviews } from '../../Simulationdata/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';

const InterviewDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Interview Dashboard</h1>
        <button
          onClick={() => navigate('/create-interview')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Interview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Performance Overview">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pastInterviews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="position" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Interviews">
          <div className="space-y-4">
            {pastInterviews.map((interview) => (
              <div
                key={interview.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{interview.position}</h3>
                    <p className="text-sm text-gray-600">{interview.date}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {interview.score}%
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  {interview.topics.map((topic) => (
                    <span
                      key={topic}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InterviewDashboard;