import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip, 
  Legend,
  ArcElement
);

// Fallback chart data
const FALLBACK_CHART_DATA = {
  labels: ['No Data'],
  datasets: [{
    label: 'No Data Available',
    data: [0],
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
  }]
};

const JobChart = ({ jobs = [] }) => { // Provide default value for jobs
  const [chartData, setChartData] = useState({
    skillsChartData: FALLBACK_CHART_DATA,
    locationChartData: FALLBACK_CHART_DATA,
    options: {},
    pieOptions: {}
  });

  useEffect(() => {
    try {
      if (!Array.isArray(jobs) || jobs.length === 0) {
        throw new Error('Invalid or empty jobs data');
      }

      // Process data for charts
      const skillsCount = jobs.reduce((acc, job) => {
        (job.skills || []).forEach(skill => {
          if (skill) {
            acc[skill] = (acc[skill] || 0) + 1;
          }
        });
        return acc;
      }, {});

      const locationCount = jobs.reduce((acc, job) => {
        const location = job.location || 'Remote';
        acc[location] = (acc[location] || 0) + 1;
        return acc;
      }, {});

      // Sort and get top skills
      const topSkills = Object.entries(skillsCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8);

      // Chart data
      const skillsChartData = {
        labels: topSkills.map(([skill]) => skill),
        datasets: [
          {
            label: 'Number of Jobs',
            data: topSkills.map(([, count]) => count),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          },
        ],
      };

      const locationChartData = {
        labels: Object.keys(locationCount),
        datasets: [
          {
            data: Object.values(locationCount),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Job Distribution by Skills',
          },
        },
      };

      const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Jobs by Location',
          },
        },
      };

      setChartData({
        skillsChartData,
        locationChartData,
        options,
        pieOptions
      });
    } catch (error) {
      console.error('Error processing chart data:', error);
      setChartData({
        skillsChartData: FALLBACK_CHART_DATA,
        locationChartData: FALLBACK_CHART_DATA,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            title: { 
              display: true,
              text: 'No Data Available'
            },
          },
        },
        pieOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right' },
            title: { 
              display: true,
              text: 'No Data Available'
            },
          },
        }
      });
    }
  }, [jobs]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="h-[300px]"> {/* Fixed height container */}
        <Bar 
          data={chartData.skillsChartData} 
          options={chartData.options}
          fallbackContent={<div>Unable to load chart</div>}
        />
      </div>
      <div className="h-[300px]"> {/* Fixed height container */}
        <Pie 
          data={chartData.locationChartData} 
          options={chartData.pieOptions}
          fallbackContent={<div>Unable to load chart</div>}
        />
      </div>
    </div>
  );
};

export default JobChart;
