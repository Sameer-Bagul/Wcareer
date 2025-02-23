import React from 'react';
import { FiBriefcase, FiMapPin, FiCalendar, FiDollarSign } from 'react-icons/fi';

const JobList = ({ jobs }) => {
  // Helper function to get badge color based on source
  const getSourceBadgeColors = (source) => {
    switch (source) {
      case 'RemoteOK':
        return 'bg-green-100 text-green-800';
      case 'Indeed':
        return 'bg-blue-100 text-blue-800';
      case 'Fantastic Jobs':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4"> 
      {jobs.map(job => (
        <div
          key={job.id}
          className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                <span className={`px-2 py-1 text-xs rounded ${getSourceBadgeColors(job.source)}`}>
                  {job.source}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{job.company}</p>
            </div>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 inline-block px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Apply Now
            </a>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center text-gray-600">
              <FiBriefcase className="mr-2" />
              {job.type}
            </div>
            <div className="flex items-center text-gray-600">
              <FiMapPin className="mr-2" />
              {job.location || 'Remote'}
            </div>
            <div className="flex items-center text-gray-600">
              <FiCalendar className="mr-2" />
              {job.posted_date}
            </div>
            <div className="flex items-center text-gray-600">
              <FiDollarSign className="mr-2" />
              {job.salary}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
