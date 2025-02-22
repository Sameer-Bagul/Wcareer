import { useEffect, useState } from 'react';
import JobList from '../../components/market-insights/JobList';
import JobChart from '../../components/market-insights/JobChart';

const MarketInsights = () => {
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
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Job Portal Dashboard</h1>

        {/* Job Chart Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Job Distribution Charts</h2>
          <JobChart jobs={jobs} />
        </div>

        {/* Job Listings Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Job Listings</h2>
          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
