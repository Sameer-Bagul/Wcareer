import React from 'react';
import "./JobList.css";

const JobList = ({ jobs }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{job.position}</h2>
            <h3 className="text-md text-gray-600 mb-2">{job.company}</h3>
            <p className="text-gray-700 mb-4">
              <strong>Location:</strong> {job.location} <br />
              <strong>Type:</strong> {job.type}
            </p>
            <a href={job.url} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
