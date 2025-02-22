import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // Required for Chart.js v3+

const JobChart = ({ jobs }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const prepareChartData = () => {
      const categoryCounts = jobs.reduce((acc, job) => {
        acc[job.category] = (acc[job.category] || 0) + 1;
        return acc;
      }, {});

      const locationCounts = jobs.reduce((acc, job) => {
        acc[job.location] = (acc[job.location] || 0) + 1;
        return acc;
      }, {});

      const employmentCounts = jobs.reduce((acc, job) => {
        acc[job.employment_type] = (acc[job.employment_type] || 0) + 1;
        return acc;
      }, {});

      const backgroundColors = ["#FFA500", "#532D69", "#FF7A29"];
      const borderColors = ["#FFA500", "#532D69", "#FF7A29"];

      setChartData({
        categoryData: {
          labels: Object.keys(categoryCounts).slice(0, 10),
          datasets: [
            {
              label: "Job Categories",
              data: Object.values(categoryCounts).slice(0, 10),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 2,
            },
          ],
        },
        locationData: {
          labels: Object.keys(locationCounts).slice(0, 10),
          datasets: [
            {
              label: "Job Locations",
              data: Object.values(locationCounts).slice(0, 10),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 2,
            },
          ],
        },
        employmentData: {
          labels: Object.keys(employmentCounts).slice(0, 10),
          datasets: [
            {
              label: "Employment Types",
              data: Object.values(employmentCounts).slice(0, 10),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 2,
            },
          ],
        },
      });
    };

    if (jobs.length > 0) {
      prepareChartData();
    }
  }, [jobs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-[#f4f4f4]">
      {/* Job Categories Pie Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-[#FFA500] hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-semibold text-center mb-4 text-[#FFA500]">Job Categories</h3>
        <div className="h-[300px] w-full overflow-auto">
          {chartData && <Pie data={chartData.categoryData} options={{ maintainAspectRatio: false, responsive: true }} />}
        </div>
      </div>

      {/* Job Locations Doughnut Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-[#532D69] hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-semibold text-center mb-4 text-[#532D69]">Job Locations</h3>
        <div className="h-[300px] w-full overflow-auto">
          {chartData && <Doughnut data={chartData.locationData} options={{ maintainAspectRatio: false, responsive: true }} />}
        </div>
      </div>

      {/* Employment Types Bar Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-[#FF7A29] hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-semibold text-center mb-4 text-[#FF7A29]">Employment Types</h3>
        <div className="h-[300px] w-full overflow-auto">
          {chartData && (
            <Bar
              data={chartData.employmentData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: "rgba(0,0,0,0.1)" } },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobChart;
