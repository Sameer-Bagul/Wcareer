import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const TrendCard = React.memo(({ trend, featured = false }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl p-6 shadow-lg h-full ${
        featured ? 'bg-gradient-to-br from-blue-50 to-purple-50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold text-gray-800`}>
          {trend.field}
        </h3>
        <div className="p-2 bg-green-100 rounded-full">
          <TrendingUp className="w-6 h-6 text-green-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-gray-600">Available Jobs</p>
            <p className="font-semibold">{trend.jobs.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Target className="w-5 h-5 text-purple-500" />
          <div>
            <p className="text-gray-600">Growth Rate</p>
            <p className="font-semibold text-green-600">+{trend.growth}%</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <DollarSign className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-gray-600">Avg. Salary</p>
            <p className="font-semibold">${trend.avgSalary.toLocaleString()}</p>
          </div>
        </div>

        {featured && trend.subFields && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-600 mb-2">Popular Sub-Fields:</p>
            <div className="flex flex-wrap gap-2">
              {trend.subFields.map((field) => (
                <span
                  key={field}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
});

TrendCard.propTypes = {
  trend: PropTypes.shape({
    field: PropTypes.string.isRequired,
    jobs: PropTypes.number.isRequired,
    growth: PropTypes.number.isRequired,
    avgSalary: PropTypes.number.isRequired,
    subFields: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  featured: PropTypes.bool
};

TrendCard.displayName = 'TrendCard';

export default TrendCard;
