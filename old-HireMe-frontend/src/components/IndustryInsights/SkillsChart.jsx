import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SkillsChart = ({ data }) => {
  const colors = {
    technical: '#3B82F6',
    soft: '#10B981',
    business: '#8B5CF6',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Skills in Demand</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              fillOpacity={0.8}
              fill={(entry) => colors[entry.category]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

SkillsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      category: PropTypes.oneOf(['technical', 'soft', 'business']).isRequired
    })
  ).isRequired
};

export default SkillsChart;
