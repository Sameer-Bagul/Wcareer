import React from 'react';

const JobList = ({ jobs }) => {
  return (
    <div className="p-5 bg-[#fff7f0]">
      <div className="flex flex-wrap -m-2">
        {jobs.map((job, index) => (
          <div key={index} className="flex-1 min-w-[30%] p-2 box-border">
            <div className="border border-[#f59e00] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-5">
                <h5 className="text-xl font-semibold mb-3 text-[#333]">{job.position}</h5>
                <h6 className="text-lg mb-4 text-[#555]">{job.company}</h6>
                <p className="text-sm text-gray-700 mb-5">
                  <strong className="text-[#333]">Location:</strong> {job.location} <br />
                  <strong className="text-[#333]">Type:</strong> {job.type}
                </p>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 text-white bg-[#ff8643] rounded-md no-underline text-center transition-all duration-300 hover:bg-[#f59e00] shadow-md hover:shadow-lg"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
