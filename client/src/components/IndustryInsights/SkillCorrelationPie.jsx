import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain } from 'lucide-react';

const SkillCorrelationPie = ({ data }) => {
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Skill Correlations</h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="percentage"
            >
              {data.map((entry, index) => (
                <Cell key={entry.skill} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ payload }) => {
                if (!payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-bold text-gray-800">{data.skill}</p>
                    <p className="text-gray-600">Category: {data.category}</p>
                    <p className="text-gray-600">Correlation: {data.percentage}%</p>
                    <div className="mt-2">
                      <p className="font-semibold">Related Skills:</p>
                      <ul className="text-sm text-gray-500">
                        {data.relatedSkills.map(skill => (
                          <li key={skill}>• {skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

SkillCorrelationPie.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      skill: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
      relatedSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired
};

export default SkillCorrelationPie;
