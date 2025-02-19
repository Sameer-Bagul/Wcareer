import { useEffect, useState } from 'react';
import JobList from '../../components/realTimeJobs/JobList';
import JobChart from '../../components/realTimeJobs/JobChart';

const RealTimeJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('https://remoteok.com/api'); // Free API
      const data = await response.json();
      setJobs(data.slice(1)); // Remove the metadata element
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Job Portal Dashboard</h1>

        {/* Job Chart Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Job Distribution Charts</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <JobChart jobs={jobs} />
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Job Listings</h2>
          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeJobs;
