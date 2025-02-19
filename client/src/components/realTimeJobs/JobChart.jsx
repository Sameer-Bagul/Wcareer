import React, { useEffect, useState } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js v3 and above

const JobChart = ({ jobs, chartType = 'Bar', height = 400, width = 600, backgroundColor = 'rgba(75,192,192,0.6)', borderColor = 'rgba(75,192,192,1)', borderWidth = 1 }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const prepareChartData = () => {
      // Count job categories
      const categoryCounts = jobs.reduce((acc, job) => {
        acc[job.category] = (acc[job.category] || 0) + 1;
        return acc;
      }, {});

      // Count job locations (cities)
      const locationCounts = jobs.reduce((acc, job) => {
        acc[job.location] = (acc[job.location] || 0) + 1;
        return acc;
      }, {});

      // Count employment types (full-time, part-time, etc.)
      const employmentCounts = jobs.reduce((acc, job) => {
        acc[job.employment_type] = (acc[job.employment_type] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        categoryData: {
          labels: Object.keys(categoryCounts),
          datasets: [{
            label: 'Job Categories',
            data: Object.values(categoryCounts),
            backgroundColor,
            borderColor,
            borderWidth,
          }],
        },
        locationData: {
          labels: Object.keys(locationCounts),
          datasets: [{
            label: 'Job Locations',
            data: Object.values(locationCounts),
            backgroundColor,
            borderColor,
            borderWidth,
          }],
        },
        employmentData: {
          labels: Object.keys(employmentCounts),
          datasets: [{
            label: 'Employment Types',
            data: Object.values(employmentCounts),
            backgroundColor,
            borderColor,
            borderWidth,
          }],
        },
      });
    };

    if (jobs.length > 0) {
      prepareChartData();
    }
  }, [jobs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Job Categories Pie Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-center mb-4">Job Categories</h3>
        {chartData && <Pie data={chartData.categoryData} />}
      </div>

      {/* Job Locations Doughnut Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-center mb-4">Job Locations</h3>
        {chartData && <Doughnut data={chartData.locationData} />}
      </div>

      {/* Employment Types Bar Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-center mb-4">Employment Types</h3>
        {chartData && <Bar data={chartData.employmentData} />}
      </div>
    </div>
  );
};

export default JobChart;
