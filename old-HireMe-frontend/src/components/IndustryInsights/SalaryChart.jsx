import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalaryChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Salary Ranges by Role</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" angle={-45} textAnchor="end" height={70} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="junior" name="Junior" fill="#3B82F6" />
            <Bar dataKey="mid" name="Mid-Level" fill="#10B981" />
            <Bar dataKey="senior" name="Senior" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

SalaryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      junior: PropTypes.number.isRequired,
      mid: PropTypes.number.isRequired,
      senior: PropTypes.number.isRequired
    })
  ).isRequired
};

export default SalaryChart;
