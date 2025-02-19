import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/InterviewComponents/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Check, X, AlertTriangle } from 'lucide-react';

const mockFeedback = {
  score: 85,
  correctAnswers: 8,
  skippedAnswers: 2,
  incorrectAnswers: 2,
  suggestions: [
    'Work on System Design fundamentals',
    'Practice more algorithmic problems',
    'Review React hooks concepts',
  ],
};

const data = [
  { name: 'Correct', value: mockFeedback.correctAnswers, color: '#22c55e' },
  { name: 'Incorrect', value: mockFeedback.incorrectAnswers, color: '#ef4444' },
  { name: 'Skipped', value: mockFeedback.skippedAnswers, color: '#f59e0b' },
];

const Feedback = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Interview Feedback</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Performance Overview">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mt-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-semibold">{mockFeedback.correctAnswers}</span>
              </div>
              <span className="text-sm text-gray-600">Correct</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-red-600">
                <X className="w-5 h-5" />
                <span className="font-semibold">{mockFeedback.incorrectAnswers}</span>
              </div>
              <span className="text-sm text-gray-600">Incorrect</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">{mockFeedback.skippedAnswers}</span>
              </div>
              <span className="text-sm text-gray-600">Skipped</span>
            </div>
          </div>
        </Card>

        <Card title="Areas for Improvement">
          <ul className="space-y-4">
            {mockFeedback.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <p>{suggestion}</p>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate('/interview-dashboard')}
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;