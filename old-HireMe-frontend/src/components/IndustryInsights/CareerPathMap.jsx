import PropTypes from 'prop-types';
import { Network } from 'lucide-react';
import { motion } from 'framer-motion';

const CareerPathMap = ({ data }) => {
  const renderCareerPath = (path, depth = 0) => {
    const bgColors = ['bg-blue-50', 'bg-purple-50', 'bg-green-50'];
    const textColors = ['text-blue-700', 'text-purple-700', 'text-green-700'];
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-4 rounded-lg ${bgColors[depth % 3]} mb-2`}
      >
        <h3 className={`font-semibold ${textColors[depth % 3]} mb-2`}>
          {path.name}
        </h3>
        {path.children && (
          <div className="pl-4 space-y-2">
            {path.children.map((child) => (
              <div key={child.name}>
                {renderCareerPath(child, depth + 1)}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <div className="flex items-center space-x-3 mb-6">
        <Network className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Career Paths</h2>
      </div>
      <div className="overflow-auto max-h-[500px]">
        {renderCareerPath(data)}
      </div>
    </div>
  );
};

CareerPathMap.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.number
  }).isRequired
};

export default CareerPathMap;