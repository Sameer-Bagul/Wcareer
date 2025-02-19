import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/InterviewComponents/Card';
import { topics, experienceLevels } from '../../Simulationdata/mockData';

const CreateInterview = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: '',
    selectedTopics: [],
    experience: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/interview');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Interview</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topics
            </label>
            <div className="grid grid-cols-2 gap-2">
              {topics.map((topic) => (
                <label
                  key={topic}
                  className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedTopics.includes(topic)}
                    onChange={(e) => {
                      const updatedTopics = e.target.checked
                        ? [...formData.selectedTopics, topic]
                        : formData.selectedTopics.filter((t) => t !== topic);
                      setFormData({ ...formData, selectedTopics: updatedTopics });
                    }}
                    className="rounded text-blue-600"
                  />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <select
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select experience level</option>
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Interview
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateInterview;